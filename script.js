// Initialize AOS
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// DOM Elements
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle.querySelector('i');
const langToggle = document.getElementById('lang-toggle');
const langText = langToggle.querySelector('.lang-text');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelector('.nav-links');
const downloadBtn = document.getElementById('download-cv');

// Theme Management
const savedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';

    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    if (theme === 'dark') {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    }
}

// Mobile Menu
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Language Management
let currentLang = 'vi'; // Default Vietnamese
const translations = {
    vi: {
        nav_home: "Trang chủ",
        nav_about: "Giới thiệu",
        nav_projects: "Dự án",
        nav_contact: "Liên hệ",
        hero_greeting: "Xin chào, tôi là",
        hero_role: "Business Analyst & Software Implementation",
        hero_desc: "Sinh viên Hệ thống thông tin quản lý với tư duy logic sắc bén, niềm đam mê công nghệ và kỹ năng mềm xuất sắc. Sẵn sàng chinh phục các thử thách trong lĩnh vực Phân tích nghiệp vụ và Kỹ sư cầu nối.",
        btn_contact: "Liên hệ ngay",
        btn_cv: "Tải xuống CV",
        sect_about: "Học vấn & Kinh nghiệm",
        edu_school: "Trường Đại học Tài chính - Marketing (UFM)",
        edu_major: "Chuyên ngành: Hệ thống thông tin quản lý",
        edu_desc1: "Định hướng ứng dụng công nghệ vào quản lý doanh nghiệp.",
        edu_desc2: "Đã hoàn thành khóa đào tạo 6 kỹ năng mềm xuất sắc.",
        sect_projects: "Dự án Tiêu biểu",
        cat_key: "Dự án Trọng điểm",
        cat_analysis: "Nhóm Phân tích & Quy trình",
        cat_tech: "Nhóm Kỹ thuật & Hạ tầng",
        cat_biz: "Nhóm Trải nghiệm & Kinh doanh",
        proj_storestar_desc: "Phần mềm quản lý kho (C# WinForms & SQL Server). Quản lý nhập/xuất, tối ưu DB, báo cáo tự động.",
        proj_ba: "Phân tích nghiệp vụ (BA)",
        proj_sad: "Phân tích thiết kế hệ thống (SAD)",
        proj_erp: "Hệ thống ERP",
        proj_sql: "Hệ quản trị SQL Server",
        proj_cloud: "Điện toán đám mây",
        proj_net: "Mạng máy tính",
        proj_ux: "Đồ án UX UI",
        proj_pres: "Thuyết trình UX UI",
        proj_ecom: "Thương mại điện tử",
        sect_contact: "Liên hệ",
        contact_addr: "Địa chỉ",
        contact_phone: "Điện thoại / Zalo",
        contact_email: "Email",
        btn_send: "Gửi tin nhắn",
        lbl_view_doc: "Xem tài liệu",
        loading: "Đang tải..."
    },
    en: {
        nav_home: "Home",
        nav_about: "About",
        nav_projects: "Projects",
        nav_contact: "Contact",
        hero_greeting: "Hello, I am",
        hero_role: "Business Analyst & Software Implementation",
        hero_desc: "MIS student with sharp logical thinking, passion for technology, and excellent soft skills. Ready to conquer challenges in Business Analysis and BrSE fields.",
        btn_contact: "Contact Me",
        btn_cv: "Download CV",
        sect_about: "Education & Experience",
        edu_school: "University of Finance - Marketing (UFM)",
        edu_major: "Major: Management Information Systems",
        edu_desc1: "Focused on applying technology to business management.",
        edu_desc2: "Completed excellent training in 6 soft skills.",
        sect_projects: "Featured Projects",
        cat_key: "Key Projects",
        cat_analysis: "Analysis & Process",
        cat_tech: "Technical & Infrastructure",
        cat_biz: "Experience & Business",
        proj_storestar_desc: "Warehouse Management Software (C# & SQL). Import/Export management, DB optimization, auto reporting.",
        proj_ba: "Business Analysis (BA)",
        proj_sad: "System Analysis & Design (SAD)",
        proj_erp: "ERP System",
        proj_sql: "SQL Server Management",
        proj_cloud: "Cloud Computing",
        proj_net: "Computer Networking",
        proj_ux: "UX UI Project",
        proj_pres: "UX UI Presentation",
        proj_ecom: "E-Commerce",
        sect_contact: "Contact",
        contact_addr: "Address",
        contact_phone: "Phone / Zalo",
        contact_email: "Email",
        btn_send: "Send Message",
        lbl_view_doc: "View Document",
        loading: "Loading..."
    }
};

langToggle.addEventListener('click', () => {
    currentLang = currentLang === 'vi' ? 'en' : 'vi';
    langText.textContent = currentLang.toUpperCase();
    updateLanguage();
});

function updateLanguage() {
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[currentLang][key]) {
            // Preserve child elements (like icons) if any
            if (element.children.length > 0 && key === 'lbl_view_doc') {
                element.innerHTML = `${translations[currentLang][key]} <i class="fas fa-arrow-right"></i>`;
            } else {
                element.textContent = translations[currentLang][key];
            }
        }
    });
}

// CV Download Simulation
downloadBtn.addEventListener('click', () => {
    const originalText = downloadBtn.querySelector('span').textContent;

    downloadBtn.classList.add('loading');

    // Simulate delay
    setTimeout(() => {
        downloadBtn.classList.remove('loading');

        // In a real scenario, this would trigger a file download
        // window.location.href = 'path/to/cv.pdf';
        alert(currentLang === 'vi' ? "Chức năng đang được cập nhật (Demo)" : "Feature coming soon (Demo)");

    }, 2000);
});
