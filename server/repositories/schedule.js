import { HttpError } from "../lib/http.js";
import { validateSchedule } from "../lib/validation.js";
import { audit } from "./users.js";

export async function readSchedule(db, userId) {
  // One snapshot prevents reading half of a concurrent save.
  return db.transaction(async (tx) => {
    const version = (
      await tx.query(
        "SELECT revision FROM schedule_versions WHERE user_id=$1 FOR SHARE",
        [userId],
      )
    ).rows[0];
    const { rows: slots } = await tx.query(
      "SELECT * FROM schedule_slots WHERE user_id=$1 ORDER BY day,period",
      [userId],
    );
    const { rows: records } = await tx.query(
      "SELECT *, to_char(class_date,'YYYY-MM-DD') AS date_text FROM registrations WHERE user_id=$1 ORDER BY position,id",
      [userId],
    );
    const schedule = Object.fromEntries(
      slots.map((slot) => [
        `${slot.day}-${slot.period}`,
        {
          ...slot.extra,
          students: slot.students,
          time: slot.time,
          ampm: slot.ampm,
        },
      ]),
    );
    const students = records.map((record) => ({
      ...record.extra,
      id: record.id,
      name: record.name,
      ...(record.date_text ? { date: record.date_text } : {}),
      day: record.day,
      period: record.period,
      time: record.time,
      ampm: record.ampm,
      note: record.note,
      ...(record.is_group ? { isGroup: true, members: record.members } : {}),
    }));
    return { schedule, students, revision: version?.revision || 0 };
  });
}

export async function replaceScheduleRows(tx, userId, validated) {
  await tx.query("DELETE FROM schedule_slots WHERE user_id=$1", [userId]);
  await tx.query("DELETE FROM registrations WHERE user_id=$1", [userId]);
  if (validated.slots.length)
    await tx.query(
      `
    INSERT INTO schedule_slots (user_id,day,period,students,time,ampm,extra)
    SELECT $1,day,period,students,time,ampm,extra FROM jsonb_to_recordset($2::jsonb)
      AS x(day text,period text,students text,time text,ampm text,extra jsonb)`,
      [userId, JSON.stringify(validated.slots)],
    );
  if (validated.registrations.length)
    await tx.query(
      `
    INSERT INTO registrations (user_id,id,name,class_date,day,period,time,ampm,note,is_group,members,extra,position)
    SELECT $1,id,name,date,day,period,time,ampm,note,is_group,members,extra,position FROM jsonb_to_recordset($2::jsonb)
      AS x(id text,name text,date date,day text,period text,time text,ampm text,note text,is_group boolean,members jsonb,extra jsonb,position integer)`,
      [userId, JSON.stringify(validated.registrations)],
    );
}

export async function saveSchedule(db, userId, data) {
  const validated = validateSchedule(data);
  return db.transaction(async (tx) => {
    const version = (
      await tx.query(
        "SELECT revision FROM schedule_versions WHERE user_id=$1 FOR UPDATE",
        [userId],
      )
    ).rows[0];
    if (version.revision !== validated.revision)
      throw new HttpError(
        409,
        "الجدول اتعدل من صفحة أو جهاز تاني. حدّث الصفحة قبل الحفظ.",
        { revision: version.revision },
      );
    await replaceScheduleRows(tx, userId, validated);
    const revision = version.revision + 1;
    await tx.query(
      "UPDATE schedule_versions SET revision=$2 WHERE user_id=$1",
      [userId, revision],
    );
    await audit(tx, userId, "schedule.saved", {
      revision,
      slots: validated.slots.length,
      registrations: validated.registrations.length,
    });
    return { ok: true, revision };
  });
}
