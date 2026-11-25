const DAYS = [
  "السبت",
  "الأحد",
  "الإثنين",
  "الثلاثاء",
  "الأربعاء",
  "الخميس",
  "الجمعة",
];
const PERIODS = [
  "الأولى",
  "الثانية",
  "الثالثة",
  "الرابعة",
  "الخامسة",
  "السادسة",
];
let scheduleData = {};
let students = [];
let activeEditKey = null;
let scheduleRevision = 0;
let scheduleLoaded = false;
let pendingSchedule = null;
let scheduleSaving = null;
let saveConflict = false;

window.scheduleHasPendingChanges = () =>
  Boolean(pendingSchedule || scheduleSaving);
window.onload = async function () {
  applyTheme(
    document.documentElement.classList.contains("dark") ? "dark" : "light",
  );
  document.getElementById("year").textContent = new Date().getFullYear();
  document.getElementById("input-date").value = isoDate(new Date());
  updateDateDay();
  document.getElementById("select-period").innerHTML = PERIODS.map(
    (period) => `<option>${period}</option>`,
  ).join("");
  initSide();
  initHarvest();
  if (!window.AppBootstrap.me)
    document.getElementById("guest-notice").classList.remove("hidden");
  await Promise.all([loadSchedule(), loadMe()]);
  renderScheduleTable();
  renderStudents();
};

async function loadSchedule() {
  if (!window.AppBootstrap.me) return;
  try {
    const response = await fetch("/api/schedule");
    if (response.status === 401) {
      location.href = "/login";
      return;
    }
    if (!response.ok) throw new Error();
    const data = await response.json();
    scheduleData = data.schedule;
    students = data.students;
    scheduleRevision = data.revision;
    scheduleLoaded = true;
    window.reportSaveStatus?.("");
  } catch {
    scheduleLoaded = false;
    window.reportSaveStatus?.(
      "تعذر تحميل الجدول. أعد تحميل الصفحة قبل التعديل.",
      true,
    );
  }
}

function canEditSchedule() {
  if (!window.AppBootstrap.me) { location.href = "/login"; return false; }
  if (scheduleLoaded && !saveConflict) return true;
  alert(
    saveConflict
      ? "الجدول اتعدل من جهاز تاني. حدّث الصفحة قبل إجراء تعديلات جديدة."
      : "الجدول لم يُحمّل من السيرفر. حدّث الصفحة أولًا.",
  );
  return false;
}

function saveSchedule() {
  if (!scheduleLoaded || saveConflict) return;
  pendingSchedule = structuredClone({ schedule: scheduleData, students });
  flushSchedule().catch(() => {});
}

async function flushSchedule() {
  if (scheduleSaving) return scheduleSaving;
  if (saveConflict) return;
  scheduleSaving = (async () => {
    while (pendingSchedule) {
      const snapshot = pendingSchedule;
      window.reportSaveStatus?.("جارٍ الحفظ…");
      try {
        const response = await fetch("/api/schedule", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...snapshot, revision: scheduleRevision }),
        });
        if (response.status === 401) {
          location.href = "/login";
          throw new Error();
        }
        const result = await response.json();
        if (response.status === 409) {
          saveConflict = true;
          window.reportSaveStatus?.(result.error, true);
          throw new Error(result.error);
        }
        if (!response.ok) throw new Error(result.error);
        scheduleRevision = result.revision;
        if (pendingSchedule === snapshot) pendingSchedule = null;
        if (!window.ServerStore.hasPendingChanges())
          window.reportSaveStatus?.("");
      } catch (error) {
        if (!saveConflict)
          window.reportSaveStatus?.(
            "لم تُحفظ التعديلات على السيرفر. تحقّق من الاتصال.",
            true,
          );
        throw error;
      }
    }
  })().finally(() => {
    scheduleSaving = null;
  });
  return scheduleSaving;
}

window.addEventListener("athar:retry-save", () => {
  if (!scheduleLoaded) {
    loadSchedule().then(() => {
      renderScheduleTable();
      renderStudents();
    });
    return;
  }
  if (saveConflict) {
    if (
      confirm(
        "فيه نسخة أحدث على السيرفر. تحميلها هيلغي تعديلات هذه الصفحة غير المحفوظة. تريد تحميلها؟",
      )
    ) {
      pendingSchedule = null;
      saveConflict = false;
      location.reload();
    }
    return;
  }
  flushSchedule().catch(() => {});
});
window.addEventListener("online", () => {
  if (pendingSchedule) flushSchedule().catch(() => {});
});
