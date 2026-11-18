import fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";
import { insertUser, audit, findUser } from "../repositories/users.js";
import { replaceScheduleRows } from "../repositories/schedule.js";
import { validateSchedule } from "../lib/validation.js";

export async function importLegacy(db, directory) {
  let auth;
  try {
    auth = JSON.parse(
      await fs.readFile(path.join(directory, "auth.json"), "utf8"),
    );
  } catch (error) {
    if (error.code === "ENOENT") return { users: 0, skipped: true };
    throw new Error(
      "Cannot read legacy auth.json. Original files were not modified.",
    );
  }
  const users = Array.isArray(auth.users)
    ? auth.users
    : auth.user && auth.hash
      ? [{ ...auth, id: auth.id || "u1", file: "schedule.json" }]
      : [];
  return db.transaction(async (tx) => {
    if (db.driver === "postgres")
      await tx.query("SELECT pg_advisory_xact_lock(82917402)");
    const marker = await tx.query(
      "SELECT key FROM app_settings WHERE key='legacy-imported'",
    );
    if (marker.rows.length) return { users: 0, skipped: true };
    let count = 0;
    for (const old of users) {
      const id = old.id || crypto.randomUUID();
      if (
        typeof old.user !== "string" ||
        !/^[a-f0-9]{128}$/i.test(old.hash || "") ||
        typeof old.salt !== "string"
      )
        throw new Error("Invalid legacy account. Import rolled back.");
      if (await findUser(tx, old.user))
        throw new Error(
          "A legacy username already exists. Import rolled back.",
        );
      const filename = old.file || "schedule.json";
      if (!/^[\w-]+\.json$/.test(filename))
        throw new Error("Unsafe legacy data filename.");
      // Missing or malformed files must never silently produce an empty account.
      let data = JSON.parse(
        await fs.readFile(path.join(directory, filename), "utf8"),
      );
      if (!data.schedule && !data.students)
        data = { schedule: data, students: [] };
      const validated = validateSchedule(
        { schedule: data.schedule || {}, students: data.students || [] },
        { legacy: true },
      );
      await insertUser(tx, {
        id,
        username: old.user,
        name: old.name || "",
        phone: old.phone || "",
        avatar: old.avatar || "",
        salt: old.salt,
        hash: old.hash,
      });
      await replaceScheduleRows(tx, id, validated);
      await audit(tx, id, "account.imported", {
        registrations: validated.registrations.length,
      });
      count++;
    }
    await tx.query(
      "INSERT INTO app_settings (key,value) VALUES ('legacy-imported',$1::jsonb)",
      [JSON.stringify({ importedAt: new Date().toISOString(), users: count })],
    );
    return { users: count, skipped: false };
  });
}
