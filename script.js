// ========================================
// EmailJS Initialization
// ========================================
(function() {
    emailjs.init({
        publicKey: "EQJtte7ujELi-xdE1",
    });
})();
// ========================================
// Portfolio Website - JavaScript
// ========================================

// ----------------------------------------
// Feature 1: Hero Title Changer
// ----------------------------------------

const heroTitle = document.querySelector("#hero-title");
const changeBtn = document.querySelector("#change-title-btn");

const titles = [
    "مرحباً، أنا رسلان 👋",
    "مطور Full Stack محترف 💻",
    "بحوّل الأفكار لمواقع حقيقية ✨",
    "جاهز لمشروعك القادم 🚀",
    "أكتب كود Python & JavaScript 🐍"
];

let currentTitleIndex = 0;

changeBtn.addEventListener("click", function() {
    currentTitleIndex = currentTitleIndex + 1;
    
    if (currentTitleIndex >= titles.length) {
        currentTitleIndex = 0;
    }
    
    heroTitle.textContent = titles[currentTitleIndex];
});
// ----------------------------------------
// Feature 2: Contact Form Validation
// ----------------------------------------

// لقّي الـ Form والحقول
const contactForm = document.querySelector("#contact-form");
const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const messageInput = document.querySelector("#message");

// لقّي أماكن رسائل الخطأ
const nameError = document.querySelector("#name-error");
const emailError = document.querySelector("#email-error");
const messageError = document.querySelector("#message-error");

// لقّي رسالة النجاح
const successMessage = document.querySelector("#success-message");

// دالة مساعدة: تنظيف كل رسائل الخطأ السابقة
function clearErrors() {
    nameError.textContent = "";
    emailError.textContent = "";
    messageError.textContent = "";
    
    nameInput.classList.remove("error");
    emailInput.classList.remove("error");
    messageInput.classList.remove("error");
}

// دالة مساعدة: إظهار خطأ على حقل معين
function showError(inputElement, errorElement, message) {
    errorElement.textContent = message;
    inputElement.classList.add("error");
}

// دالة: التحقق من صيغة الإيميل
function isValidEmail(email) {
    // نتحقق إن فيه @ وفيه نقطة بعدها
    return email.includes("@") && email.includes(".");
}

// الحدث الرئيسي: لما المستخدم يضغط "إرسال"
contactForm.addEventListener("submit", function(event) {
    // منع الإرسال الافتراضي
    event.preventDefault();
    
    // نظّف أي أخطاء سابقة
    clearErrors();
    successMessage.classList.remove("show");
    
    // اقرأ القيم (مع إزالة المسافات الزيادة)
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();
    
    // متغير لتتبع وجود أخطاء
    let hasErrors = false;
    
    // تحقق من الاسم
    if (name === "") {
        showError(nameInput, nameError, "⚠️ من فضلك ادخل اسمك");
        hasErrors = true;
    } else if (name.length < 3) {
        showError(nameInput, nameError, "⚠️ الاسم قصير جداً (3 أحرف على الأقل)");
        hasErrors = true;
    }
    
    // تحقق من الإيميل
    if (email === "") {
        showError(emailInput, emailError, "⚠️ من فضلك ادخل بريدك الإلكتروني");
        hasErrors = true;
    } else if (!isValidEmail(email)) {
        showError(emailInput, emailError, "⚠️ صيغة البريد الإلكتروني غير صحيحة");
        hasErrors = true;
    }
    
    // تحقق من الرسالة
    if (message === "") {
        showError(messageInput, messageError, "⚠️ من فضلك اكتب رسالتك");
        hasErrors = true;
    } else if (message.length < 10) {
        showError(messageInput, messageError, "⚠️ الرسالة قصيرة جداً (10 أحرف على الأقل)");
        hasErrors = true;
    }
    
    // القرار النهائي
if (hasErrors === false) {
    // اعرض رسالة "جاري الإرسال"
    successMessage.textContent = "⏳ جاري إرسال رسالتك...";
    successMessage.classList.add("show");
    successMessage.style.backgroundColor = "#fff3cd";
    successMessage.style.color = "#856404";
    successMessage.style.borderRightColor = "#ffc107";
    
    // البيانات اللي هتتبعت لـ EmailJS
    const templateParams = {
        name: name,
        email: email,
        message: message,
        time: new Date().toLocaleString("ar-EG")
    };
    
    // إرسال الإيميل
    emailjs.send("service_9999", "template_0lheq3c", templateParams)
        .then(function(response) {
            // نجاح الإرسال
            successMessage.textContent = "✅ تم إرسال رسالتك بنجاح! هتوصلني ورد عليك قريب.";
            successMessage.style.backgroundColor = "#d4edda";
            successMessage.style.color = "#155724";
            successMessage.style.borderRightColor = "#28a745";
            
            contactForm.reset();
            console.log("Email sent successfully!", response);
        })
        .catch(function(error) {
            // حصل خطأ
            successMessage.textContent = "❌ حصل خطأ في الإرسال. جرب تاني أو تواصل معي على WhatsApp.";
            successMessage.style.backgroundColor = "#f8d7da";
            successMessage.style.color = "#721c24";
            successMessage.style.borderRightColor = "#dc3545";
            
            console.error("Email failed to send:", error);
        });
}
});
// ----------------------------------------
// Feature 3: Scroll to Top Button
// ----------------------------------------

