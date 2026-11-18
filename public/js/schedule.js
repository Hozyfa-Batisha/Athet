function renderScheduleTable() {
  const tbody = document.getElementById("schedule-body");
  tbody.innerHTML = "";
  DAYS.forEach((day) => {
    const tr = document.createElement("tr");
    const dayTd = document.createElement("td");
    dayTd.className = "day-header-cell";
    dayTd.textContent = day;
    tr.appendChild(dayTd);
    PERIODS.forEach((period) => {
      const td = document.createElement("td");
      td.className = "content-cell";
      const info = scheduleData[day + "-" + period];
      if (info && info.students) {
        td.innerHTML =
          `<div class="font-extrabold text-slate-800 text-sm sm:text-base leading-snug">${escapeHtml(info.students)}</div>` +
          (info.time
            ? `<div class="text-xs sm:text-sm font-black text-slate-800 mt-1 dir-ltr">${escapeHtml(info.time)}</div>`
            : "") +
          (info.ampm
            ? `<div class="mt-1"><span class="ampm-badge ${info.ampm === "مساءً" ? "pm" : "am"}">${info.ampm === "مساءً" ? "🌙" : "☀️"} ${escapeHtml(info.ampm)}</span></div>`
            : "");
      }
      td.onclick = () => openCellEditor(day, period);
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });
  renderPickers();
}

/* ===== اختيار الطلاب من القائمة ===== */
function knownNames() {
  const set = new Set();
  students.forEach((r) => {
    if (r.isGroup) (r.members || []).forEach((n) => set.add(n));
    else if (r.name) set.add(r.name);
  });
  Object.values(scheduleData).forEach((i) =>
    splitNames((i && i.students) || "").forEach((n) => set.add(n)),
  );
  return [...set].sort((a, b) => a.localeCompare(b, "ar"));
}

function renderPickers() {
  const names = knownNames();
  document.querySelectorAll(".pick-box[data-input]").forEach((box) => {
    const input = document.getElementById(box.dataset.input);
    const sel = input ? splitNames(input.value) : [];
    box.innerHTML = names.length
      ? names
          .map(
            (n) =>
              `<button type="button" class="pick${sel.includes(n) ? " on" : ""}" data-name="${escapeHtml(n)}" onclick="togglePick(this)">${escapeHtml(n)}</button>`,
          )
          .join("")
      : '<span class="text-xs text-slate-400 font-bold">لا يوجد طلاب بعد. اكتب الاسم أول مرة وسيظهر هنا للاختيار.</span>';
  });
  const gbox = document.getElementById("pick-groups");
  if (gbox) {
    const gs = groupNames();
    gbox.innerHTML = gs.length
      ? gs
          .map(
            (g, i) =>
              `<button type="button" class="pick grp" title="${escapeHtml(g.members.join("، "))}" onclick="pickGroup(${i})">${escapeHtml(g.name)}</button>`,
          )
          .join("")
      : '<span class="text-xs text-slate-400 font-bold">لا توجد عائلات أو مجموعات مسجلة بعد.</span>';
  }
}

// ===== العائلات / المجموعات (حصة واحدة) =====
function groupNames() {
  const m = new Map();
  students.forEach((r) => {
    if (r.isGroup && !m.has(r.name))
      m.set(r.name, { name: r.name, members: r.members || [] });
  });
  return [...m.values()].sort((a, b) => a.name.localeCompare(b.name, "ar"));
}
function toggleGroupMode() {
  const on = document.getElementById("chk-group").checked;
  document.getElementById("group-box").classList.toggle("hidden", !on);
  renderPickers();
}
function pickGroup(i) {
  const g = groupNames()[i];
  if (!g) return;
  document.getElementById("chk-group").checked = true;
  document.getElementById("input-group").value = g.name;
  document.getElementById("input-students").value = g.members.join(" - ");
  toggleGroupMode();
}
function groupMembersHtml(list) {
  const g = list.find((r) => r.isGroup);
  return g
    ? '<div class="mt-1 text-xs font-bold text-slate-500"><span class="inline-block bg-orangeMain text-white rounded-md px-1.5 py-0.5 text-[10px] ml-1">مجموعة</span>أفراد: ' +
        escapeHtml((g.members || []).join("، ")) +
        "</div>"
    : "";
}

function togglePick(btn) {
  const input = document.getElementById(btn.closest(".pick-box").dataset.input);
  const n = btn.dataset.name;
  let names = splitNames(input.value);
  names = names.includes(n) ? names.filter((x) => x !== n) : names.concat(n);
  input.value = names.join(" - ");
  renderPickers();
}

/* ===== سجل الطلاب (مستقل عن الجدول) ===== */
function splitNames(text) {
  return text
    .split(/[-_–—،,\/]+/)
    .map((x) => x.trim())
    .filter(Boolean);
}

function renderStudents() {
  renderHarvest();
  renderPickers();
  const map = Object.create(null);
  students.forEach((r) => {
    (map[r.name] = map[r.name] || []).push(r);
  });

  const q = document.getElementById("search-student").value.trim();
  const names = Object.keys(map).sort((a, b) => a.localeCompare(b, "ar"));
  const shown = names.filter((n) => n.includes(q));

  const body = document.getElementById("students-body");
  if (!shown.length) {
    body.innerHTML = `<tr><td colspan="3" class="px-4 py-8 text-center text-slate-400 font-bold">${names.length ? "لا يوجد طالب بهذا الاسم" : "لا توجد تسجيلات بعد. سجّل أول طالب من النموذج أعلاه."}</td></tr>`;
    return;
  }
  body.innerHTML = shown
    .map((name) => {
      const list = map[name]
        .slice()
        .sort(
          (a, b) =>
            DAYS.indexOf(a.day) - DAYS.indexOf(b.day) ||
            PERIODS.indexOf(a.period) - PERIODS.indexOf(b.period),
        );
      const chips = list
        .map(
          (r) =>
            `<div class="inline-block align-top m-1 min-w-[250px] max-w-[400px]"><span class="chip">${escapeHtml(r.day)}${r.date ? ' <span class="dir-ltr text-slate-500">' + shortDate(r.date) + "</span>" : ""}<span class="text-slate-500">الحصة ${escapeHtml(r.period)}</span>${r.time ? `<span class="dir-ltr text-orangeMain">${escapeHtml(r.time)}</span>` : ""}${r.ampm ? `<span class="ampm-badge ${r.ampm === "مساءً" ? "pm" : "am"}">${r.ampm === "مساءً" ? "🌙" : "☀️"} ${escapeHtml(r.ampm)}</span>` : ""}<button type="button" title="حذف التسجيل" onclick="deleteReg('${r.id}')" class="text-red-500 hover:text-red-700 font-black">&times;</button></span>${noteHtml(r)}</div>`,
        )
        .join("");
      return `<tr class="border-t border-orange-100">
      <td class="px-4 py-3 font-extrabold text-slate-800">${escapeHtml(name)}${groupMembersHtml(list)}</td>
      <td class="px-4 py-3 text-center"><span class="inline-block min-w-[2.2rem] bg-orangeMain text-white font-black rounded-full px-3 py-1">${list.length}</span></td>
      <td class="px-4 py-3">${chips}</td>
    </tr>`;
    })
    .join("");
}

function pad2(n) {
  return String(n).padStart(2, "0");
}
function isoDate(d) {
  return (
    d.getFullYear() + "-" + pad2(d.getMonth() + 1) + "-" + pad2(d.getDate())
  );
}
function dayNameOf(iso) {
  const [y, m, d] = iso.split("-").map(Number);
  return DAYS[(new Date(y, m - 1, d).getDay() + 1) % 7];
}
function updateDateDay() {
  const v = document.getElementById("input-date").value;
  document.getElementById("date-day").textContent = v
    ? "(" + dayNameOf(v) + ")"
    : "";
}
// الضغط في أي مكان من الحقل يفتح التقويم مباشرة
function openDatePicker(el) {
  if (el.showPicker) {
    try {
      el.showPicker();
    } catch (e) {}
  }
}
// تاريخ الحصة المسجلة. التسجيلات القديمة من غير تاريخ بنعتمد فيها على تاريخ تسجيلها
function regDate(r) {
  if (r.date) return r.date;
  const ms = parseInt(String(r.id || "").slice(0, 8), 36);
  return ms ? isoDate(new Date(ms)) : null;
}
function shortDate(iso) {
  const p = iso.split("-");
  return p[2] + "/" + p[1];
}

function handleFormSubmit(e) {
  e.preventDefault();
  if (!canEditSchedule()) return;
  const names = splitNames(document.getElementById("input-students").value);
  const date = document.getElementById("input-date").value;
  const period = document.getElementById("select-period").value;
  const time = document.getElementById("input-time").value.trim();
  const ampm = document.getElementById("select-ampm").value;
  const note = document.getElementById("input-note").value.trim();
  const isGroup = document.getElementById("chk-group").checked;
  const groupName = isGroup
    ? document.getElementById("input-group").value.trim()
    : "";
  if (!names.length) return;
  if (isGroup && !groupName) {
    alert("اكتب اسم العائلة أو المجموعة أولًا");
    document.getElementById("input-group").focus();
    return;
  }
  if (!date) {
    alert("اختر تاريخ الحصة أولًا");
    document.getElementById("input-date").focus();
    return;
  }
  if (!time) {
    alert("اكتب التوقيت أولًا (مثال: 8 - 10)");
    document.getElementById("input-time").focus();
    return;
  }
  const day = dayNameOf(date);
  const dup = [];
  if (isGroup) {
    if (
      students.some(
        (r) =>
          r.name === groupName &&
          regDate(r) === date &&
          r.period === period &&
          r.ampm === ampm,
      )
    ) {
      alert("هذي العائلة مسجلة بالفعل في نفس الحصة وتاريخها");
      return;
    }
    students.push({
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
      name: groupName,
      members: names,
      isGroup: true,
      date,
      day,
      period,
      time,
      ampm,
      note,
    });
  } else
    names.forEach((name) => {
      if (
        students.some(
          (r) =>
            r.name === name &&
            regDate(r) === date &&
            r.period === period &&
            r.ampm === ampm,
        )
      ) {
        dup.push(name);
        return;
      }
      students.push({
        id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
        name,
        date,
        day,
        period,
        time,
        ampm,
        note,
      });
    });
  if (dup.length)
    alert(
      "مسجلين بالفعل في نفس الحصة وتاريخها وما اتضافوش تاني: " + dup.join("، "),
    );
  saveSchedule();
  renderStudents();
  document.getElementById("input-students").value = "";
  document.getElementById("input-time").value = "";
  document.getElementById("input-note").value = "";
  document.getElementById("chk-group").checked = false;
  document.getElementById("input-group").value = "";
  toggleGroupMode();
  renderPickers();
}

const NOTE_ICON =
  '<svg class="ico text-orangeMain" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9z"/><path d="M15 3v6h6"/></svg>';
const PEN_ICON =
  '<svg class="ico" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/></svg>';

function noteHtml(r) {
  if (r.note) {
    return `<div class="mt-1.5 bg-orangeLight border-2 border-orangeBorder rounded-xl px-3 py-2">
      <div class="flex items-center justify-between gap-2 mb-1">
        <span class="text-xs font-extrabold text-orangeMain">${NOTE_ICON} ملاحظة</span>
        <button type="button" onclick="editNote('${r.id}')" title="تعديل الملاحظة" class="no-print text-orangeMain hover:opacity-70">${PEN_ICON}</button>
      </div>
      <div class="text-sm font-bold text-slate-700 leading-relaxed whitespace-pre-wrap break-words">${escapeHtml(r.note)}</div>
    </div>`;
  }
  return `<button type="button" onclick="editNote('${r.id}')" class="no-print mt-1.5 w-full border-2 border-dashed border-orangeBorder rounded-xl px-3 py-2 text-sm font-bold text-orangeMain hover:bg-orangeLight">+ إضافة ملاحظة</button>`;
}

let noteEditId = null;
function editNote(id) {
  const r = students.find((x) => x.id === id);
  if (!r) return;
  noteEditId = id;
  document.getElementById("note-info").textContent =
    `${r.name} - ${r.day} - الحصة ${r.period}`;
  document.getElementById("note-text").value = r.note || "";
  document.getElementById("note-modal").classList.remove("hidden");
  setTimeout(() => document.getElementById("note-text").focus(), 50);
}
function closeNoteModal() {
  document.getElementById("note-modal").classList.add("hidden");
  noteEditId = null;
}
function saveNote() {
  if (!canEditSchedule()) return;
  const r = students.find((x) => x.id === noteEditId);
  if (r) {
    r.note = document.getElementById("note-text").value.trim();
    saveSchedule();
    renderStudents();
  }
  closeNoteModal();
}

function deleteReg(id) {
  if (!canEditSchedule()) return;
  if (!confirm("حذف هذا التسجيل؟")) return;
  students = students.filter((r) => r.id !== id);
  saveSchedule();
  renderStudents();
}

/* ===== الجدول: التعديل بالضغط على الخلية ===== */
function openCellEditor(day, period) {
  if (!canEditSchedule()) return;
  activeEditKey = day + "-" + period;
  const item = scheduleData[activeEditKey] || {
    students: "",
    time: "",
    ampm: "صباحًا",
  };
  document.getElementById("modal-info").textContent =
    `${day} - الحصة ${period}`;
  document.getElementById("modal-students").value = item.students || "";
  document.getElementById("modal-time").value = item.time || "";
  document.getElementById("modal-ampm").value = item.ampm || "";
  renderPickers();
  document.getElementById("edit-modal").classList.remove("hidden");
}

function closeModal() {
  document.getElementById("edit-modal").classList.add("hidden");
  activeEditKey = null;
}

function saveModalEdit() {
  if (!canEditSchedule()) return;
  if (!activeEditKey) return;
  const students = document.getElementById("modal-students").value.trim();
  const time = document.getElementById("modal-time").value.trim();
  const ampm = document.getElementById("modal-ampm").value;
  if (students) scheduleData[activeEditKey] = { students, time, ampm };
  else delete scheduleData[activeEditKey];
  saveSchedule();
  renderScheduleTable();
  closeModal();
}

function deleteModalClass() {
  if (!canEditSchedule()) return;
  if (!activeEditKey) return;
  delete scheduleData[activeEditKey];
  saveSchedule();
  renderScheduleTable();
  closeModal();
}

/* ===== الساعة والتقويم وساعات العالم ===== */
