// Stars Animation
const createStarsContainer = () => {
    const starsContainer = document.getElementById('stars-container');
    const starCount = 100;
    const stars = [];

    function createStar() {
        const star = document.createElement('div');
        star.className = 'star';
        const size = Math.random() * 2 + 1;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.opacity = Math.random();
        starsContainer.appendChild(star);
        return star;
    }

    function moveStarRandomly(star) {
        const x = Math.random() * 10 - 5;
        const y = Math.random() * 10 - 5;
        star.style.transform = `translate(${x}px, ${y}px)`;
    }

    function initStars() {
        for (let i = 0; i < starCount; i++) {
            stars.push(createStar());
        }
    }

    function animateStars() {
        stars.forEach(moveStarRandomly);
        setTimeout(animateStars, 3000);
    }

    function moveStarsWithMouse(e) {
        const mouseX = e.clientX / window.innerWidth - 0.5;
        const mouseY = e.clientY / window.innerHeight - 0.5;

        stars.forEach(star => {
            const rect = star.getBoundingClientRect();
            const starX = (rect.left + rect.right) / 2 / window.innerWidth - 0.5;
            const starY = (rect.top + rect.bottom) / 2 / window.innerHeight - 0.5;

            const deltaX = (mouseX - starX) * 20;
            const deltaY = (mouseY - starY) * 20;

            star.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
        });
    }

    initStars();
    animateStars();
    document.addEventListener('mousemove', moveStarsWithMouse);
};

// Navigation Scroll Effect
const handleNavScroll = () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
};

// Sidebar Controls
const initializeSidebar = () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    const closeBtn = document.querySelector('.close-btn');
    const body = document.body;
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    body.appendChild(overlay);

    function closeSidebar() {
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
        body.style.overflow = '';
    }

    menuToggle.addEventListener('click', () => {
        sidebar.classList.add('active');
        overlay.classList.add('active');
        body.style.overflow = 'hidden';
    });

    closeBtn.addEventListener('click', closeSidebar);
    overlay.addEventListener('click', closeSidebar);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeSidebar();
        }
    });
};

// Auth Controls
const initializeAuthButtons = () => {
    const loginBtn = document.getElementById("login-btn");
    if (loginBtn) {
        loginBtn.addEventListener("click", () => {
            window.location.href = "/login";
        });
    }

    const logoutBtn = document.getElementById("logout-btn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            window.location.href = "/logout";
        });
    }
};

// Initialize all functionality
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('stars-container')) {
        createStarsContainer();
    }

    window.addEventListener('scroll', handleNavScroll);
    initializeSidebar();
    initializeAuthButtons();
});