// لقّي الزرار
const scrollTopBtn = document.querySelector("#scroll-top-btn");

// الحدث 1: سمع للـ scroll على النافذة
window.addEventListener("scroll", function() {
    // لو المستخدم نزل أكتر من 300 بيكسل
    if (window.scrollY > 300) {
        scrollTopBtn.classList.add("show");
    } else {
        scrollTopBtn.classList.remove("show");
    }
});

// الحدث 2: لما المستخدم يضغط الزرار
scrollTopBtn.addEventListener("click", function() {
    // ارجع لأول الصفحة بشكل smooth
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});
// ----------------------------------------
// Feature 4: Language Switcher (i18n)
// ----------------------------------------

// قاموس الترجمات
const translations = {
    ar: {
        // Navbar
        navAbout: "نبذة عني",
        navSkills: "المهارات",
        navProjects: "المشاريع",
        navContact: "تواصل معي",
        
        // Hero Section
        heroTitle: "مرحباً، أنا رسلان",
        heroSubtitle: "مطور Full Stack | Python & Web Development",
        heroDescription: "أبني مواقع ويب احترافية وأنظمة إدارية متكاملة تحوّل أفكارك إلى واقع",
        heroBtnProjects: "شوف مشاريعي",
        heroBtnContact: "تواصل معي",
        heroBtnChangeTitle: "🎨 غيّر العنوان",
        
        // About Section
        aboutTitle: "نبذة عني",
        aboutP1Pre: "مرحباً! أنا ",
        aboutP1Name: "رسلان",
        aboutP1Post: "، مطور Full Stack متخصص في بناء تطبيقات ويب كاملة.",
        aboutP2Pre: "أمتلك خبرة قوية في ",
        aboutP2Python: "Python",
        aboutP2And: " و ",
        aboutP2Flask: "Flask",
        aboutP2Post: " لتطوير الـ Backend، وأقوم حالياً بتوسيع مهاراتي في الـ Frontend باستخدام أحدث تقنيات الويب.",
        aboutP3Pre: "من أحدث مشاريعي: ",
        aboutP3Project: "Payment Approval System",
        aboutP3Post: " - نظام متكامل لإدارة الموافقات المالية باستخدام Python/Flask، يتضمن صلاحيات متعددة (RBAC) وسير عمل تلقائي (Workflows).",
        aboutP4: "أبحث عن فرص لتطوير مواقع ويب احترافية للشركات والأفراد.",
        
        // Skills Section
        skillsTitle: "مهاراتي",
        
        // Projects Section
        projectsTitle: "مشاريعي",
        projectName: "Payment Approval System",
        projectType: "نظام ويب متكامل | Python & Flask",
        projectDescription: "نظام احترافي لإدارة الموافقات المالية في الشركات. يسمح للموظفين بتقديم طلبات الدفع، ويقوم المدراء بمراجعتها والموافقة عليها بناءً على صلاحيات محددة.",
        projectFeaturesTitle: "المميزات التقنية:",
        projectFeature1: "نظام صلاحيات متعددة (RBAC)",
        projectFeature2: "تنظيم الكود باستخدام Flask Blueprints",
        projectFeature3: "سير عمل تلقائي للموافقات (Workflows)",
        projectFeature4: "قاعدة بيانات PostgreSQL",
        projectFeature5: "واجهة إدارة للمديرين",
        
        // Contact Section
        contactTitle: "تواصل معي",
        contactName: "الاسم:",
        contactEmail: "البريد الإلكتروني:",
        contactMessage: "الرسالة:",
        contactSubmit: "إرسال",
        
        // Footer
        footerContact: "تواصل معي عبر:",
        footerGithub: "GitHub",
        footerEmail: "البريد الإلكتروني",
        footerWhatsapp: "WhatsApp",
        footerCopyright: "© 2026 رسلان - جميع الحقوق محفوظة",
        
        // Language Button
        langBtn: "EN"
    },
    
    en: {
        // Navbar
        navAbout: "About",
        navSkills: "Skills",
        navProjects: "Projects",
        navContact: "Contact",
        
        // Hero Section
        heroTitle: "Hello, I'm Raslan",
        heroSubtitle: "Full Stack Developer | Python & Web Development",
        heroDescription: "I build professional websites and integrated management systems that turn your ideas into reality",
        heroBtnProjects: "View My Projects",
        heroBtnContact: "Contact Me",
        heroBtnChangeTitle: "🎨 Change Title",
        
        // About Section
        aboutTitle: "About Me",
        aboutP1Pre: "Hello! I'm ",
        aboutP1Name: "Raslan",
        aboutP1Post: ", a Full Stack Developer specialized in building complete web applications.",
        aboutP2Pre: "I have strong experience in ",
        aboutP2Python: "Python",
        aboutP2And: " and ",
        aboutP2Flask: "Flask",
        aboutP2Post: " for Backend development, and I'm currently expanding my Frontend skills using the latest web technologies.",
        aboutP3Pre: "One of my latest projects: ",
        aboutP3Project: "Payment Approval System",
        aboutP3Post: " - An integrated system for managing financial approvals using Python/Flask, featuring multiple permissions (RBAC) and automatic workflows.",
        aboutP4: "I'm looking for opportunities to develop professional websites for companies and individuals.",
        
        // Skills Section
        skillsTitle: "My Skills",
        
        // Projects Section
        projectsTitle: "My Projects",
        projectName: "Payment Approval System",
        projectType: "Integrated Web System | Python & Flask",
        projectDescription: "A professional system for managing financial approvals in companies. Allows employees to submit payment requests, and managers to review and approve them based on specific permissions.",
        projectFeaturesTitle: "Technical Features:",
        projectFeature1: "Role-Based Access Control (RBAC)",
        projectFeature2: "Code organization using Flask Blueprints",
        projectFeature3: "Automated approval workflows",
        projectFeature4: "PostgreSQL database",
        projectFeature5: "Admin dashboard for managers",
        
        // Contact Section
        contactTitle: "Contact Me",
        contactName: "Name:",
        contactEmail: "Email:",
        contactMessage: "Message:",
        contactSubmit: "Send",
        
        // Footer
        footerContact: "Connect with me:",
        footerGithub: "GitHub",
        footerEmail: "Email",
        footerWhatsapp: "WhatsApp",
        footerCopyright: "© 2026 Raslan - All Rights Reserved",
        
        // Language Button
        langBtn: "عربي"
    }
};
// ----------------------------------------
// Feature 4 - Part 2: Language Switcher Logic
// ----------------------------------------

