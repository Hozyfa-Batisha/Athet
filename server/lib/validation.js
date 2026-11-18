import { HttpError } from "./http.js";

export const DAYS = [
  "السبت",
  "الأحد",
  "الإثنين",
  "الثلاثاء",
  "الأربعاء",
  "الخميس",
  "الجمعة",
];
export const PERIODS = [
  "الأولى",
  "الثانية",
  "الثالثة",
  "الرابعة",
  "الخامسة",
  "السادسة",
];
const AMPM = ["", "صباحًا", "مساءً"];

export function text(value, max, label, { optional = false } = {}) {
  if (optional && value == null) return "";
  if (typeof value !== "string" || value.length > max || value.includes("\0"))
    throw new HttpError(400, `${label} غير صالح.`);
  return value;
}

export function profile(name, phone) {
  name = text(name, 80, "الاسم").trim();
  phone = text(phone, 40, "رقم الهاتف")
    .replace(/[٠-٩]/g, (digit) => "٠١٢٣٤٥٦٧٨٩".indexOf(digit))
    .trim();
  if (name.length < 2)
    throw new HttpError(400, "اكتب الاسم (حرفين على الأقل).");
  if (
    !/^\+?[\d\s-]+$/.test(phone) ||
    phone.replace(/\D/g, "").length < 8 ||
    phone.replace(/\D/g, "").length > 15
  )
    throw new HttpError(400, "رقم الهاتف غير صحيح.");
  return { name, phone };
}

export function validatePassword(value) {
  const password = text(value, 256, "كلمة السر");
  if (password.length < 6)
    throw new HttpError(400, "كلمة السر لازم تكون ٦ حروف على الأقل.");
  return password;
}

function validSlot(day, period, ampm = "") {
  if (!DAYS.includes(day) || !PERIODS.includes(period) || !AMPM.includes(ampm))
    throw new HttpError(400, "بيانات اليوم أو الحصة غير صالحة.");
}

export function validateSchedule(data, { legacy = false } = {}) {
  if (
    !data.schedule ||
    typeof data.schedule !== "object" ||
    Array.isArray(data.schedule) ||
    !Array.isArray(data.students)
  )
    throw new HttpError(400, "بيانات الجدول غير صالحة.");
  if (Object.keys(data.schedule).length > 42 || data.students.length > 20000)
    throw new HttpError(400, "عدد التسجيلات أكبر من المسموح في الطلب.");
  if (!legacy && (!Number.isInteger(data.revision) || data.revision < 0))
    throw new HttpError(400, "رقم نسخة الجدول مطلوب. حدّث الصفحة.");
  const slots = [];
  for (const [key, value] of Object.entries(data.schedule)) {
    const split = key.indexOf("-");
    const day = key.slice(0, split),
      period = key.slice(split + 1);
    if (!value || typeof value !== "object" || Array.isArray(value))
      throw new HttpError(400, "خانة الجدول غير صالحة.");
    validSlot(day, period, value.ampm || "");
    const { students, time, ampm, ...extra } = value;
    slots.push({
      day,
      period,
      students: text(students, 3000, "أسماء الطلاب"),
      time: text(time, 120, "التوقيت", { optional: true }),
      ampm: ampm || "",
      extra,
    });
  }
  const seen = new Set();
  const registrations = data.students.map((record, position) => {
    if (!record || typeof record !== "object" || Array.isArray(record))
      throw new HttpError(400, "تسجيل الطالب غير صالح.");
    const {
      id,
      name,
      date,
      day,
      period,
      time,
      ampm,
      note,
      isGroup,
      members,
      ...extra
    } = record;
    if (
      typeof id !== "string" ||
      !/^[a-zA-Z0-9_-]{1,100}$/.test(id) ||
      seen.has(id)
    )
      throw new HttpError(400, "معرّف التسجيل غير صالح أو مكرر.");
    seen.add(id);
    validSlot(day, period, ampm || "");
    if (
      date &&
      (!/^\d{4}-\d{2}-\d{2}$/.test(date) ||
        !Number.isFinite(Date.parse(date)) ||
        new Date(date).toISOString().slice(0, 10) !== date)
    )
      throw new HttpError(400, "تاريخ الحصة غير صالح.");
    if (
      members &&
      (!Array.isArray(members) ||
        members.length > 100 ||
        members.some(
          (member) => typeof member !== "string" || member.length > 120,
        ))
    )
      throw new HttpError(400, "أفراد المجموعة غير صالحين.");
    return {
      id,
      name: text(name, 120, "اسم الطالب"),
      date: date || null,
      day,
      period,
      time: text(time, 120, "التوقيت", { optional: true }),
      ampm: ampm || "",
      note: text(note, 10000, "الملاحظة", { optional: true }),
      is_group: Boolean(isGroup),
      members: members || [],
      extra,
      position,
    };
  });
  return { slots, registrations, revision: data.revision || 0 };
}

const SETTING_KEYS = new Set([
  "theme",
  "hurufi-theme",
  "hurufi-muted",
  "hurufi-progress-v1",
  "hurufi-arcade-v1",
  "qsrcid",
  "quran-options",
]);
export function validateSettings(changes) {
  if (
    !changes ||
    typeof changes !== "object" ||
    Array.isArray(changes) ||
    Object.keys(changes).length > 10
  )
    throw new HttpError(400, "الإعدادات غير صالحة.");
  for (const [key, value] of Object.entries(changes)) {
    if (
      !SETTING_KEYS.has(key) ||
      (value !== null &&
        (typeof value !== "string" ||
          value.length > 100000 ||
          value.includes("\0")))
    )
      throw new HttpError(400, "قيمة الإعداد غير صالحة.");
    if (
      value !== null &&
      (key === "theme" || key === "hurufi-theme") &&
      !["light", "dark"].includes(value)
    )
      throw new HttpError(400, "المظهر غير صالح.");
    if (
      value !== null &&
      key === "hurufi-muted" &&
      !["true", "false"].includes(value)
    )
      throw new HttpError(400, "إعداد الصوت غير صالح.");
    if (
      value !== null &&
      ["hurufi-progress-v1", "hurufi-arcade-v1", "quran-options"].includes(key)
    ) {
      try {
        const parsed = JSON.parse(value);
        if (!parsed || typeof parsed !== "object" || Array.isArray(parsed))
          throw new Error();
      } catch {
        throw new HttpError(400, "بيانات تقدم اللعبة غير صالحة.");
      }
    }
  }
  return changes;
}
