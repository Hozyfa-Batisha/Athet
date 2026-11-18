import { HttpError, json, readJson } from "../lib/http.js";
import { profile, validatePassword } from "../lib/validation.js";
import { hashPassword, verifyPassword } from "../lib/security.js";
import { publicProfile, audit } from "../repositories/users.js";

export async function accountRoutes({
  req,
  res,
  url,
  db,
  session,
  authLimiter,
}) {
  const userId = session.id;
  if (url.pathname === "/api/me" && req.method === "GET") {
    json(res, publicProfile(session));
  } else if (url.pathname === "/api/profile" && req.method === "POST") {
    const data = await readJson(req, 12000);
    const cleaned = profile(data.name, data.phone);
    await db.query(
      "UPDATE users SET name=$2,phone=$3,updated_at=now() WHERE id=$1",
      [userId, cleaned.name, cleaned.phone],
    );
    json(res, { ok: true, ...cleaned });
  } else if (url.pathname === "/api/avatar" && req.method === "POST") {
    const data = await readJson(req, 600000);
    const image = data.image;
    if (
      typeof image !== "string" ||
      image.length > 400000 ||
      (image &&
        !/^data:image\/(jpeg|png|webp);base64,[A-Za-z0-9+/=]+$/.test(image))
    )
      throw new HttpError(400, "الصورة غير صالحة أو كبيرة.");
    if (image) {
      const [header, encoded] = image.split(",");
      const bytes = Buffer.from(encoded, "base64");
      const valid = header.includes("jpeg")
        ? bytes[0] === 255 && bytes[1] === 216
        : header.includes("png")
          ? bytes
              .subarray(0, 8)
              .equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]))
          : bytes.toString("ascii", 0, 4) === "RIFF" &&
            bytes.toString("ascii", 8, 12) === "WEBP";
      if (!valid) throw new HttpError(400, "محتوى الصورة غير صالح.");
    }
    await db.query("UPDATE users SET avatar=$2,updated_at=now() WHERE id=$1", [
      userId,
      image,
    ]);
    json(res, { ok: true, avatar: image });
  } else if (url.pathname === "/api/password" && req.method === "POST") {
    authLimiter.check(`${req.socket.remoteAddress}:${userId}`);
    const data = await readJson(req, 12000);
    if (
      typeof data.old !== "string" ||
      data.old.length > 256 ||
      !(await verifyPassword(data.old, session))
    )
      throw new HttpError(401, "كلمة السر الحالية غلط.");
    const credentials = await hashPassword(validatePassword(data.pass));
    await db.transaction(async (tx) => {
      await tx.query(
        "UPDATE users SET password_salt=$2,password_hash=$3,updated_at=now() WHERE id=$1",
        [userId, credentials.salt, credentials.hash],
      );
      await tx.query(
        "DELETE FROM sessions WHERE user_id=$1 AND token_hash<>$2",
        [userId, session.token_hash],
      );
      await audit(tx, userId, "account.password-changed");
    });
    json(res, { ok: true });
  } else return false;
  return true;
}
