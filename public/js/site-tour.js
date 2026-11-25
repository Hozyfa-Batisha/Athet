(() => {
  const store = window.ServerStore;
  const key = "site-tour-v1-complete";
  if (!window.AppBootstrap?.me || !store || store.getItem(key) === "yes") return;

  const image = (name) => `/assets/tour/${name}-cutout.png`;
  const steps = [
    { tab: "schedule", target: "#tab-schedule", image: "welcome", title: "أهلًا بك في أثر", text: "دي تبويبات الموقع. هنعرفك بسرعة على أهم الأماكن، وتقدر تتخطّى الشرح في أي وقت." },
    { tab: "schedule", target: "#view-schedule .schedule-table", image: "schedule", title: "جدول الحصص", text: "هنا تشوف حصص الأسبوع مرتبة حسب اليوم والوقت." },
    { tab: "schedule", target: "#w-cal", image: "schedule", title: "التقويم", text: "التقويم يساعدك تراجع مواعيد الحصص حسب اليوم." },
    { tab: "students", target: "#tab-students", image: "students", title: "سجل الطلاب", text: "من هنا تسجل الطلاب وتتابع حصصهم." },
    { tab: "students", target: "#add-form", image: "students", title: "إضافة حصة", text: "اكتب اسم الطالب وحدد موعد الحصة، ثم احفظ التسجيل. تقدر تسجل عائلة أو مجموعة كمان." },
    { tab: "harvest", target: "#hv-month", image: "celebrate", title: "حصاد الشهر", text: "تابع عدد الحصص والساعات التي سجلتها لكل طالب خلال الشهر." },
    { tab: "play", target: "#view-play", image: "games", title: "العب وتعلّم", text: "هنا ألعاب الحروف والحركات والدروس. اختار اللعبة وابدأ التدريب." },
    { tab: "board", target: "#board-exit", image: "board", title: "السبورة التفاعلية", text: "ارسم واشرح على السبورة، واستخدم زر الرجوع للموقع لما تخلص." },
    { tab: "quran", target: "#tab-quran", image: "quran", title: "القرآن الكريم", text: "اقرأ الآيات واستمع للتلاوة داخل تبويبة القرآن." },
    { tab: "quran", target: "#q-src", image: "quran", title: "اختيار القارئ", text: "من القائمة دي اختار الشيخ الذي تحب تسمع صوته." },
    { tab: "stories", target: "#tab-stories", image: "students", title: "القصص", text: "افتح قصة، واستمع لها، واضغط على أي جملة لسماعها وحدها." },
    { tab: "stories", target: "#stories-frame", image: "students", title: "قراءة القصص", text: "من هنا تختار القصة، وتشغل القراءة أو توقفها في أي وقت." },
    { tab: "letters", target: "#tab-letters", image: "explain", title: "الحروف الهجائية", text: "اضغط على الحرف لتشاهده وتسمع نطقه." },
    { tab: "letters", target: "#letters-grid", image: "explain", title: "اسمع الحروف", text: "اختار أي حرف من البطاقات لتتعلم صوته وشكله." },
    { tab: "noor", target: "#tab-noor", image: "explain", title: "نور البيان", text: "افتح الدرس المناسب واقرأ الأمثلة، ثم جرّب لعبته في تبويبة الألعاب." },
    { tab: "noor", target: "#noor-lessons", image: "explain", title: "دروس نور البيان", text: "كل مربع يفتح درسًا بأمثلته. تقدر ترجع لقائمة الدروس بعد ما تخلص." },
    { tab: "schedule", target: "#profile-btn", image: "welcome", title: "حسابك وإعداداتك", text: "من صورة الحساب تفتح ملفك الشخصي وتغير إعداداتك وكلمة السر." },
    { tab: "schedule", target: "#theme-toggle", image: "welcome", title: "شكل الموقع", text: "من هنا تغيّر بين الوضع الفاتح والداكن حسب راحتك." },
    { tab: "schedule", target: "#notif-btn", image: "celebrate", title: "الإشعارات", text: "الجرس يعرض لك التنبيهات الجديدة. كده أنت جاهز تبدأ!" },
  ].filter((step) => ["schedule", "students", "harvest"].includes(step.tab) || window.atharHasPremiumAccess?.());

  const root = document.createElement("div");
  root.id = "site-tour";
  root.dir = "rtl";
  root.hidden = true;
  root.innerHTML = `
    <div class="tour-shield"></div>
    <div class="tour-focus" aria-hidden="true"></div>
    <img class="tour-boy" alt="" src="${image("welcome")}">
    <section class="tour-card" role="dialog" aria-modal="true" aria-labelledby="tour-title" aria-describedby="tour-text">
      <div class="tour-copy"><p class="tour-count"></p><h2 id="tour-title"></h2><p id="tour-text"></p>
        <div class="tour-actions"><button class="tour-back" type="button">السابق</button><button class="tour-next" type="button">التالي</button></div>
      </div>
    </section>
    <button class="tour-skip" type="button">تخطي الشرح</button>`;
  document.body.append(root);
  const focus = root.querySelector(".tour-focus");
  const card = root.querySelector(".tour-card");
  const boy = root.querySelector(".tour-boy");
  const back = root.querySelector(".tour-back");
  const next = root.querySelector(".tour-next");
  let index = 0;
  let activeTab = "schedule";
  let target = null;

  function position() {
    if (!target?.isConnected) return;
    const rect = target.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const pad = 6;
    const top = Math.max(pad, rect.top - pad);
    const left = Math.max(pad, rect.left - pad);
    const width = Math.max(0, Math.min(innerWidth - left - pad, rect.width + 2 * pad));
    const height = Math.max(0, Math.min(innerHeight - top - pad, Math.min(rect.height + 2 * pad, 170)));
    Object.assign(focus.style, { top: `${top}px`, left: `${left}px`, width: `${width}px`, height: `${height}px` });
    const boyWidth = boy.offsetWidth;
    const cardWidth = card.offsetWidth;
    const groupWidth = boyWidth + cardWidth + 6;
    const groupHeight = Math.max(card.offsetHeight, boy.offsetHeight);
    const below = rect.bottom + 14;
    const above = rect.top - groupHeight - 14;
    const groupTop = below + groupHeight < innerHeight - 74 ? below : above >= 12 ? above : Math.max(12, Math.min(innerHeight - groupHeight - 74, below));
    const groupLeft = Math.max(12, Math.min(innerWidth - groupWidth - 12, rect.left + rect.width / 2 - groupWidth / 2));
    card.style.top = `${groupTop + Math.max(0, groupHeight - card.offsetHeight) / 2}px`;
    card.style.left = `${groupLeft + boyWidth + 6}px`;
    boy.style.top = `${groupTop + Math.max(0, groupHeight - boy.offsetHeight) / 2}px`;
    boy.style.left = `${groupLeft}px`;
  }

  function show(stepIndex) {
    index = stepIndex;
    const step = steps[index];
    root.hidden = false;
    if (activeTab !== step.tab) {
      window.showTab(step.tab);
      activeTab = step.tab;
    }
    target = document.querySelector(step.target);
    if (!target) return finish();
    if (matchMedia("(max-width: 640px)").matches && target.classList.contains("tab-btn"))
      window.openMobileNav?.();
    boy.src = image(step.image);
    root.querySelector(".tour-count").textContent = window.AtharI18n?.language === "en"
      ? `${index + 1} of ${steps.length}` : `${index + 1} من ${steps.length}`;
    root.querySelector("#tour-title").textContent = step.title;
    root.querySelector("#tour-text").textContent = step.text;
    back.disabled = index === 0;
    next.textContent = index === steps.length - 1 ? "ابدأ الآن" : "التالي";
    target.scrollIntoView({ block: "center", inline: "nearest" });
    requestAnimationFrame(() => requestAnimationFrame(() => { position(); next.focus(); }));
  }

  function finish() {
    root.remove();
    window.removeEventListener("resize", position);
    window.removeEventListener("scroll", position, true);
    window.removeEventListener("keydown", onKey);
    window.showTab("schedule");
    store.setItem(key, "yes");
    store.flush().catch(() => {});
  }

  function onKey(event) {
    if (event.key === "Escape") finish();
    if (event.key === "ArrowLeft" && index < steps.length - 1) show(index + 1);
    if (event.key === "ArrowRight" && index > 0) show(index - 1);
  }

  back.addEventListener("click", () => show(index - 1));
  next.addEventListener("click", () => index === steps.length - 1 ? finish() : show(index + 1));
  root.querySelector(".tour-skip").addEventListener("click", finish);
  window.addEventListener("resize", position);
  window.addEventListener("scroll", position, true);
  window.addEventListener("keydown", onKey);
  window.addEventListener("load", () => setTimeout(() => show(0), 600), { once: true });
})();
