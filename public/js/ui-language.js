/* Translate interface labels only. Learning material and saved user data stay Arabic. */
(() => {
  const ui = {
    "أثر": "Athar",
    "الإشعارات": "Notifications",
    "لا توجد إشعارات": "No notifications",
    "الملف الشخصي": "Profile",
    "تسجيل الدخول": "Sign in",
    "الإعدادات": "Settings",
    "تسجيل الخروج": "Sign out",
    "زائر": "Visitor",
    "سجّل الدخول لحفظ بياناتك": "Sign in to save your data",
    "تبديل الوضع الداكن": "Toggle dark mode",
    "تبديل الوضع": "Change theme",
    "إظهار الشريط العلوي": "Show header",
    "الأقسام": "Sections",
    "فتح قائمة الأقسام": "Open sections menu",
    "إغلاق قائمة الأقسام": "Close sections menu",
    "الجدول": "Schedule",
    "سجل الطلاب": "Students",
    "حصاد الشهر": "Monthly summary",
    "العب و تعلم": "Play and learn",
    "العب وتعلّم": "Play and learn",
    "سبورة تفاعلية": "Interactive board",
    "القرآن الكريم": "The Holy Quran",
    "قصص الأطفال": "Children's stories",
    "الحروف الهجائية": "Arabic letters",
    "نور البيان": "Noor Al-Bayan",
    "الحصة": "Lesson",
    "الأولى": "First",
    "الثانية": "Second",
    "الثالثة": "Third",
    "الرابعة": "Fourth",
    "الخامسة": "Fifth",
    "السادسة": "Sixth",
    "الساعة الآن": "Current time",
    "ساعات العالم": "World clocks",
    "أوروبا": "Europe",
    "أمريكا": "America",
    "ألمانيا": "Germany",
    "فرنسا": "France",
    "إيطاليا": "Italy",
    "إسبانيا": "Spain",
    "إنجلترا": "England",
    "كندا": "Canada",
    "الولايات المتحدة (نيويورك)": "United States (New York)",
    "الولايات المتحدة (لوس أنجلوس)": "United States (Los Angeles)",
    "تسجيل طالب": "Add a student",
    "تسجيل الطالب": "Save student",
    "أسماء الطلاب": "Student names",
    "الطلاب المسجلين": "Registered students",
    "(اضغط للاختيار، واضغط مرة ثانية للإلغاء)": "(Select or deselect a student)",
    "تسجيل كعائلة / مجموعة": "Register as a family or group",
    "تُحسب الحصة كلها حصة واحدة، والساعات حسب التوقيت.": "The group counts as one lesson; hours follow the scheduled time.",
    "اسم العائلة / المجموعة": "Family or group name",
    "العائلات والمجموعات السابقة": "Previous families and groups",
    "(اضغط لتعبئتها مع أفرادها)": "(Select to fill in its members)",
    "تاريخ الحصة": "Lesson date",
    "التوقيت": "Time",
    "الفترة": "Period",
    "صباحًا": "AM",
    "مساءً": "PM",
    "ملاحظة (اختياري)": "Note (optional)",
    "اسم الطالب": "Student name",
    "عدد التسجيلات": "Registrations",
    "اليوم والساعة": "Day and time",
    "الشهر": "Month",
    "السنة": "Year",
    "إجمالي الحصص": "Total lessons",
    "إجمالي الساعات": "Total hours",
    "ملاحظة الحصة": "Lesson note",
    "حفظ الملاحظة": "Save note",
    "إلغاء": "Cancel",
    "الصورة الشخصية": "Profile picture",
    "اختيار صورة": "Choose picture",
    "إزالة الصورة": "Remove picture",
    "البيانات الشخصية": "Personal details",
    "الاسم": "Name",
    "رقم الهاتف": "Phone number",
    "حفظ البيانات": "Save details",
    "تغيير كلمة السر": "Change password",
    "كلمة السر الحالية": "Current password",
    "كلمة السر الجديدة (٦ أرقام)": "New password (6 digits)",
    "تأكيد كلمة السر الجديدة": "Confirm new password",
    "تعديل الحصة": "Edit lesson",
    "حفظ التعديلات": "Save changes",
    "حذف": "Delete",
    "انتهت الفترة المجانية": "Your free trial has ended",
    "برجاء الاشتراك في خطط VIP للاستفادة من خدماتنا.": "Please subscribe to a VIP plan to use all our services.",
    "للاشتراك برجاء التواصل مع مسؤولي الخدمة عبر الواتس.": "To subscribe, contact our team on WhatsApp.",
    "تواصل معنا": "Contact us",
    "خصم": "OFF",
    "التلاوة": "Recitation",
    "الآيات": "Verses",
    "السور": "Surahs",
    "نص الآيات": "Verse text",
    "صفحة المصحف": "Mushaf page",
    "اضغط على أي آية لتسمعها": "Tap a verse to hear it",
    "القارئ": "Reciter",
    "تكرار الآية": "Repeat verse",
    "السرعة": "Speed",
    "مرة واحدة": "Once",
    "مرتين": "Twice",
    "٣ مرات": "Three times",
    "بلا توقف": "Continuously",
    "بطيئة": "Slow",
    "عادية": "Normal",
    "أسرع": "Faster",
    "ابدأ كل سورة بالبسملة": "Start each surah with Basmala",
    "كمّل للسورة التالية": "Continue to the next surah",
    "السورة السابقة": "Previous surah",
    "السورة التالية": "Next surah",
    "الصفحة السابقة": "Previous page",
    "الصفحة التالية": "Next page",
    "الآية السابقة": "Previous verse",
    "الآية التالية": "Next verse",
    "تشغيل / إيقاف": "Play / pause",
    "صفحة من المصحف": "Mushaf page",
    "الرجوع للموقع": "Back to site",
    "الرجوع للدروس": "Back to lessons",
    "إغلاق": "Close",
    "إغلاق التنبيه": "Close notice",
    "أمس": "Yesterday",
    "غدًا": "Tomorrow",
    "السبت": "Saturday",
    "الأحد": "Sunday",
    "الإثنين": "Monday",
    "الاثنين": "Monday",
    "الثلاثاء": "Tuesday",
    "الأربعاء": "Wednesday",
    "الخميس": "Thursday",
    "الجمعة": "Friday",
    "يناير": "January",
    "فبراير": "February",
    "مارس": "March",
    "أبريل": "April",
    "مايو": "May",
    "يونيو": "June",
    "يوليو": "July",
    "أغسطس": "August",
    "سبتمبر": "September",
    "أكتوبر": "October",
    "نوفمبر": "November",
    "ديسمبر": "December",
    "الفتحة": "Fatha",
    "الكسرة": "Kasra",
    "الضمة": "Damma",
    "مراجعة الحركات": "Vowel review",
    "المد بالألف": "Long vowel with Alif",
    "المد بالياء": "Long vowel with Ya",
    "المد بالواو": "Long vowel with Waw",
    "مراجعة المدود": "Long vowel review",
    "السكون": "Sukun",
    "السكون في الرسم القرآني": "Sukun in Quranic script",
    "السكون في الرسم الإملائي": "Sukun in standard script",
    "تنوين الفتح": "Fath tanween",
    "تنوين الكسر": "Kasr tanween",
    "تنوين الضم": "Damm tanween",
    "مراجعة التنوين": "Tanween review",
    "الشدة مع الفتحة": "Shadda with Fatha",
    "الشدة مع الكسرة": "Shadda with Kasra",
    "الشدة مع الضمة": "Shadda with Damma",
    "مراجعة الشدة": "Shadda review",
    "الشدة مع التنوين": "Shadda with Tanween",
    "أنواع المدود": "Types of long vowels",
    "النون الساكنة والتنوين": "Sakin Nun and Tanween",
    "الميم الساكنة": "Sakin Mim",
    "أحكام متفرقة ومراجعة": "Rules and review",
    "الرسم القرآني والرسم الإملائي": "Quranic and standard script",
    "مراجعة الرسم القرآني والإملائي": "Script review",
    "١٢ مغامرة مصوّرة": "12 illustrated adventures",
    "حكايات صغيرة ومغامرات كبيرة": "Little stories, big adventures",
    "اختاروا حكاية لبدء المغامرة": "Choose a story to begin",
    "↩ كل القصص": "↩ All stories",
    "الصورة السابقة": "Previous picture",
    "الصورة التالية": "Next picture",
    "مشغّل القصة": "Story player",
    "الجملة السابقة": "Previous sentence",
    "الجملة التالية": "Next sentence",
    "تشغيل القراءة": "Play reading",
    "إيقاف القراءة": "Pause reading",
    "تقدّم قراءة القصة": "Story reading progress",
    "الرئيسية": "Home",
    "نتعلّم العربية": "Learn Arabic",
    "نلعب ونمرح": "Play and have fun",
    "كل الألعاب": "All games",
    "اللغة العربية": "Arabic language",
    "أرقام وذكاء": "Numbers and thinking",
    "ألعاب ومرح": "Games and fun",
    "كل المستويات": "All levels",
    "مرحلتك:": "Your level:",
    "بماذا نلعب اليوم؟": "What shall we play today?",
    "اختر ما تحبّ، ودع الاكتشاف يبدأ.": "Choose a game and start exploring.",
    "اختر مغامرتك": "Choose an adventure",
    "هيا نبدأ": "Let's begin",
    "لم نجد هذه اللعبة": "Game not found",
    "اعرض كلّ الألعاب": "Show all games",
    "كلّ الألعاب": "All games",
    "نجومي": "My stars",
    "العب الآن": "Play now",
    "ابدأ الآن": "Start now",
    "السابق": "Previous",
    "التالي": "Next",
    "تخطي الشرح": "Skip tour",
    "مرحباً بك": "Welcome",
    "اكتب الاسم الذي أنشأت به حسابك للمتابعة": "Enter the name you used to create your account",
    "كلمة المرور": "Password",
    "إظهار كلمة المرور": "Show password",
    "إظهار": "Show",
    "إخفاء": "Hide",
    "ليس لديك حساب؟ أنشئ حساباً": "No account? Create one",
    "نبسّط العلم لنصنع المستقبل": "Making learning simple for the future",
    "إنشاء حساب الدخول": "Create the first account",
    "إنشاء حساب جديد": "Create an account",
    "أول مرة؟ أنشئ حساب المدير باسمك وكلمة السر": "First time? Create the admin account with your name and password",
    "كل حساب له جدوله وطلابه الخاصين": "Each account has its own schedule and students",
    "كلمة السر (٦ أرقام)": "Password (6 digits)",
    "تأكيد كلمة السر": "Confirm password",
    "إنشاء الحساب والدخول": "Create account and sign in",
    "عندي حساب بالفعل - تسجيل الدخول": "Already have an account? Sign in",
    "تسجيل الدخول | أثر": "Sign in | Athar",
    "إنشاء حساب الدخول | أثر": "Create account | Athar",
    "اكتب اسمك": "Enter your name",
    "أدخل كلمة المرور": "Enter your password",
    "حروفي — كل الألعاب": "Hurufi — All games",
    "حروفي — ألعاب الأطفال": "Hurufi — Children's games",
    "قصص الأطفال": "Children's stories",
    "سبورة تفاعلية · أثر": "Interactive board · Athar",
    "تعلّم الحروف": "Learn letters",
    "العب واكتشف": "Play and explore",
    "إنجازاتي": "My progress",
    "نجمة": "Star",
    "القائمة الرئيسية": "Main menu",
    "الشهر السابق": "Previous month",
    "الشهر التالي": "Next month",
    "العودة لشهر اليوم": "Back to this month",
    "أدوات السبورة": "Board tools",
    "قائمة المؤثرات": "Effects menu",
    "قلم عادي (P)": "Pen (P)",
    "قلم خط عربي (C)": "Arabic calligraphy pen (C)",
    "ممحاة (E)": "Eraser (E)",
    "كتابة نص (X)": "Text (X)",
    "يد: تحريك وتكبير وتصغير (V)": "Move and zoom (V)",
    "خط (L)": "Line (L)",
    "مربع (R)": "Rectangle (R)",
    "دائرة (O)": "Circle (O)",
    "مثلث (G)": "Triangle (G)",
    "نجمة (S)": "Star (S)",
    "سهم (A)": "Arrow (A)",
    "تعبئة الأشكال": "Fill shapes",
    "تعبئة": "Fill",
    "حجم الخط": "Stroke size",
    "خلفية بيضاء": "Plain background",
    "خلفية مربعات": "Grid background",
    "خلفية أسطر": "Lined background",
    "تراجع (Ctrl+Z)": "Undo (Ctrl+Z)",
    "إعادة (Ctrl+Y)": "Redo (Ctrl+Y)",
    "سلة المهملات: اضغط لحذف المحدد، أو اسحب شيئاً عليها": "Trash: click to delete the selection, or drag an item here",
    "حفظ كصورة": "Save as image",
    "أهلاً بك في أثر.": "Welcome to Athar.",
    "سجّل الدخول": "Sign in",
    "لتعرض جدولك وتدير طلابك، أو": "to view your schedule and manage students, or",
    "أنشئ حسابًا جديدًا": "create a new account",
    "جميع حقوق الطبع و النشر محفوظة بإسم omar batisha": "All rights reserved to Omar Batisha",
    "بيحسب الحصص اللي سجلتها بنفسك في سجل الطلاب فقط، حسب تاريخ كل حصة. اللي مش مسجلة مش بتتحسب.": "Only lessons you added to the student register count, based on their lesson date.",
    "صفحات المصحف معروضة كما هي من ملف المصحف المرفق، من غير أي إعادة كتابة للآيات.": "Mushaf pages are shown exactly as provided, without rewriting the verses.",
    "برجاء العلم أنه بعد ٧ أيام من إنشاء حساب جديد سينتهي الاشتراك المجاني.": "Your free trial ends 7 days after creating a new account.",
    "لا توجد حصص في جدول اليوم": "No lessons scheduled today",
    "تعذّر قراءة توقيت حصص اليوم": "Could not read today's lesson times",
    "اكتب التوقيت مثل: 10 - 8": "Enter a time such as 10 - 8",
    "أقرب حصة بعد": "Next lesson in",
    "الحصة الجارية الآن": "Lesson in progress",
    "متبقي على انتهائها": "Time remaining",
    "انتهت حصص اليوم": "Today's lessons have ended",
    "الشهر السابق": "Previous month",
    "الشهر التالي": "Next month",
    "العودة لشهر اليوم": "Return to current month",
    "لا يوجد طلاب بعد. اكتب الاسم أول مرة وسيظهر هنا للاختيار.": "No students yet. Enter a name to add the first one.",
    "لا توجد عائلات أو مجموعات مسجلة بعد.": "No families or groups added yet.",
    "تم حفظ البيانات ✅": "Details saved ✅",
    "تم تغيير كلمة السر ✅": "Password changed ✅",
    "تم حفظ الصورة ✅": "Picture saved ✅",
    "تم إزالة الصورة": "Picture removed",
    "تعذر الحفظ": "Could not save",
    "تعذر التغيير": "Could not change password",
    "اختر ملف صورة": "Choose an image file",
    "تعذر قراءة الصورة": "Could not read the image",
    "كلمتا السر الجديدتان غير متطابقتين": "The new passwords do not match",
    "الاسم أو كلمة السر غير صحيحة.": "Incorrect name or password.",
    "مرحبًا أيّها المستكشف الصغير": "Welcome, little explorer",
    "عالم صغير،": "A small world,",
    "اكتشافات كبيرة": "big discoveries",
    "كل حرف حكاية": "Every letter has a story",
    "يا لك من بطل!": "You're a star!",
    "الفضول أوّل خطوات التعلّم ♡": "Curiosity is the first step to learning ♡",
    "مع القرآن الكريم": "With the Holy Quran",
    "وقت للمرح والذكاء": "Time for fun and thinking",
    "من أوّل حرف… إلى أوّل حكاية": "From the first letter to the first story",
    "رحلة الحروف، خطوة بخطوة": "A letter journey, step by step",
    "كل يوم مغامرة جديدة": "A new adventure every day",
    "أهلًا بك في أثر": "Welcome to Athar",
    "جدول الحصص": "Lesson schedule",
    "التقويم": "Calendar",
    "إضافة حصة": "Add a lesson",
    "القصص": "Stories",
    "قراءة القصص": "Story reading",
    "اسمع الحروف": "Hear the letters",
    "دروس نور البيان": "Noor Al-Bayan lessons",
    "حسابك وإعداداتك": "Your account and settings",
    "شكل الموقع": "Appearance",
    "اختيار القارئ": "Choose a reciter",
    "دي تبويبات الموقع. هنعرفك بسرعة على أهم الأماكن، وتقدر تتخطّى الشرح في أي وقت.": "These are the site tabs. Let's quickly explore the main areas. You can skip this tour at any time.",
    "هنا تشوف حصص الأسبوع مرتبة حسب اليوم والوقت.": "See this week's lessons by day and time.",
    "التقويم يساعدك تراجع مواعيد الحصص حسب اليوم.": "The calendar helps you review lesson times by day.",
    "من هنا تسجل الطلاب وتتابع حصصهم.": "Add students and follow their lessons here.",
    "اكتب اسم الطالب وحدد موعد الحصة، ثم احفظ التسجيل. تقدر تسجل عائلة أو مجموعة كمان.": "Enter a student's name and lesson time, then save. You can also add a family or group.",
    "تابع عدد الحصص والساعات التي سجلتها لكل طالب خلال الشهر.": "Track the lessons and hours you recorded for each student this month.",
    "هنا ألعاب الحروف والحركات والدروس. اختار اللعبة وابدأ التدريب.": "Find games for letters, vowels, and lessons. Choose one to practice.",
    "ارسم واشرح على السبورة، واستخدم زر الرجوع للموقع لما تخلص.": "Draw and explain on the board. Use the back button when finished.",
    "اقرأ الآيات واستمع للتلاوة داخل تبويبة القرآن.": "Read verses and listen to recitations in the Quran tab.",
    "من القائمة دي اختار الشيخ الذي تحب تسمع صوته.": "Choose the reciter you want to hear from this list.",
    "افتح قصة، واستمع لها، واضغط على أي جملة لسماعها وحدها.": "Open a story, listen, and tap any sentence to hear it alone.",
    "من هنا تختار القصة، وتشغل القراءة أو توقفها في أي وقت.": "Choose a story and play or pause its reading here.",
    "اضغط على الحرف لتشاهده وتسمع نطقه.": "Tap a letter to see it and hear its sound.",
    "اختار أي حرف من البطاقات لتتعلم صوته وشكله.": "Choose a letter card to learn its sound and shape.",
    "افتح الدرس المناسب واقرأ الأمثلة، ثم جرّب لعبته في تبويبة الألعاب.": "Open a lesson, read its examples, then try its game in the games tab.",
    "كل مربع يفتح درسًا بأمثلته. تقدر ترجع لقائمة الدروس بعد ما تخلص.": "Each tile opens a lesson with examples. Return to the lesson list when finished.",
    "من صورة الحساب تفتح ملفك الشخصي وتغير إعداداتك وكلمة السر.": "Use the profile picture to open your account and change settings or password.",
    "من هنا تغيّر بين الوضع الفاتح والداكن حسب راحتك.": "Switch between light and dark modes here.",
    "الجرس يعرض لك التنبيهات الجديدة. كده أنت جاهز تبدأ!": "The bell shows new notifications. You're ready to begin!",
    "عالَم الصغار": "Kids' world",
    "حروفي": "Hurufi",
    "حروفي، الرئيسية": "Hurufi, home",
    "حروفي، الصفحة الرئيسية": "Hurufi, home",
    "مرحبًا أيّها المستكشف الصغير": "Welcome, little explorer",
    "من أوّل حرف إلى أجمل إنجاز… نتعلّم العربية والقرآن، ونكبر باللعب كلّ يوم.": "From the first letter to new achievements, we learn Arabic and Quran through play every day.",
    "نبدأ بأوّل حرف": "Start with the first letter",
    "ألعاب بلا إعلانات": "Ad-free games",
    "تعلّم على مهل": "Learn at your own pace",
    "بالعربية، بكل حبّ": "Arabic with love",
    "حروف، كلمات، وحكايات": "Letters, words, and stories",
    "نقرأ، نتذكّر، ونرتّب الآيات": "Read, remember, and order verses",
    "نلعب، نفكّر، ونكتشف": "Play, think, and explore",
    "٥ مستويات متدرجة. ابدأ من المرحلة المناسبة، وتقدّم على مهلك.": "Five levels. Start at your level and learn at your own pace.",
    "حروف صغيرة،": "Small letters,",
    "مغامرات كبيرة": "big adventures",
    "اسمع، اكتشف، والعب… رحلتك مع الحروف تبدأ هنا!": "Listen, explore, and play. Your letter journey starts here!",
    "لكل طفلٍ فضوليّ": "For every curious child",
    "التعلّم": "Learning",
    "التدريب": "Practice",
    "مستوى تعلّم العربية": "Arabic learning level",
    "تصنيف الألعاب": "Game categories",
    "١ · الحروف": "1 · Letters",
    "٢ · الأشكال والنقاط": "2 · Shapes and dots",
    "٣ · الحركات والمدود": "3 · Vowels and long sounds",
    "٤ · الكلمات": "4 · Words",
    "٥ · القراءة": "5 · Reading",
    "جرّب «حروف» أو «ذاكرة» أو اختر قسمًا آخر.": "Try 'letters' or 'memory', or choose another category.",
    "نلعب، نفكّر، ونكتشف": "Play, think, and explore",
    "لأهل المستكشف الصغير": "For families",
    "شاهد إنجازاته": "See progress",
    "كتم الصوت": "Mute sound",
    "تفعيل الوضع الداكن": "Enable dark mode",
    "الوضع الداكن": "Dark mode",
    "ابدأ من جديد ↻": "Start again ↻",
    "العودة إلى عالم حروفي": "Back to Hurufi",
    "كل محاولة تستحقّ الاحتفال": "Every try is worth celebrating",
    "يا لك من مستكشف رائع!": "You're a wonderful explorer!",
    "إنجازاتك محفوظة على هذا الجهاز، لنكمل رحلتنا معًا.": "Your progress is saved on this device. Let's keep going!",
    "نجمة جمعت": "Stars earned",
    "حرفًا اكتشفت": "Letters discovered",
    "مغامرة أكملت": "Adventures completed",
    "آخر اكتشافاتك": "Recent discoveries",
    "مغامرة جديدة": "New adventure",
    "مساحة صغيرة للعب، وعالم كبير للتعلّم.": "A little place to play and a big world to learn.",
    "جرّب التشجيع": "Hear encouragement",
    "صُنع لفضول الصغار": "Made for curious kids",
    "حروفي — كل حرف مغامرة": "Hurufi — Every letter is an adventure",
    "نتعلّم": "Learn",
    "نلعب": "Play",
    "يا أهلًا بالأبطال!": "Welcome, champions!",
    "على مهلك… كل خطوة إنجاز": "Take your time. Every step counts.",
    "لنتعرّف على": "Let's meet",
    "مثل كلمة": "As in",
    "اسمع الحرف": "Hear the letter",
    "أصدقاؤنا الحروف": "Our letter friends",
    "اضغط على أي حرف لتسمع اسمه": "Tap any letter to hear its name",
    "٢٨ حرفًا": "28 letters",
    "بداية جميلة!": "A great start!",
    "جاهز لتحدٍّ صغير؟": "Ready for a small challenge?",
    "اسمع الحرف، واعثر عليه… واجمع النجوم!": "Hear a letter, find it, and collect stars!",
    "هيا نلعب": "Let's play",
    "تحدّي الاستماع": "Listening challenge",
    "أُذُن تسمع، وعين تكتشف!": "Listen closely and spot the letter!",
    "ابدأ المغامرة": "Start the adventure",
    "لا يوجد وقت محدّد. خذ راحتك ♡": "No time limit. Take your time ♡",
    "أيّ حرف سمعت؟": "Which letter did you hear?",
    "أنهيت المغامرة!": "Adventure complete!",
    "أحسنت يا بطل!": "Well done!",
    "كل خطوة تستحقّ الاحتفال": "Every step deserves celebration",
    "هذه مغامرتك أنت!": "This is your adventure!",
    "إنجازاتك محفوظة على هذا الجهاز، لنكمل من حيث توقّفنا.": "Your progress is saved on this device. Continue where you left off.",
    "أفضل نتيجة": "Best score",
  };

  const placeholders = {
    "مثال: جود - تالا - علي": "Example: Joud - Tala - Ali",
    "مثال: عائلة الخالدي": "Example: Al-Khaldi family",
    "مثال: 8 - 10": "Example: 8 - 10",
    "مثال: بداية من سورة البقرة / غايب الأسبوع الجاي": "Example: Start from Surah Al-Baqarah / absent next week",
    "ابحث باسم الطالب...": "Search by student name...",
    "اكتب الملاحظة هنا...": "Write your note here...",
    "ابحث عن لعبة…": "Search for a game…",
    "ابحث عن لعبة": "Search for a game",
  };

  const keepArabic = "[data-keep-ar], .basmala, .hadith-text, .noor-word, #letters-grid, #schedule-body, #students-body, #hv-body, #hv-foot, #nc-names, #note-info, #modal-info, #pm-name, #pm-phone, .pick-box, #qt-list, #qt-bism, #q-chips, #q-list, #q-name, #q-psurahs, #q-rec-name, #story-text, #ending, #scene-caption, #detail-title, #story-grid, #game-library, #activity-stage, #activity-title, #activity-description, #activity-category";
  const originals = new WeakMap();
  const attributes = new WeakMap();
  const originalTitle = document.title;
  let language = "ar";
  try {
    const cookie = /(?:^|;\s*)athar_ui_lang=(en|ar)(?:;|$)/.exec(document.cookie)?.[1];
    language = window.parent !== window
      ? window.parent.AtharI18n?.language || cookie || "ar"
      : cookie || window.ServerStore?.getItem("ui-language") || "ar";
  } catch { /* An independent page starts in Arabic. */ }

  const normalized = (value) => value.trim().replace(/\s+/g, " ");
  function skip(element) {
    return !element || element.closest(keepArabic) ||
      element.closest("script, style, svg, textarea, [contenteditable]");
  }
  function translateText(node) {
    if (skip(node.parentElement)) return;
    const current = node.nodeValue;
    const original = originals.get(node);
    if (original === undefined || (current !== original && current !== translate(original)))
      originals.set(node, current);
    const source = originals.get(node);
    const target = language === "en" ? translate(source) : source;
    if (current !== target) node.nodeValue = target;
  }
  function translate(value) {
    const key = normalized(value);
    const result = ui[key] || placeholders[key];
    if (!result) return value;
    const leading = value.match(/^\s*/)?.[0] || "";
    const trailing = value.match(/\s*$/)?.[0] || "";
    return leading + result + trailing;
  }
  function translateAttributes(element) {
    if (skip(element)) return;
    let saved = attributes.get(element);
    if (!saved) { saved = {}; attributes.set(element, saved); }
    for (const name of ["title", "aria-label", "placeholder", "alt"]) {
      if (!element.hasAttribute(name)) continue;
      const current = element.getAttribute(name);
      if (saved[name] === undefined || (current !== saved[name] && current !== translate(saved[name])))
        saved[name] = current;
      const target = language === "en" ? translate(saved[name]) : saved[name];
      if (current !== target) element.setAttribute(name, target);
    }
  }
  function walk(root) {
    if (!root || !document.body) return;
    if (root.nodeType === Node.TEXT_NODE) return translateText(root);
    if (root.nodeType !== Node.ELEMENT_NODE || skip(root)) return;
    translateAttributes(root);
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT);
    while (walker.nextNode()) {
      const node = walker.currentNode;
      if (node.nodeType === Node.TEXT_NODE) translateText(node);
      else translateAttributes(node);
    }
  }
  function updateButton() {
    const button = document.getElementById("language-toggle");
    if (!button) return;
    button.textContent = language === "en" ? "العربية" : "English";
    button.title = language === "en" ? "التحويل إلى العربية" : "Switch to English";
    button.setAttribute("aria-label", button.title);
    button.setAttribute("aria-pressed", String(language === "en"));
  }
  function setLanguage(next, persist = true) {
    if (persist && window.top !== window) {
      try {
        if (window.top.AtharI18n) {
          window.top.AtharI18n.setLanguage(next, true);
          return;
        }
      } catch { /* A standalone frame keeps its own preference. */ }
    }
    language = next === "en" ? "en" : "ar";
    document.documentElement.lang = language;
    document.documentElement.classList.toggle("ui-en", language === "en");
    document.title = language === "en" ? translate(originalTitle) : originalTitle;
    if (persist) {
      window.ServerStore?.setItem("ui-language", language);
      document.cookie = `athar_ui_lang=${language}; Path=/; Max-Age=31536000; SameSite=Lax`;
    }
    if (document.body) walk(document.body);
    updateButton();
    for (const frame of document.querySelectorAll("iframe")) {
      try { frame.contentWindow?.AtharI18n?.setLanguage(language, false); } catch { /* Other origins cannot be updated. */ }
    }
    window.dispatchEvent(new CustomEvent("athar:language", { detail: { language } }));
  }
  window.AtharI18n = {
    get language() { return language; },
    t(value) { return language === "en" ? translate(value) : value; },
    setLanguage,
    toggle() { setLanguage(language === "en" ? "ar" : "en"); },
  };

  function ready() {
    setLanguage(language, false);
    const connectedFrames = new WeakSet();
    function connectFrame(frame) {
      if (connectedFrames.has(frame)) return;
      connectedFrames.add(frame);
      frame.addEventListener("load", () => {
        try { frame.contentWindow?.AtharI18n?.setLanguage(language, false); } catch { /* Keep Arabic in other origins. */ }
      });
    }
    const observer = new MutationObserver((records) => {
      for (const record of records) {
        if (record.type === "characterData") walk(record.target);
        else if (record.type === "attributes") translateAttributes(record.target);
        else for (const node of record.addedNodes) {
          walk(node);
          if (node.nodeType === Node.ELEMENT_NODE) {
            if (node.tagName === "IFRAME") connectFrame(node);
            node.querySelectorAll("iframe").forEach(connectFrame);
          }
        }
      }
    });
    observer.observe(document.body, {
      childList: true, characterData: true, attributes: true, subtree: true,
      attributeFilter: ["title", "aria-label", "placeholder", "alt"],
    });
    document.querySelectorAll("iframe").forEach(connectFrame);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", ready, { once: true });
  else ready();
})();
