// Các phần tử DOM
const body = document.body;
const themeToggle = document.getElementById('theme-toggle');
const langToggle = document.getElementById('lang-toggle');
const langText = document.getElementById('lang-text');

// Biến quản lý hiệu ứng Typing
let typingInterval;
let roleInterval;
let roleTimeout;

// Khởi tạo AOS (Hiệu ứng cuộn)
document.addEventListener('DOMContentLoaded', () => {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });

    // Kiểm tra chủ đề đã lưu
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.setAttribute('data-theme', 'dark');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }

    // Kiểm tra ngôn ngữ đã lưu
    const savedLang = localStorage.getItem('lang') || 'vi';
    updateLanguage(savedLang);
});

// Chuyển đổi giao diện (Sáng/Tối)
themeToggle.addEventListener('click', () => {
    if (body.getAttribute('data-theme') === 'dark') {
        body.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    } else {
        body.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
});

// Dữ liệu Ngôn ngữ (VI/EN)
const resources = {
    vi: {
        nav_home: "Trang chủ",
        nav_about: "Giới thiệu",
        nav_projects: "Dự án",
        nav_contact: "Liên hệ",
        hero_role: "Mình là Đặng Phạm Hồng Nhung",
        hero_sub: ["Business Analyst", "Triển khai ERP", "BrSE"], // Mảng các vai trò
        hero_desc: "Mình là sinh viên năm cuối ngành Hệ thống thông tin quản lý, chuyên ngành Hệ thống thông tin kế toán tại UFM. Hiện tại đang chờ bằng tốt nghiệp và có thể bắt đầu công việc Full-time ngay lập tức. Với tinh thần cầu tiến và mong muốn được gắn bó lâu dài, mình luôn sẵn sàng bắt đầu từ những vị trí thực tập/fresher để học hỏi, ứng dụng kiến thức vào thực tế nhằm tạo ra giá trị cho quý công ty. Mình cũng rất sẵn sàng đi công tác để hỗ trợ dự án khi có yêu cầu.",
        btn_projects: "Xem Dự Án",
        btn_cv: "Xem CV",
        view_detail: "Xem chi tiết",
        view_drive: "Xem chi tiết trên Google Drive",
        view_demo: "Xem Demo Thuyết trình UXUI",
        about_title: "Về Bản Thân",
        edu_title: "Học Vấn",
        edu_sch: "Đại học Tài chính - Marketing (UFM)",
        edu_major: "Ngành: Hệ thống thông tin quản lý",
        edu_spec: "Chuyên ngành: Hệ thống thông tin kế toán",
        exp_title: "Kinh Nghiệm",
        exp_company: "Công ty Cổ phần Công nghệ Sapo",
        exp_role: "Thực tập sinh Tư vấn triển khai",
        exp_desc: "Hỗ trợ triển khai hệ thống và phối hợp cùng Sales tư vấn giải pháp.",
        skills_title: "Kỹ Năng",
        lang_title: "Ngoại Ngữ",
        cert_caption: "Chứng chỉ Tiếng Anh (B2 Aptis)",
        goals_title: "Mục Tiêu Tương Lai",
        goals_desc: "Mình luôn nỗ lực không ngừng để học hỏi những kiến thức mới phục vụ cho công việc. Hiện tại, mình đang dành thời gian tìm hiểu về AI và Automation Workflow (n8n) để tối ưu hóa các quy trình nghiệp vụ. Mình mong muốn tìm kiếm một môi trường chuyên nghiệp để có thể gắn bó, phát triển bền vững và cùng công ty chinh phục những mục tiêu lớn hơn.",
        projects_title: "Dự Án Tiêu Biểu",
        contact_title: "Liên Hệ",
        contact_address: "Phường Phú Định, Thành phố Hồ Chí Minh",
        footer_copy: "© 2025 | Đặng Phạm Hồng Nhung. All rights reserved.",
        // Tiêu đề Dự án
        proj_storestar_title: "StoreStar - Quản lý tồn kho",
        proj_ba_title: "Quy trình kho TGDĐ",
        proj_samco_title: "Quản lý thiết bị SAMCO",
        proj_erp_title: "SAP S/4HANA Global Bike",
        proj_ui_title: "App Du lịch & Review",
        proj_sql_title: "Quản lý Sinh viên",
        proj_ecommerce_title: "Website Tumie Pet Shop",
        proj_network_title: "Mạng doanh nghiệp SMB",
        proj_cloud_title: "Nền tảng công nghệ Amazon"
    },
    en: {
        nav_home: "Home",
        nav_about: "About",
        nav_projects: "Projects",
        nav_contact: "Contact",
        hero_role: "Hello there! I'm Nhung",
        hero_sub: ["Business Analyst", "ERP Implementation", "BrSE"], // Roles array
        hero_desc: "I'm a final-year MIS student at UFM, specializing in Accounting Information Systems. I am currently awaiting my degree and available for full-time positions. My goal is to build a long-term career where I can apply my knowledge to create real value for the company. I am highly motivated, eager to learn new skills, and fully prepared for business travel to support project needs.",
        btn_projects: "View Projects",
        btn_cv: "View CV",
        view_detail: "View Details",
        view_drive: "View Details on Google Drive",
        view_demo: "View UXUI Presentation Demo",
        about_title: "About Me",
        edu_title: "Education",
        edu_sch: "University of Finance - Marketing (UFM)",
        edu_major: "Major: Management Information Systems",
        edu_spec: "Specialization: Accounting Information Systems",
        exp_title: "Experience",
        exp_company: "Sapo Technology JSC",
        exp_role: "Implementation Consultant Intern",
        exp_desc: "Supported system implementation and coordinated with Sales for solution consulting.",
        skills_title: "Skills",
        lang_title: "Languages",
        cert_caption: "English Certificate (B2 Aptis)",
        goals_title: "Future Goals",
        goals_desc: "I am committed to continuous learning to enhance my professional value. I am currently focusing on AI and Automation Workflow (n8n) to streamline business processes. My aspiration is to find a professional environment for long-term commitment, where I can grow and contribute to the company's success.",
        projects_title: "Featured Projects",
        contact_title: "Contact Me",
        contact_address: "Phu Dinh Ward, Ho Chi Minh City",
        footer_copy: "© 2025 | Dang Pham Hong Nhung. All rights reserved.",
        // Project Titles
        proj_storestar_title: "StoreStar - Inventory Management",
        proj_ba_title: "MWG Warehouse Process",
        proj_samco_title: "SAMCO Equipment Mgmt",
        proj_erp_title: "SAP S/4HANA Global Bike",
        proj_ui_title: "Travel & Review App",
        proj_sql_title: "Student Management",
        proj_ecommerce_title: "Tumie Pet Shop Website",
        proj_network_title: "SMB Network Infrastructure",
        proj_cloud_title: "Amazon Cloud Platform"
    }
};

// ... (Các phần Project Data không đổi, giữ nguyên để tiết kiệm token hiển thị nhưng khi write file sẽ ghi đủ)
// Dữ liệu Chi tiết Dự án (Bao gồm Link Google Drive)
const projectData = {
    storestar: {
        images: ["assets/img/KhoaLuanTotNghiep/dashboard.png", "assets/img/KhoaLuanTotNghiep/baocaokho.png", "assets/img/KhoaLuanTotNghiep/erd.png"],
        title: { vi: "StoreStar - Quản lý tồn kho (Khóa luận - Điểm A+)", en: "StoreStar - Inventory Management (Thesis - A+ Grade)" },
        desc: {
            vi: "<ul><li><strong>Nghiệp vụ:</strong> Chuyển đổi quản lý thủ công sang tự động cho chuỗi Tin Học Ngôi Sao.</li><li><strong>Công nghệ:</strong> C# .NET, SQL Server, Crystal Reports.</li><li><strong>Công việc:</strong> Thiết kế DB 20+ bảng; Lập trình Nhập/Xuất, cảnh báo tồn và báo cáo tự động.</li></ul>",
            en: "<ul><li><strong>Business:</strong> Transformed manual management to automated for Tin Hoc Ngoi Sao chain.</li><li><strong>Tech:</strong> C# .NET, SQL Server, Crystal Reports.</li><li><strong>Tasks:</strong> Designed 20+ table DB; Programmed Import/Export, stock alerts, and automated reporting.</li></ul>"
        },
        link: "https://drive.google.com/file/d/1cft_ibgM5IoU3GSnApQOjH9duziAz3HP/view"
    },
    ba_tgdd: {
        images: ["assets/img/PhanTichNghiepVu/1.png", "assets/img/PhanTichNghiepVu/2.png", "assets/img/PhanTichNghiepVu/4.png"],
        title: { vi: "Phân tích nghiệp vụ (BA) - Kho Thế Giới Di Động", en: "Business Analysis (BA) - Mobile World Warehouse" },
        desc: {
            vi: "<ul><li><strong>Nghiệp vụ:</strong> Chuẩn hóa vận hành từ kho tổng đến cửa hàng bán lẻ.</li><li><strong>Công cụ:</strong> Visio, Draw.io, BPMN 2.0.</li><li><strong>Công việc:</strong> Vẽ luồng Nhập/Xuất/Trả hàng; Viết đặc tả SRS và User Stories.</li></ul>",
            en: "<ul><li><strong>Business:</strong> Standardized operations from central warehouse to retail stores.</li><li><strong>Tools:</strong> Visio, Draw.io, BPMN 2.0.</li><li><strong>Tasks:</strong> Mapped Import/Export/Return flows; Wrote SRS specs and User Stories.</li></ul>"
        },
        link: "https://drive.google.com/file/d/1xaRDl-yU8ICAJUWNvsKtnuijAQgVJgrR/view"
    },
    sad_samco: {
        images: ["assets/img/PhanTichThietKeHTTT/1.png", "assets/img/PhanTichThietKeHTTT/2.png", "assets/img/PhanTichThietKeHTTT/3.png", "assets/img/PhanTichThietKeHTTT/4.png", "assets/img/PhanTichThietKeHTTT/5.png"],
        title: { vi: "Quản lý thiết bị SAMCO (Phân tích & Thiết kế HTTT)", en: "SAMCO Equipment Mgmt (System Analysis & Design)" },
        desc: {
            vi: "<ul><li><strong>Nghiệp vụ:</strong> Quản lý bảo trì máy móc tại SAMCO.</li><li><strong>Vai trò:</strong> System Analyst. Thiết kế UML (Use Case, Sequence, Activity) và Prototype Figma.</li></ul>",
            en: "<ul><li><strong>Business:</strong> Managed machinery maintenance at SAMCO.</li><li><strong>Role:</strong> System Analyst. Designed UML (Use Case, Sequence, Activity) and Figma Prototype.</li></ul>"
        },
        link: "https://drive.google.com/file/d/1VcgFCFcAB95Fhf8PVkwd9USFr_6PiXV9/view"
    },
    erp_sap: {
        images: ["assets/img/ERP/1.png", "assets/img/ERP/2.png", "assets/img/ERP/5.png"],
        title: { vi: "SAP S/4HANA Global Bike (Hệ thống ERP)", en: "SAP S/4HANA Global Bike (ERP System)" },
        desc: {
            vi: "<ul><li><strong>Nội dung:</strong> Triển khai quy trình tích hợp qua phân hệ MM, SD, FI.</li><li><strong>Kỹ năng:</strong> Thực hiện chu trình P2P, O2C; Quản lý Master Data; Hiểu logic hạch toán kế toán tự động.</li></ul>",
            en: "<ul><li><strong>Content:</strong> Implemented integrated processes via MM, SD, FI modules.</li><li><strong>Skills:</strong> Executed P2P, O2C cycles; Managed Master Data; Understood automated accounting logic.</li></ul>"
        },
        link: "https://drive.google.com/file/d/19mS_SiMnkVHAWgShqboiJZuFKNlBdU6X/view"
    },
    uxui_travel: {
        images: ["assets/img/UXUI/1.png", "assets/img/UXUI/2.png", "assets/img/UXUI/3.png"],
        title: { vi: "App Du lịch & Review (Thiết kế UI/UX)", en: "Travel & Review App (UI/UX Design)" },
        desc: {
            vi: "<ul><li><strong>Công cụ:</strong> Figma. Thiết kế Wireframe & Prototype 30+ màn hình; Xây dựng Design System chuyên nghiệp.</li></ul>",
            en: "<ul><li><strong>Tools:</strong> Figma. Designed Wireframes & Prototypes for 30+ screens; Built a professional Design System.</li></ul>"
        },
        link: "https://drive.google.com/file/d/1zHuhjLbq00r17bHHkg65I3LO8AKu-k-8/view",
        demo_link: "https://drive.google.com/file/d/1GmGjYEIAwL4vGXbC2Re9RYpRLTJYdEPd/view"
    },
    sql_student: {
        images: ["assets/img/SQLServer/1.png", "assets/img/SQLServer/2.png", "assets/img/SQLServer/3.png", "assets/img/SQLServer/4.png", "assets/img/SQLServer/5.png", "assets/img/SQLServer/6.png"],
        title: { vi: "Quản lý Sinh viên (SQL Server)", en: "Student Management (SQL Server)" },
        desc: {
            vi: "<ul><li><strong>Nội dung:</strong> Thiết kế ERD chuẩn 3NF; Viết Stored Procedures & Triggers kiểm soát ràng buộc dữ liệu tự động.</li></ul>",
            en: "<ul><li><strong>Content:</strong> Designed 3NF ERD; Wrote Stored Procedures & Triggers for automated data constraint control.</li></ul>"
        },
        link: "https://drive.google.com/file/d/11vp1abXNB6vg-oSj1C0hbIVTRoNXb4mb/view"
    },
    ecommerce_tumie: {
        images: ["assets/img/ThuongMaiDienTu/1.png", "assets/img/ThuongMaiDienTu/2.png", "assets/img/ThuongMaiDienTu/3.png"],
        title: { vi: "Website Tumie Pet Shop (Thương mại điện tử)", en: "Tumie Pet Shop Website (E-Commerce)" },
        desc: {
            vi: "<ul><li><strong>Nội dung:</strong> Xây dựng mô hình kinh doanh Canvas, triển khai Website bán hàng trên Wordpress.</li></ul>",
            en: "<ul><li><strong>Content:</strong> Built Canvas business model, deployed sales website on Wordpress.</li></ul>"
        },
        link: "https://drive.google.com/file/d/1sTgL761Jc9NrRRCc6MB8FR9wLW_OZihw/view"
    },
    network_smb: {
        images: ["assets/img/MangMayTinh/1.png", "assets/img/MangMayTinh/2.png", "assets/img/MangMayTinh/3.png"],
        title: { vi: "Mạng doanh nghiệp SMB", en: "SMB Enterprise Network" },
        desc: {
            vi: "<ul><li><strong>Công cụ:</strong> Cisco Packet Tracer. Thiết kế và cấu hình mạng nội bộ, VLAN, định tuyến OSPF.</li></ul>",
            en: "<ul><li><strong>Tools:</strong> Cisco Packet Tracer. Designed and configured LAN, VLAN, OSPF routing.</li></ul>"
        },
        link: "https://docs.google.com/document/d/1SwsE9AYvIQA0lt78ommTriat8JaSRiRY/edit"
    },
    cloud_aws: {
        images: ["assets/img/DienToanDamMay/1.png"],
        title: { vi: "Nền tảng công nghệ Amazon", en: "Amazon Cloud Platform" },
        desc: {
            vi: "<ul><li><strong>Nội dung:</strong> Tìm hiểu và triển khai các dịch vụ cơ bản của AWS (EC2, S3, RDS).</li></ul>",
            en: "<ul><li><strong>Content:</strong> Researched and deployed basic AWS services (EC2, S3, RDS).</li></ul>"
        },
        link: "https://drive.google.com/file/d/1YZH1LNKEQMFZM86DsGZui2twxv_quApY/view"
    }
};

// ... (Các hàm Modal giữ nguyên)
// Hàm mở Modal Dự án
let currentProject = null;
let currentSlideIndex = 0;
let slideInterval = null;

function openProjectModal(projectId) {
    currentProject = projectData[projectId];
    if (!currentProject) return;

    const modal = document.getElementById('project-modal');
    const sliderContainer = document.getElementById('project-slider-container');
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-desc');
    let modalLink = document.getElementById('modal-link'); // Nút xem Drive
    let modalDemo = document.getElementById('modal-demo'); // Nút xem Demo (Optional)
    const lang = localStorage.getItem('lang') || 'vi';

    // Tạo nút Drive nếu chưa có
    if (!modalLink) {
        modalLink = document.createElement('a');
        modalLink.id = 'modal-link';
        modalLink.className = 'btn';
        modalLink.target = '_blank';
        modalLink.style.marginTop = '15px';
        modalLink.style.display = 'inline-block';
        modalLink.innerHTML = '<i class="fab fa-google-drive"></i> <span data-i18n="view_drive"></span>';
        document.querySelector('.modal-info').appendChild(modalLink);
    }

    // Tạo nút Demo nếu chưa có (cho UXUI)
    if (!modalDemo) {
        modalDemo = document.createElement('a');
        modalDemo.id = 'modal-demo';
        modalDemo.className = 'btn btn-outline';
        modalDemo.target = '_blank';
        modalDemo.style.marginTop = '15px';
        modalDemo.style.marginLeft = '10px';
        modalDemo.style.display = 'none'; // Mặc định ẩn
        modalDemo.innerHTML = '<i class="fas fa-play-circle"></i> <span data-i18n="view_demo"></span>';
        document.querySelector('.modal-info').appendChild(modalDemo);
    }

    // Xóa ảnh cũ
    sliderContainer.innerHTML = '';
    currentSlideIndex = 0;

    // Thêm ảnh mới
    if (currentProject.images && currentProject.images.length > 0) {
        currentProject.images.forEach(imgSrc => {
            const img = document.createElement('img');
            img.src = imgSrc;
            sliderContainer.appendChild(img);
        });
    }
    updateSlider();
    startSlideInterval(); // Bắt đầu tự động chuyển ảnh

    // Cập nhật nội dung
    modalTitle.textContent = currentProject.title[lang];
    modalDesc.innerHTML = currentProject.desc[lang];

    // Cập nhật Link Google Drive
    if (currentProject.link) {
        modalLink.href = currentProject.link;
        modalLink.style.display = 'inline-block';
        modalLink.querySelector('span').textContent = resources[lang]['view_drive'];
    } else {
        modalLink.style.display = 'none';
    }

    // Cập nhật Link Demo (chỉ cho UXUI)
    if (currentProject.demo_link) {
        modalDemo.href = currentProject.demo_link;
        modalDemo.style.display = 'inline-block';
        modalDemo.querySelector('span').textContent = resources[lang]['view_demo'];
    } else {
        modalDemo.style.display = 'none';
    }

    modal.style.display = 'block';
}

// Hàm đóng Modal
function closeModal(modalId) {
    document.getElementById(modalId).style.display = "none";
    stopSlideInterval(); // Dừng slider khi đóng
}

// Hàm điều khiển Slider
function moveSlider(n) {
    if (!currentProject || !currentProject.images) return;
    const totalSlides = currentProject.images.length;
    currentSlideIndex = (currentSlideIndex + n + totalSlides) % totalSlides;
    updateSlider();
    resetSlideInterval(); // Reset timer khi người dùng bấm thủ công
}

function updateSlider() {
    const sliderContainer = document.getElementById('project-slider-container');
    if (sliderContainer) {
        sliderContainer.style.transform = `translateX(-${currentSlideIndex * 100}%)`;
    }
}

// Tự động chuyển slide mỗi 3 giây
function startSlideInterval() {
    stopSlideInterval(); // Đảm bảo không bị trùng
    slideInterval = setInterval(() => {
        moveSlider(1); // Chuyển sang ảnh tiếp theo
    }, 3000);
}

function stopSlideInterval() {
    if (slideInterval) {
        clearInterval(slideInterval);
        slideInterval = null;
    }
}

function resetSlideInterval() {
    stopSlideInterval();
    startSlideInterval();
}


// Chuyển đổi Ngôn ngữ
langToggle.addEventListener('click', () => {
    const currentLang = langText.textContent;
    const newLang = currentLang === 'EN' ? 'en' : 'vi';
    updateLanguage(newLang);
});

function updateLanguage(lang) {
    langText.textContent = lang === 'en' ? 'VI' : 'EN'; // Nút hiển thị ngôn ngữ đích
    localStorage.setItem('lang', lang);

    // Cập nhật nội dung tĩnh
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (resources[lang][key]) {
            // Xử lý riêng cho hero_desc (Typing Intro)
            if (key === 'hero_desc') {
                startTypingEffect(element, resources[lang][key]);
            }
            // Xử lý riêng cho hero_sub (Typing Roles) - Kiểm tra nếu là mảng
            else if (key === 'hero_sub' && Array.isArray(resources[lang][key])) {
                startRoleTypingEffect(element, resources[lang][key]);
            }
            // Các text thông thường
            else {
                element.textContent = resources[lang][key];
            }
        }
    });

    // Cập nhật Modal nếu đang mở
    const modal = document.getElementById('project-modal');
    if (modal.style.display === 'block' && currentProject) {
        document.getElementById('modal-title').textContent = currentProject.title[lang];
        document.getElementById('modal-desc').innerHTML = currentProject.desc[lang];
        const modalLink = document.getElementById('modal-link');
        if (modalLink) modalLink.querySelector('span').textContent = resources[lang]['view_drive'];
        const modalDemo = document.getElementById('modal-demo');
        if (modalDemo) modalDemo.querySelector('span').textContent = resources[lang]['view_demo'];
    }
}

