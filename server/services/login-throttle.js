import { HttpError } from "../lib/http.js";
import { sha256 } from "../lib/security.js";

const WINDOW_MS = 60 * 60 * 1000;
const FIRST_DELAY_AFTER = 5;
const MAX_DELAY_SECONDS = 15 * 60;

export class LoginThrottle {
  constructor(db, now = () => Date.now()) {
    this.db = db;
    this.now = now;
  }

  key(name, address) {
    return sha256(`${name.trim().toLowerCase()}\0${address || "unknown"}`);
  }

  async check(key) {
    const { rows } = await this.db.query(
      "SELECT locked_until FROM login_attempts WHERE key_hash=$1",
      [key],
    );
    const remaining = rows[0]?.locked_until
      ? Math.ceil((new Date(rows[0].locked_until).getTime() - this.now()) / 1000)
      : 0;
    if (remaining > 0) {
      const error = new HttpError(429, `محاولات دخول كثيرة. انتظر ${remaining} ثانية ثم حاول مجددًا.`);
      error.retryAfter = remaining;
      throw error;
    }
  }

  async fail(key) {
    const now = this.now();
    const { rows } = await this.db.query(
      `INSERT INTO login_attempts (key_hash, failures, updated_at)
       VALUES ($1, 1, $2)
       ON CONFLICT (key_hash) DO UPDATE SET
         failures = CASE WHEN login_attempts.updated_at < $2::timestamptz - interval '1 hour'
           THEN 1 ELSE login_attempts.failures + 1 END,
         updated_at = $2
       RETURNING failures`,
      [key, new Date(now)],
    );
    const failures = rows[0].failures;
    if (failures < FIRST_DELAY_AFTER) return;
    const delay = Math.min(MAX_DELAY_SECONDS, 30 * 2 ** (failures - FIRST_DELAY_AFTER));
    await this.db.query(
      "UPDATE login_attempts SET locked_until=$2 WHERE key_hash=$1",
      [key, new Date(now + delay * 1000)],
    );
    const error = new HttpError(429, `محاولات دخول كثيرة. انتظر ${delay} ثانية ثم حاول مجددًا.`);
    error.retryAfter = delay;
    throw error;
  }

  async clear(key) {
    await this.db.query("DELETE FROM login_attempts WHERE key_hash=$1", [key]);
  }

  async cleanup() {
    await this.db.query(
      "DELETE FROM login_attempts WHERE updated_at < $1",
      [new Date(this.now() - WINDOW_MS)],
    );
  }
}
