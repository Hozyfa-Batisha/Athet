import crypto from "node:crypto";
import { HttpError } from "../lib/http.js";

export const WELCOME_MESSAGE =
  "برجاء الاستمتاع بموقع أثر وأتمنى أن ينال إعجابكم. برجاء العلم بأنه بعد 7 أيام تنتهي الفترة المجانية، وسيتم توفير عروض خاصة لسيادتكم ❤️";
export const publicProfile = (row) => ({
  user: row.username,
  name: row.name,
  phone: row.phone,
  avatar: row.avatar,
});

export async function findUser(db, username) {
  return (
    await db.query("SELECT * FROM users WHERE lower(username) = lower($1)", [
      username,
    ])
  ).rows[0];
}

export async function hasUsers(db) {
  return Boolean((await db.query("SELECT id FROM users LIMIT 1")).rows.length);
}

export async function insertUser(tx, user) {
  await tx.query(
    "INSERT INTO users (id,username,name,phone,avatar,password_salt,password_hash) VALUES ($1,$2,$3,$4,$5,$6,$7)",
    [
      user.id,
      user.username,
      user.name || "",
      user.phone || "",
      user.avatar || "",
      user.salt,
      user.hash,
    ],
  );
  await tx.query("INSERT INTO schedule_versions (user_id) VALUES ($1)", [
    user.id,
  ]);
  await tx.query(
    "INSERT INTO notifications (user_id,id,text) VALUES ($1,$2,$3)",
    [user.id, "welcome", WELCOME_MESSAGE],
  );
}

export async function createUser(db, data, { setup = false } = {}) {
  const user = { ...data, id: crypto.randomUUID() };
  try {
    await db.transaction(async (tx) => {
      if (setup) {
        // Lock the shared row so concurrent first-run requests cannot both win.
        await tx.query(
          "INSERT INTO app_settings (key,value) VALUES ('setup-lock','true') ON CONFLICT (key) DO NOTHING",
        );
        await tx.query(
          "SELECT key FROM app_settings WHERE key='setup-lock' FOR UPDATE",
        );
        if (await hasUsers(tx))
          throw new HttpError(409, "تم إنشاء حساب الدخول بالفعل.");
      }
      await insertUser(tx, user);
      await audit(tx, user.id, "account.created");
    });
  } catch (error) {
    if (error.code === "23505")
      throw new HttpError(409, "اسم المستخدم موجود قبل كده، اختار اسم تاني.");
    throw error;
  }
  return user.id;
}

export async function audit(db, userId, action, metadata = {}) {
  await db.query(
    "INSERT INTO audit_log (user_id,action,metadata) VALUES ($1,$2,$3::jsonb)",
    [userId, action, JSON.stringify(metadata)],
  );
}
