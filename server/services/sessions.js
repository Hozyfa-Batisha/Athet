import crypto from "node:crypto";
import { parseCookie, sha256 } from "../lib/security.js";

export async function createSession(db, userId, hours) {
  const token = crypto.randomBytes(32).toString("hex");
  await db.query(
    "INSERT INTO sessions (token_hash,user_id,csrf_token,expires_at) VALUES ($1,$2,$3,$4)",
    [
      sha256(token),
      userId,
      crypto.randomBytes(32).toString("hex"),
      new Date(Date.now() + hours * 3600000),
    ],
  );
  return token;
}

export async function getSession(db, req) {
  const token = parseCookie(req, "sid");
  if (!/^[a-f0-9]{64}$/.test(token)) return null;
  const { rows } = await db.query(
    "SELECT s.token_hash,s.csrf_token,s.expires_at,u.* FROM sessions s JOIN users u ON u.id=s.user_id WHERE s.token_hash=$1 AND s.expires_at > now()",
    [sha256(token)],
  );
  return rows[0] || null;
}

export async function deleteSession(db, session) {
  await db.query("DELETE FROM sessions WHERE token_hash=$1", [
    session.token_hash,
  ]);
}