// لقّي الزرار والنص الموجود فيه
const langSwitchBtn = document.querySelector("#lang-switch-btn");
const langBtnText = document.querySelector("#lang-btn-text");

// المتغير اللي بيحفظ اللغة الحالية (الافتراضي: عربي)
let currentLanguage = "ar";

// دالة رئيسية: تبديل لغة الموقع
function switchLanguage(lang) {
    // 1. لقّي كل العناصر اللي فيها data-i18n
    const elements = document.querySelectorAll("[data-i18n]");
    
    // 2. لكل عنصر، غيّر نصه للترجمة المناسبة
    elements.forEach(function(element) {
        // هات المفتاح اللي في data-i18n
        const key = element.getAttribute("data-i18n");
        
        // هات الترجمة من القاموس
        const translation = translations[lang][key];
        
        // لو الترجمة موجودة، غيّر النص
        if (translation) {
            element.textContent = translation;
        }
    });
    
    // 3. غيّر اتجاه الصفحة (RTL للعربي، LTR للإنجليزي)
    if (lang === "ar") {
        document.documentElement.setAttribute("lang", "ar");
        document.documentElement.setAttribute("dir", "rtl");
    } else {
        document.documentElement.setAttribute("lang", "en");
        document.documentElement.setAttribute("dir", "ltr");
    }
    
    // 4. غيّر نص الزرار نفسه
    langBtnText.textContent = translations[lang].langBtn;
    
    // 5. احفظ اللغة الحالية
    currentLanguage = lang;
}

// الحدث: لما المستخدم يضغط الزرار
langSwitchBtn.addEventListener("click", function() {
    // لو اللغة الحالية عربي، حوّل لإنجليزي والعكس
    if (currentLanguage === "ar") {
        switchLanguage("en");
    } else {
        switchLanguage("ar");
    }
});