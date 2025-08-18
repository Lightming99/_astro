document.addEventListener('DOMContentLoaded', () => {
    // --- Mobile Navigation Toggle ---
    const menuToggleBtn = document.querySelector('.menu-toggle-btn');
    const navList = document.querySelector('.nav-list');
    const navLinks = document.querySelectorAll('.nav-list .nav-link'); // Target links within nav-list

    if (menuToggleBtn && navList) {
        menuToggleBtn.addEventListener('click', () => {
            const isActive = navList.classList.toggle('active');
            menuToggleBtn.classList.toggle('active'); // For styling the button itself (e.g., X icon)
            menuToggleBtn.setAttribute('aria-expanded', isActive);
            document.body.style.overflow = isActive ? 'hidden' : '';
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navList.classList.contains('active')) {
                    navList.classList.remove('active');
                    menuToggleBtn.classList.remove('active');
                    menuToggleBtn.setAttribute('aria-expanded', 'false');
                    document.body.style.overflow = '';
                }
            });
        });
        
        document.addEventListener('click', function(event) {
            if (navList.classList.contains('active')) {
                const isClickInsideNav = navList.contains(event.target);
                const isClickOnToggle = menuToggleBtn.contains(event.target);
                if (!isClickInsideNav && !isClickOnToggle) {
                    navList.classList.remove('active');
                    menuToggleBtn.classList.remove('active');
                    menuToggleBtn.setAttribute('aria-expanded', 'false');
                    document.body.style.overflow = '';
                }
            }
        });
    }

    // --- YouTube API Integration ---
    var player;
    const playerElement = document.getElementById('player');

    function loadYouTubeAPI() {
        var tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        var firstScriptTag = document.getElementsByTagName('script')[0];
        if (firstScriptTag) {
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        } else {
            document.head.appendChild(tag);
        }
    }

    window.onYouTubeIframeAPIReady = function() {
        if (playerElement) {
            player = new YT.Player('player', {
                videoId: 'heSLZMzMi1I', // REPLACE with your YouTube video ID
                playerVars: {
                    'autoplay': 0, 'controls': 1, 'modestbranding': 1,
                    'rel': 0, 'showinfo': 0, 'iv_load_policy': 3
                },
                events: { 'onReady': onPlayerReady, 'onStateChange': onPlayerStateChange }
            });
        }
    }

    function onPlayerReady(event) {
        const videoWrapper = document.querySelector('.video-player-wrapper');
        if (videoWrapper) videoWrapper.classList.add('loaded');
    }

    function onPlayerStateChange(event) {
        const videoWrapper = document.querySelector('.video-player-wrapper');
        if (!videoWrapper) return;
        if (event.data == YT.PlayerState.PAUSED) {
            videoWrapper.classList.add('paused');
        } else {
            videoWrapper.classList.remove('paused');
        }
    }
    
    if (playerElement) {
        if (typeof(YT) == 'undefined' || typeof(YT.Player) == 'undefined') {
            loadYouTubeAPI();
        } else {
            window.onYouTubeIframeAPIReady();
        }
    }

    window.addEventListener('scroll', function () {
        const videoWrapper = document.querySelector('.video-player-wrapper');
        if (!videoWrapper || !player || typeof player.getPlayerState !== 'function') return;

        const rect = videoWrapper.getBoundingClientRect();
        const isInViewport = rect.top < window.innerHeight && rect.bottom >= 0;
        
        if (isInViewport && player.getPlayerState() === YT.PlayerState.PAUSED) {
            videoWrapper.classList.add('in-viewport');
        } else {
            videoWrapper.classList.remove('in-viewport');
        }
    });

    // --- Popup Logic ---
    const popupOverlay = document.getElementById('popupOverlay');
    const popupContent = document.querySelector('.popup-content'); // For animation
    
    window.openPopup = function() {
        if(popupOverlay) {
            popupOverlay.style.display = 'flex'; // Use style.display to trigger opacity transition
            setTimeout(() => { // Allow display to apply before adding active class
                popupOverlay.classList.add('active');
                if (popupContent) popupContent.classList.add('animate-popup');
            }, 10);
            document.body.style.overflow = 'hidden';
        }
    }

    window.closePopupItself = function() {
        if(popupOverlay) {
            popupOverlay.classList.remove('active');
            if (popupContent) popupContent.classList.remove('animate-popup');
            setTimeout(() => { // Wait for opacity transition before setting display none
                popupOverlay.style.display = 'none';
            }, 300); // Match opacity transition duration
            document.body.style.overflow = '';
        }
    }
    
    if(popupOverlay) {
        popupOverlay.addEventListener('click', function(event) {
            if (event.target === popupOverlay) {
                closePopupItself();
            }
        });
    }
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && popupOverlay && popupOverlay.classList.contains('active')) {
            closePopupItself();
        }
    });

    // --- Form Submission (Client-side placeholder) ---
    const authForm = document.getElementById('authForm');
    if (authForm) {
        authForm.addEventListener('submit', function (event) {
            event.preventDefault(); 
            const email = document.getElementById('email-popup').value; // Use correct ID
            // const password = document.getElementById('password-popup').value;
            
            if (!email) { // Simple validation
                alert('Please enter your email.');
                return;
            }
            // Since there's no backend, just simulate a success or show a message.
            // For a real app, you'd send this to your server.
            alert(`Login attempt for: ${email}. (No backend configured for this demo)`);
            // closePopupItself(); // Optionally close popup on submit
        });
    }

    // Signup link navigation (already an <a> tag, but if it was a button)
    // const signupLinkPopup = document.getElementById('signupLinkPopup');
    // if (signupLinkPopup && signupLinkPopup.tagName === 'BUTTON') { // If it were a button
    //     signupLinkPopup.addEventListener('click', function () {
    //         window.location.href = 'newuser.html';
    //     });
    // } // Not strictly needed as it's an <a> tag now.

    // --- Webinar Register Now ---
    window.registerNow = function() {
        window.open("https://wa.me/+919459412030?text=Hi! I'm interested in the Astrology Webinar. Please tell me the next steps.", "_blank");
    }

    // --- Scroll Animations ---
    const scrollElements = document.querySelectorAll(".animate-on-scroll");
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.animationDelay || '0s';
                entry.target.style.transitionDelay = delay;
                entry.target.classList.add("is-visible");
            } else {
                // entry.target.classList.remove("is-visible"); // Uncomment to re-animate
                // entry.target.style.transitionDelay = '0s'; 
            }
        });
    }, { threshold: 0.1 });

    scrollElements.forEach(el => observer.observe(el));

    // --- Update Copyright Year ---
    const currentYearSpan = document.getElementById('currentYearCourse');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // --- Read More / Read Less Functionality ---
    const readMoreBtn = document.getElementById('read-more-btn');
    const courseSummary = document.getElementById('course-summary');
    const courseDetails = document.getElementById('course-details');
    const btnText = readMoreBtn?.querySelector('.btn-text');

    if (readMoreBtn && courseSummary && courseDetails && btnText) {
        readMoreBtn.addEventListener('click', () => {
            const isExpanded = courseDetails.style.display === 'block';
            
            if (isExpanded) {
                courseDetails.style.display = 'none';
                courseSummary.style.display = 'block';
                btnText.textContent = 'Read More';
                readMoreBtn.classList.remove('expanded');
            } else {
                courseDetails.style.display = 'block';
                courseSummary.style.display = 'none';
                btnText.textContent = 'Read Less';
                readMoreBtn.classList.add('expanded');
                
                // Smooth scroll to show expanded content
                setTimeout(() => {
                    courseDetails.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }, 100);
            }
        });
    }

    // --- Smooth Scroll to Course Section ---
    const exploreCoursesBtn = document.querySelector('.btn-hero-primary');
    const courseSection = document.getElementById('course-section-heading');

    if (exploreCoursesBtn && courseSection) {
        exploreCoursesBtn.addEventListener('click', (e) => {
            e.preventDefault();
            // Add highlighting effect
            courseSection.style.transform = 'scale(1.05)';
            courseSection.style.transition = 'transform 0.3s ease';
            setTimeout(() => {
                courseSection.style.transform = 'scale(1)';
            }, 300);
            
            courseSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
        });
    }

    // Add floating animation to course illustration
    const courseImg = document.querySelector('.course-illustration');
    if (courseImg) {
        let floatDirection = 1;
        setInterval(() => {
            courseImg.style.transform += ` translateY(${floatDirection * 2}px)`;
            floatDirection *= -1;
        }, 2000);
    }

    // Add parallax effect to floating stars
    const stars = document.querySelectorAll('.star');
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        stars.forEach((star, index) => {
            const speed = (index + 1) * 0.1;
            star.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });

    // Add hover effects to topic items
    const topicItems = document.querySelectorAll('.topic-item');
    topicItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateX(10px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateX(0) scale(1)';
        });
    });
});