// Hàm hiệu ứng Typing (Intro Text) - Gõ 1 lần
function startTypingEffect(element, text) {
    clearInterval(typingInterval); // Xóa timer cũ nếu có
    element.textContent = "";
    element.classList.add('typing-cursor');

    let i = 0;
    typingInterval = setInterval(() => {
        element.textContent += text.charAt(i);
        i++;
        if (i >= text.length) {
            clearInterval(typingInterval);
            // Giữ lại con trỏ hoặc xóa class
        }
    }, 20);
}

// Hàm hiệu ứng Typing + Deleting (Roles) - Lặp vô tận
function startRoleTypingEffect(element, roles) {
    clearTimeout(roleTimeout); // Xóa timeout cũ
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let currentRole = "";

    element.classList.add('typing-cursor');

    function type() {
        currentRole = roles[roleIndex];

        if (isDeleting) {
            // Đang xóa
            element.textContent = currentRole.substring(0, charIndex--);
        } else {
            // Đang gõ
            element.textContent = currentRole.substring(0, charIndex++);
        }

        let typeSpeed = isDeleting ? 50 : 100; // Xóa nhanh hơn gõ

        if (!isDeleting && charIndex === currentRole.length + 1) {
            // Đã gõ xong từ này, dừng lại một chút trước khi xóa
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            // Đã xóa xong, chuyển sang từ tiếp theo
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typeSpeed = 500;
        }

        roleTimeout = setTimeout(type, typeSpeed);
    }

    type();
}


