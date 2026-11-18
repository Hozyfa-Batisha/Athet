/* ===== الملف الشخصي والإعدادات ===== */
let me = window.AppBootstrap.me || { user: "", name: "", phone: "" };
async function loadMe() {
  try {
    const r = await fetch("/api/me");
    if (r.status === 401) {
      location.href = "/login";
      return;
    }
    me = await r.json();
    renderMe();
  } catch (e) {}
}
function paintAvatar(el, n) {
  el.textContent = "";
  if (me.avatar) {
    const img = document.createElement("img");
    img.src = me.avatar;
    img.alt = "";
    img.className = "w-full h-full object-cover";
    el.appendChild(img);
  } else {
    el.textContent = n.trim().charAt(0).toUpperCase();
  }
}
function renderMe() {
  const n = me.name || me.user || "حسابي";
  ["profile-avatar", "pm-avatar", "set-avatar"].forEach((id) =>
    paintAvatar(document.getElementById(id), n),
  );
  document.getElementById("pm-name").textContent = n;
  document.getElementById("pm-phone").textContent =
    me.phone || "أضف رقمك من الإعدادات";
  renderNotifs();
}

// ===== الإشعارات =====
let notificationCache = window.AppBootstrap.notifications || [];
function loadNotifs() {
  return notificationCache;
}
function saveNotifs(list) {
  const previous = notificationCache;
  notificationCache = list;
  postJson("/api/notifications/read", {
    ids: list.filter((n) => n.read).map((n) => n.id),
  })
    .then((result) => {
      if (!result.ok) throw new Error(result.error);
    })
    .catch(() => {
      notificationCache = previous;
      renderNotifs();
      window.reportSaveStatus?.("تعذر حفظ حالة الإشعارات على السيرفر.", true);
    });
}
function renderNotifs() {
  const list = loadNotifs();
  const unread = list.filter((n) => !n.read).length;
  document.getElementById("notif-dot").classList.toggle("hidden", unread === 0);
  const box = document.getElementById("notif-list");
  box.textContent = "";
  if (!list.length) {
    const empty = document.createElement("div");
    empty.className = "p-4 text-sm text-slate-500 text-center";
    empty.textContent = "لا توجد إشعارات";
    box.appendChild(empty);
    return;
  }
  list
    .slice()
    .reverse()
    .forEach((n) => {
      const item = document.createElement("div");
      item.className =
        "p-3 text-sm leading-relaxed border-b border-orangeBorder/30 " +
        (n.read ? "text-slate-600" : "text-slate-800 bg-orangeLight font-bold");
      item.textContent = n.text;
      box.appendChild(item);
    });
}
function toggleNotif(e) {
  e.stopPropagation();
  document.getElementById("profile-menu").classList.add("hidden");
  const menu = document.getElementById("notif-menu");
  const opening = menu.classList.contains("hidden");
  menu.classList.toggle("hidden");
  if (opening) {
    const list = loadNotifs().map((n) => ({ ...n, read: true }));
    saveNotifs(list);
    renderNotifs();
  }
}
document.addEventListener("click", (e) => {
  const nb = document.getElementById("notif-btn");
  const nm = document.getElementById("notif-menu");
  if (nm && nb && !nb.contains(e.target) && !nm.contains(e.target))
    nm.classList.add("hidden");
});
function toggleProfile(e) {
  e.stopPropagation();
  document.getElementById("profile-menu").classList.toggle("hidden");
}
document.addEventListener("click", (e) => {
  const pr = document.getElementById("profile");
  if (pr && !pr.contains(e.target))
    document.getElementById("profile-menu").classList.add("hidden");
});
function openSettings() {
  document.getElementById("profile-menu").classList.add("hidden");
  document.getElementById("set-name").value = me.name || "";
  document.getElementById("set-phone").value = me.phone || "";
  ["set-old", "set-new", "set-new2"].forEach(
    (id) => (document.getElementById(id).value = ""),
  );
  ["set-msg0", "set-msg1", "set-msg2"].forEach(
    (id) => (document.getElementById(id).textContent = ""),
  );
  document.getElementById("settings-modal").classList.remove("hidden");
}
function closeSettings() {
  document.getElementById("settings-modal").classList.add("hidden");
}
function setMsg(id, text, ok) {
  const el = document.getElementById(id);
  el.textContent = text;
  el.style.color = ok ? "#0E6B55" : "#dc2626";
}
async function postJson(url, body) {
  try {
    const r = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (r.status === 401 && url !== "/api/password") {
      location.href = "/login";
      return { ok: false, error: "" };
    }
    try {
      return await r.json();
    } catch (e) {
      return { ok: false, error: "حصل خطأ، حاول تاني" };
    }
  } catch {
    return { ok: false, error: "تعذر الاتصال بالسيرفر. حاول مرة أخرى." };
  }
}
async function saveProfile() {
  const d = await postJson("/api/profile", {
    name: document.getElementById("set-name").value,
    phone: document.getElementById("set-phone").value,
  });
  if (d.ok) {
    me.name = d.name;
    me.phone = d.phone;
    renderMe();
    setMsg("set-msg1", "تم حفظ البيانات ✅", true);
  } else setMsg("set-msg1", d.error || "تعذر الحفظ", false);
}
async function changePassword() {
  const o = document.getElementById("set-old").value,
    n = document.getElementById("set-new").value,
    n2 = document.getElementById("set-new2").value;
  if (n !== n2)
    return setMsg("set-msg2", "كلمتا السر الجديدتان غير متطابقتين", false);
  const d = await postJson("/api/password", { old: o, pass: n });
  if (d.ok) {
    ["set-old", "set-new", "set-new2"].forEach(
      (id) => (document.getElementById(id).value = ""),
    );
    setMsg("set-msg2", "تم تغيير كلمة السر ✅", true);
  } else setMsg("set-msg2", d.error || "تعذر التغيير", false);
}

