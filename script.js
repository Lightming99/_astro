document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation Toggle
    const menuToggleBtn = document.querySelector('.menu-toggle-btn');
    const navList = document.querySelector('.nav-list');
    const navLinks = document.querySelectorAll('.nav-link');

    if (menuToggleBtn && navList) {
        menuToggleBtn.addEventListener('click', () => {
            const isActive = navList.classList.toggle('active');
            menuToggleBtn.setAttribute('aria-expanded', isActive);
            menuToggleBtn.querySelector('i').classList.toggle('fa-bars', !isActive);
            menuToggleBtn.querySelector('i').classList.toggle('fa-times', isActive);
            document.body.style.overflow = isActive ? 'hidden' : '';
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navList.classList.contains('active')) {
                    navList.classList.remove('active');
                    menuToggleBtn.setAttribute('aria-expanded', 'false');
                    menuToggleBtn.querySelector('i').classList.remove('fa-times');
                    menuToggleBtn.querySelector('i').classList.add('fa-bars');
                    document.body.style.overflow = '';
                }
            });
        });

        document.addEventListener('click', function(event) {
            const isClickInsideNav = navList.contains(event.target);
            const isClickOnToggle = menuToggleBtn.contains(event.target);
            if (!isClickInsideNav && !isClickOnToggle && navList.classList.contains('active')) {
                navList.classList.remove('active');
                menuToggleBtn.setAttribute('aria-expanded', 'false');
                menuToggleBtn.querySelector('i').classList.remove('fa-times');
                menuToggleBtn.querySelector('i').classList.add('fa-bars');
                document.body.style.overflow = '';
            }
        });
    }

    // Review Slideshow
    let slideIndex = 1;
    const slides = document.getElementsByClassName("mySlides");
    const dots = document.getElementsByClassName("dot");
    let autoSlideTimeout;

    function showSlides(n, direction) {
        if (!slides || slides.length === 0 || !dots || dots.length === 0) return;

        if (n > slides.length) { slideIndex = 1; }
        if (n < 1) { slideIndex = slides.length; }

        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
            slides[i].classList.remove('prev-slide'); // Remove direction class
        }
        for (let i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active-dot", "");
        }

        slides[slideIndex - 1].style.display = "block";
        if (direction === 'prev') {
            slides[slideIndex - 1].classList.add('prev-slide');
        }
        dots[slideIndex - 1].className += " active-dot";
    }
    
    function autoShowSlides() {
        plusSlides(1); // This already calls showSlides
        autoSlideTimeout = setTimeout(autoShowSlides, 6000); // Change image every 6 seconds
    }

    if (slides && slides.length > 0) {
        showSlides(slideIndex);
        autoSlideTimeout = setTimeout(autoShowSlides, 6000); // Start auto slideshow
    }
    
    window.plusSlides = (n) => {
        clearTimeout(autoSlideTimeout);
        const direction = n > 0 ? 'next' : 'prev';
        showSlides(slideIndex += n, direction);
        autoSlideTimeout = setTimeout(autoShowSlides, 10000); // Restart with longer delay
    };
    
    window.currentSlide = (n) => {
        clearTimeout(autoSlideTimeout);
        showSlides(slideIndex = n);
        autoSlideTimeout = setTimeout(autoShowSlides, 10000);
    };

    // Video Player Modal
    const videoPlayerModal = document.getElementById('videoPlayerModal');
    const iframe = videoPlayerModal ? videoPlayerModal.querySelector('iframe') : null;

    window.openVideo = (url) => {
        if (videoPlayerModal && iframe) {
            iframe.src = url;
            videoPlayerModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    };

    window.closeVideo = () => {
        if (videoPlayerModal && iframe) {
            iframe.src = ''; // Stop video
            videoPlayerModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    };
    
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && videoPlayerModal && videoPlayerModal.classList.contains('active')) {
            closeVideo();
        }
    });
    if (videoPlayerModal) {
        videoPlayerModal.addEventListener('click', function(event) {
            if (event.target === videoPlayerModal) {
                closeVideo();
            }
        });
    }

    // Scroll Animations with Intersection Observer for better performance
    const scrollElements = document.querySelectorAll(".animate-on-scroll");

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.animationDelay || '0s';
                const animationType = entry.target.dataset.animationType; // For CSS to handle
                
                entry.target.style.transitionDelay = delay;
                entry.target.classList.add("is-visible");
                // observer.unobserve(entry.target); // Optional: unobserve after animation
            } else {
                 // Optional: Re-hide if you want animations to replay on scroll up
                 // entry.target.classList.remove("is-visible");
                 // entry.target.style.transitionDelay = '0s'; // Reset delay
            }
        });
    }, {
        rootMargin: "0px",
        threshold: 0.1 // Trigger when 10% of the element is visible
    });

    scrollElements.forEach(el => {
        observer.observe(el);
    });

    // Update Copyright Year
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }
});
