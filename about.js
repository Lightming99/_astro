document.addEventListener("DOMContentLoaded", () => {
    // --- Mobile Navigation Toggle ---
    const menuBtn = document.querySelector(".menu-btn-light"); // Matched class
    const navList = document.querySelector(".nav-list-light"); // Matched class
    const navLinks = document.querySelectorAll(".nav-list-light a");

    if (menuBtn && navList) {
        menuBtn.addEventListener("click", () => {
            const isActive = navList.classList.toggle("active");
            menuBtn.classList.toggle("active");
            menuBtn.setAttribute('aria-expanded', isActive);
            document.body.style.overflow = isActive ? 'hidden' : '';
        });

        navLinks.forEach(link => {
            link.addEventListener("click", () => {
                if (navList.classList.contains("active")) {
                    navList.classList.remove("active");
                    menuBtn.classList.remove("active");
                    menuBtn.setAttribute('aria-expanded', 'false');
                    document.body.style.overflow = '';
                }
            });
        });
        
        document.addEventListener("click", (event) => {
            if (navList.classList.contains("active")) {
                const isClickInsideNav = navList.contains(event.target);
                const isClickOnMenuBtn = menuBtn.contains(event.target);
                if (!isClickInsideNav && !isClickOnMenuBtn) {
                    navList.classList.remove("active");
                    menuBtn.classList.remove("active");
                    menuBtn.setAttribute('aria-expanded', 'false');
                    document.body.style.overflow = '';
                }
            }
        });
    }

    // --- Scroll Reveal Animation (Intersection Observer) ---
    const revealElements = document.querySelectorAll(".animate-on-scroll");
    
    if (revealElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const delay = entry.target.dataset.animationDelay || '0s';
                    entry.target.style.transitionDelay = delay;
                    entry.target.classList.add("is-visible");
                } else {
                    // Optional: To re-animate if scrolling up
                     entry.target.classList.remove("is-visible");
                     entry.target.style.transitionDelay = '0s';
                }
            });
        }, { threshold: 0.05 });

        revealElements.forEach((element) => observer.observe(element));
    }

    // --- Update Copyright Year ---
    const currentYearSpan = document.getElementById('currentYearAboutLight'); // Updated ID
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }
});