// Modal Hình ảnh đơn (Exp, Cert)
function openImageModal(imgElement) {
    const modal = document.getElementById('cert-modal');
    const modalImg = document.getElementById('cert-img');
    const caption = document.getElementById('caption');

    modal.style.display = "block";
    modalImg.src = imgElement.src || "assets/img/engcer.jpg";

    // Caption tùy chỉnh
    if (imgElement.id === 'english-cert-btn') {
        caption.textContent = (localStorage.getItem('lang') === 'en') ? "English Certificate (B2 Aptis)" : "Chứng chỉ Tiếng Anh (B2 Aptis)";
    } else {
        caption.textContent = imgElement.alt;
    }
}

// Sự kiện click riêng cho nút chứng chỉ (do nút này là thẻ span)
const certBtn = document.getElementById("english-cert-btn");
if (certBtn) {
    certBtn.onclick = function () {
        const modal = document.getElementById('cert-modal');
        const modalImg = document.getElementById('cert-img');
        const caption = document.getElementById('caption');

        modal.style.display = "block";
        modalImg.src = "assets/img/engcer.jpg";
        caption.setAttribute('data-i18n', 'cert_caption');
        const lang = localStorage.getItem('lang') || 'vi';
        caption.textContent = resources[lang]['cert_caption'];
    }
}

// Đóng khi click ra ngoài
window.onclick = function (event) {
    const projectModal = document.getElementById('project-modal');
    const certModal = document.getElementById('cert-modal');
    if (event.target == projectModal) {
        closeModal('project-modal');
    }
    if (event.target == certModal) {
        closeModal('cert-modal');
    }
}

// Logic thay đổi ảnh cá nhân (Hiệu ứng mờ)
const profileImg = document.getElementById('profile-img');
// Sử dụng cv2.jpg và cvpic1.png theo yêu cầu
const images = ['assets/img/cv2.jpg', 'assets/img/cvpic1.png'];
let currentImgIndex = 0;

setInterval(() => {
    if (profileImg) {
        // Làm mờ
        profileImg.style.opacity = '0';

        setTimeout(() => {
            // Đổi nguồn ảnh
            currentImgIndex = (currentImgIndex + 1) % images.length;
            profileImg.src = images[currentImgIndex];

            // Hiện lại
            profileImg.style.opacity = '1';
        }, 500); // Khớp với thời gian transition CSS
    }
}, 4000); // Đổi mỗi 4 giây