function onAvatarChosen(input) {
  const f = input.files && input.files[0];
  input.value = "";
  if (!f) return;
  if (!f.type.startsWith("image/"))
    return setMsg("set-msg0", "اختر ملف صورة", false);
  const url = URL.createObjectURL(f);
  const img = new Image();
  img.onload = async () => {
    const S = 256,
      c = document.createElement("canvas");
    c.width = c.height = S;
    const side = Math.min(img.width, img.height); // قص مربع من النص
    c.getContext("2d").drawImage(
      img,
      (img.width - side) / 2,
      (img.height - side) / 2,
      side,
      side,
      0,
      0,
      S,
      S,
    );
    URL.revokeObjectURL(url);
    const d = await postJson("/api/avatar", {
      image: c.toDataURL("image/jpeg", 0.85),
    });
    if (d.ok) {
      me.avatar = d.avatar;
      renderMe();
      setMsg("set-msg0", "تم حفظ الصورة ✅", true);
    } else setMsg("set-msg0", d.error || "تعذر حفظ الصورة", false);
  };
  img.onerror = () => {
    URL.revokeObjectURL(url);
    setMsg("set-msg0", "تعذر قراءة الصورة", false);
  };
  img.src = url;
}
async function removeAvatar() {
  const d = await postJson("/api/avatar", { image: "" });
  if (d.ok) {
    me.avatar = "";
    renderMe();
    setMsg("set-msg0", "تم إزالة الصورة", true);
  }
}

function logout() {
  Promise.all([window.ServerStore.flush(), flushSchedule()])
    .then(async () => {
      const response = await fetch("/logout", { method: "POST" });
      if (response.ok) location.href = "/login";
      else window.reportSaveStatus?.("تعذر تسجيل الخروج. حاول مرة أخرى.", true);
    })
    .catch(() =>
      window.reportSaveStatus?.("احفظ التعديلات قبل تسجيل الخروج.", true),
    );
}
