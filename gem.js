// Gemstone data with video IDs and WhatsApp messages
const gemstoneData = {
    ruby: {
        name: 'Ruby',
        planet: 'Sun ☉',
        videoId: 'FVB9Tt15Wqs',
        image: 'ruby.jpg',
        benefits: ['Enhances leadership qualities', 'Boosts confidence and courage', 'Brings success and recognition'],
        whatsappText: 'Hi, I am interested in Ruby gemstone. Please provide more details about pricing and availability.'
    },
    pearl: {
        name: 'Pearl',
        planet: 'Moon ☽',
        videoId: 'NpsQL1vU8N0',
        image: 'pearl.jpg',
        benefits: ['Brings emotional balance', 'Enhances creativity and intuition', 'Promotes peace and tranquility'],
        whatsappText: 'Hi, I am interested in Pearl gemstone. Please provide more details about pricing and availability.'
    },
    'red-coral': {
        name: 'Red Coral',
        planet: 'Mars ♂',
        videoId: 'WjWYJsUc99k',
        image: 'coral.jpg',
        benefits: ['Increases courage and strength', 'Enhances physical energy', 'Brings protection from negativity'],
        whatsappText: 'Hi, I am interested in Red Coral gemstone. Please provide more details about pricing and availability.'
    },
    emerald: {
        name: 'Emerald',
        planet: 'Mercury ☿',
        videoId: '83KWI2vIiJQ',
        image: 'emerald.jpg',
        benefits: ['Enhances intelligence and wisdom', 'Improves communication skills', 'Brings prosperity and growth'],
        whatsappText: 'Hi, I am interested in Emerald gemstone. Please provide more details about pricing and availability.'
    },
    'yellow-sapphire': {
        name: 'Yellow Sapphire',
        planet: 'Jupiter ♃',
        videoId: 'oEJpMeyzpu4',
        image: 'yellow saphire.jpg',
        benefits: ['Brings wisdom and knowledge', 'Enhances wealth and abundance', 'Improves relationships and marriage'],
        whatsappText: 'Hi, I am interested in Yellow Sapphire gemstone. Please provide more details about pricing and availability.'
    },
    diamond: {
        name: 'Diamond',
        planet: 'Venus ♀',
        videoId: 'yD-2B_n1VFE',
        image: 'diamond.jpg',
        benefits: ['Enhances luxury and elegance', 'Brings clarity of thought', 'Improves love relationships'],
        whatsappText: 'Hi, I am interested in Diamond gemstone. Please provide more details about pricing and availability.'
    },
    'blue-sapphire': {
        name: 'Blue Sapphire',
        planet: 'Saturn ♄',
        videoId: 'UeKJzHzHlVA',
        image: 'blue saphire.jpg',
        benefits: ['Brings discipline and focus', 'Enhances career prospects', 'Improves mental clarity'],
        whatsappText: 'Hi, I am interested in Blue Sapphire gemstone. Please provide more details about pricing and availability.'
    },
    hessonite: {
        name: 'Hessonite',
        planet: 'Rahu ☊',
        videoId: 'V8uEBcwQt_M',
        image: 'hessonite.jpg',
        benefits: ['Removes obstacles and confusion', 'Enhances spiritual growth', 'Brings worldly success'],
        whatsappText: 'Hi, I am interested in Hessonite gemstone. Please provide more details about pricing and availability.'
    },
    'cats-eye': {
        name: "Cat's Eye",
        planet: 'Ketu ☋',
        videoId: 'SLJoUpIOp5s',
        image: 'cats eye.jpg',
        benefits: ['Enhances intuition and insight', 'Brings protection from hidden enemies', 'Improves meditation and spirituality'],
        whatsappText: 'Hi, I am interested in Cat\'s Eye gemstone. Please provide more details about pricing and availability.'
    }
};

// Global functions - Define these first so they're available immediately
window.scrollToGemstones = function() {
    console.log('scrollToGemstones called');
    const gemstonesSection = document.getElementById('gemstones');
    if (gemstonesSection) {
        const offsetTop = gemstonesSection.offsetTop - 100;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
        console.log('Scrolled to gemstones section');
    } else {
        console.error('Gemstones section not found');
    }
};

// Function to scroll to specific gemstone and highlight it
window.scrollToGemstone = function(gemstoneType) {
    console.log('scrollToGemstone called with:', gemstoneType);
    
    // First scroll to gemstones section
    const gemstonesSection = document.getElementById('gemstones');
    if (gemstonesSection) {
        const offsetTop = gemstonesSection.offsetTop - 100;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
        
        // After scrolling, highlight the specific gemstone card
        setTimeout(() => {
            const gemstoneCard = document.querySelector(`[data-gem="${gemstoneType}"]`);
            if (gemstoneCard) {
                // Remove any existing highlights
                document.querySelectorAll('.gemstone-card').forEach(card => {
                    card.classList.remove('planet-highlight');
                });
                
                // Add highlight to target gemstone
                gemstoneCard.classList.add('planet-highlight');
                
                // Remove highlight after 3 seconds
                setTimeout(() => {
                    gemstoneCard.classList.remove('planet-highlight');
                }, 3000);
                
                console.log(`Highlighted ${gemstoneType} gemstone card`);
            } else {
                console.error(`Gemstone card for ${gemstoneType} not found`);
            }
        }, 500); // Wait for scroll to complete
    } else {
        console.error('Gemstones section not found');
    }
};

window.closeGemstoneModal = function() {
    console.log('closeGemstoneModal called');
    const modal = document.getElementById('gemstone-modal');
    if (!modal) return;
    
    modal.classList.add('hidden');
    document.body.style.overflow = '';
    
    // Clear video player
    const videoPlayer = document.getElementById('modal-video-player');
    if (videoPlayer) {
        videoPlayer.innerHTML = '';
    }
    
    console.log('Modal closed');
};

window.openWhatsApp = function(message) {
    console.log('openWhatsApp called with:', message);
    const whatsappUrl = `https://wa.me/919027042436?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
};

// DOM elements
let currentGemstone = null;

// Wait for DOM to be fully loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}

function initializeApp() {
    console.log('🚀 Initializing AstroSatvik x REYVA DIAMONDS website...');
    
    // Add a small delay to ensure all elements are rendered
    setTimeout(() => {
        setupAllEventListeners();
        setupIntersectionObserver();
        addLoadingAnimations();
        
        console.log('✅ Application initialized successfully');
        console.log('🔍 Debugging info:');
        console.log('- Gemstone cards found:', document.querySelectorAll('.gemstone-card').length);
        console.log('- Royal planets found:', document.querySelectorAll('.royal-planet').length);
        console.log('- Nav links found:', document.querySelectorAll('.nav-link').length);
    }, 100);
}

function setupAllEventListeners() {
    console.log('Setting up all event listeners...');
    
    // 1. Navigation Links
    setupNavigationLinks();
    
    // 2. Mobile Menu
    setupMobileMenu();
    
    // 3. CTA Button
    setupCTAButton();
    
    // 4. Gemstone Cards
    setupGemstoneCards();
    
    // 5. Planet Interactions
    setupPlanetaryInteractions();
    
    // 6. Modal Events
    setupModalEvents();
    
    // 7. WhatsApp Links
    setupWhatsAppLinks();
    
    // 8. Scroll Events
    setupScrollEvents();
    
    console.log('All event listeners setup complete');
}

function setupNavigationLinks() {
    const navLinks = document.querySelectorAll('.nav-link');
    console.log('Setting up navigation links:', navLinks.length);
    
    navLinks.forEach((link, index) => {
        const href = link.getAttribute('href');
        console.log(`Nav link ${index + 1}: ${href}`);
        
        link.addEventListener('click', function(e) {
            console.log('Navigation clicked:', href);
            
            // Only prevent default for hash links (same-page navigation)
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(href);
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 100;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    const navLinksContainer = document.querySelector('.nav-links');
                    if (navLinksContainer && navLinksContainer.classList.contains('active')) {
                        toggleMobileMenu();
                    }
                    
                    // Update active state
                    navLinks.forEach(l => l.classList.remove('active'));
                    this.classList.add('active');
                    
                    console.log('Navigated to:', href);
                } else {
                    console.error('Target section not found:', href);
                }
            } else {
                // Allow normal navigation for external files (index.html, gem.html, etc.)
                console.log('Allowing normal navigation to:', href);
                
                // Close mobile menu if open before navigation
                const navLinksContainer = document.querySelector('.nav-links');
                if (navLinksContainer && navLinksContainer.classList.contains('active')) {
                    closeMobileMenu();
                }
            }
        });
    });
}

function setupMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        console.log('Setting up enhanced mobile menu toggle');
        
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleMobileMenu();
        });
        
        // Close menu when clicking on nav links
        const navLinkElements = document.querySelectorAll('.nav-link');
        navLinkElements.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth < 1024) {
                    closeMobileMenu();
                }
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!menuToggle.contains(e.target) && !navLinks.contains(e.target)) {
                closeMobileMenu();
            }
        });
        
        // Handle escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && navLinks.classList.contains('active')) {
                closeMobileMenu();
            }
        });
    }
}

function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    const menuToggle = document.querySelector('.menu-toggle');
    
    if (navLinks && menuToggle) {
        const isActive = navLinks.classList.contains('active');
        
        if (isActive) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    }
}

function openMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    const menuToggle = document.querySelector('.menu-toggle');
    
    if (navLinks && menuToggle) {
        navLinks.classList.add('active');
        menuToggle.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Add stagger animation to menu items
        const navLinkElements = document.querySelectorAll('.nav-link');
        navLinkElements.forEach((link, index) => {
            link.style.animationDelay = `${0.1 + index * 0.05}s`;
            link.style.animation = 'fadeInSlideLeft 0.3s ease-out forwards';
        });
        
        console.log('Mobile menu opened with animations');
    }
}

function closeMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    const menuToggle = document.querySelector('.menu-toggle');
    
    if (navLinks && menuToggle) {
        navLinks.classList.remove('active');
        menuToggle.classList.remove('active');
        document.body.style.overflow = '';
        
        // Clear animations
        const navLinkElements = document.querySelectorAll('.nav-link');
        navLinkElements.forEach(link => {
            link.style.animation = '';
            link.style.animationDelay = '';
        });
        
        console.log('Mobile menu closed');
    }
}

function setupCTAButton() {
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        console.log('Setting up CTA button');
        ctaButton.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('CTA button clicked');
            window.scrollToGemstones();
        });
    } else {
        console.error('CTA button not found');
    }
}

function setupGemstoneCards() {
    const gemstoneCards = document.querySelectorAll('.gemstone-card');
    console.log('Setting up gemstone cards:', gemstoneCards.length);
    
    gemstoneCards.forEach((card, index) => {
        const gemType = card.getAttribute('data-gem');
        console.log(`Gemstone card ${index + 1}: ${gemType}`);
        
        if (gemType && gemstoneData[gemType]) {
            // Add click event to the entire card
            card.addEventListener('click', function(e) {
                e.preventDefault();
                console.log('Gemstone card clicked:', gemType);
                openGemstoneModal(gemType);
            });
            
            // Also add click event to the button specifically
            const button = card.querySelector('.gem-btn');
            if (button) {
                button.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log('Gem button clicked:', gemType);
                    openGemstoneModal(gemType);
                });
            }
            
            // Make card keyboard accessible
            card.setAttribute('tabindex', '0');
            card.setAttribute('role', 'button');
            card.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openGemstoneModal(gemType);
                }
            });
        } else {
            console.error('Invalid gem type or missing data:', gemType);
        }
    });
}

function setupPlanetaryInteractions() {
    const planets = document.querySelectorAll('.royal-planet');
    console.log('Setting up planetary interactions:', planets.length);
    
    planets.forEach((planet, index) => {
        const gemType = planet.getAttribute('data-gem');
        console.log(`Planet ${index + 1}: ${gemType}`);
        
        if (gemType && gemstoneData[gemType]) {
            // Click event
            planet.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log('Planet clicked:', gemType);
                openGemstoneModal(gemType);
            });
            
            // Touch event for mobile
            planet.addEventListener('touchend', function(e) {
                e.preventDefault();
                console.log('Planet touched:', gemType);
                openGemstoneModal(gemType);
                
                if (navigator.vibrate) {
                    navigator.vibrate(50);
                }
            });
            
            // Keyboard accessibility
            planet.setAttribute('tabindex', '0');
            planet.setAttribute('role', 'button');
            planet.setAttribute('aria-label', `Learn about ${gemstoneData[gemType].name} gemstone`);
            
            planet.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openGemstoneModal(gemType);
                }
            });
            
            // Tooltip events
            planet.addEventListener('mouseenter', function() {
                const tooltip = this.getAttribute('title');
                if (tooltip) {
                    showTooltip(this, tooltip);
                }
            });
            
            planet.addEventListener('mouseleave', function() {
                hideTooltip();
            });
        } else {
            console.error('Invalid planet gem type:', gemType);
        }
    });
}

function setupModalEvents() {
    console.log('Setting up modal events');
    
    // Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const modal = document.getElementById('gemstone-modal');
            if (modal && !modal.classList.contains('hidden')) {
                window.closeGemstoneModal();
            }
        }
    });
    
    // Modal overlay click
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal-overlay')) {
            window.closeGemstoneModal();
        }
    });
    
    // Modal close button
    const modalCloseBtn = document.querySelector('.modal-close');
    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', window.closeGemstoneModal);
    }
}

function setupWhatsAppLinks() {
    console.log('Setting up WhatsApp links');
    
    // Footer WhatsApp link
    const whatsappLinks = document.querySelectorAll('.whatsapp-link');
    whatsappLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('WhatsApp link clicked');
            const message = "Hi, I'm interested in learning more about your gemstones and services.";
            window.openWhatsApp(message);
        });
    });
}

function setupScrollEvents() {
    let ticking = false;
    
    function handleScroll() {
        if (!ticking) {
            requestAnimationFrame(() => {
                const header = document.getElementById('royal-header');
                const scrollY = window.scrollY;
                
                if (header) {
                    if (scrollY > 50) {
                        header.classList.add('scrolled');
                    } else {
                        header.classList.remove('scrolled');
                    }
                }
                
                updateActiveNavigation();
                ticking = false;
            });
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', handleScroll);
}

function openGemstoneModal(gemType) {
    console.log('🎯 Opening modal for:', gemType);
    
    const gem = gemstoneData[gemType];
    if (!gem) {
        console.error('Gemstone data not found:', gemType);
        return;
    }
    
    const modal = document.getElementById('gemstone-modal');
    if (!modal) {
        console.error('Modal element not found');
        return;
    }
    
    currentGemstone = gemType;
    
    try {
        // Update modal content
        const modalImage = document.getElementById('modal-gem-image');
        const modalName = document.getElementById('modal-gem-name');
        const modalPlanet = document.getElementById('modal-gem-planet');
        
        if (modalImage) {
            modalImage.src = gem.image;
            modalImage.alt = `${gem.name} Gemstone`;
        }
        if (modalName) modalName.textContent = gem.name;
        if (modalPlanet) modalPlanet.textContent = `Ruled by ${gem.planet}`;
        
        // Update benefits list
        const benefitsList = document.getElementById('modal-gem-benefits');
        if (benefitsList) {
            benefitsList.innerHTML = '';
            gem.benefits.forEach(benefit => {
                const li = document.createElement('li');
                li.textContent = benefit;
                benefitsList.appendChild(li);
            });
        }
        
        // Setup video player
        setupVideoPlayer(gem.videoId);
        
        // Setup inquiry button
        const inquiryBtn = document.getElementById('modal-inquiry-btn');
        if (inquiryBtn) {
            inquiryBtn.onclick = () => window.openWhatsApp(gem.whatsappText);
        }
        
        // Show modal with animation
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        
        // Trigger animation
        requestAnimationFrame(() => {
            const modalContent = modal.querySelector('.modal-content');
            if (modalContent) {
                modalContent.style.transform = 'scale(1)';
                modalContent.style.opacity = '1';
            }
        });
        
        console.log('✅ Modal opened successfully for:', gem.name);
        
    } catch (error) {
        console.error('Error opening modal:', error);
    }
}

function setupVideoPlayer(videoId) {
    console.log('Setting up video for:', videoId);
    
    const videoPlayer = document.getElementById('modal-video-player');
    if (!videoPlayer) {
        console.error('Video player not found');
        return;
    }
    
    try {
        const iframe = document.createElement('iframe');
        // Ultra-clean YouTube embed with autoplay, loop, high quality, no branding
        iframe.src = `https://www.youtube.com/embed/${videoId}?` + 
                    'autoplay=1&' +                // Autoplay enabled
                    'loop=1&' +                    // Loop the video
                    'playlist=' + videoId + '&' +  // Required for looping
                    'modestbranding=1&' +          // Minimal YouTube branding
                    'rel=0&' +                     // No related videos
                    'showinfo=0&' +                // No video info overlay
                    'controls=1&' +                // Show essential controls
                    'iv_load_policy=3&' +          // Hide annotations
                    'cc_load_policy=0&' +          // No closed captions
                    'fs=1&' +                      // Allow fullscreen
                    'playsinline=1&' +             // Inline playback on mobile
                    'widget_referrer=' + encodeURIComponent(window.location.href) + '&' +
                    'origin=' + encodeURIComponent(window.location.origin) + '&' +
                    'enablejsapi=1&' +             // Enable JS API
                    'color=white&' +               // Clean white progress bar
                    'disablekb=0&' +               // Enable keyboard controls
                    'hl=en&' +                     // English interface
                    'vq=hd1080&' +                 // Force HD quality
                    'hd=1&' +                      // Force HD
                    'start=0&' +                   // Start from beginning
                    'theme=light&' +               // Light theme
                    'autohide=1&' +                // Auto-hide controls
                    'branding=0&' +                // Remove YouTube branding
                    'showsearch=0&' +              // Hide search
                    'showinfo=0&' +                // Hide video info
                    'rel=0&' +                     // No related videos
                    'mute=0';                      // Start unmuted (autoplay requirement)
                    
        iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
        iframe.allowFullscreen = true;
        iframe.title = 'Gemstone Educational Video - AstroSatvik x REYVA - High Quality';
        iframe.style.cssText = `
            width: 100%; 
            height: 100%; 
            border: none; 
            border-radius: 16px; 
            box-shadow: 
                0 12px 40px rgba(0, 0, 0, 0.15),
                inset 0 1px 0 rgba(255, 255, 255, 0.3);
            background: linear-gradient(135deg, #f8f9fa 0%, rgba(32, 128, 125, 0.05) 100%);
        `;
        iframe.loading = 'eager'; // Load immediately for autoplay
        iframe.referrerPolicy = 'strict-origin-when-cross-origin';
        
        // Add error handling
        iframe.onerror = function() {
            console.error('Failed to load video:', videoId);
            videoPlayer.innerHTML = `
                <div style="
                    display: flex; 
                    flex-direction: column;
                    align-items: center; 
                    justify-content: center; 
                    height: 100%; 
                    background: linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%); 
                    color: #6b7280;
                    border-radius: 12px;
                    padding: 2rem;
                    text-align: center;
                ">
                    <div style="
                        width: 60px;
                        height: 60px;
                        background: #e5e7eb;
                        border-radius: 50%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        margin-bottom: 1rem;
                        font-size: 1.5rem;
                    ">📺</div>
                    <p style="margin: 0; font-weight: 500;">Video temporarily unavailable</p>
                    <p style="margin: 0.5rem 0 0 0; font-size: 0.875rem; opacity: 0.7;">Please try again later</p>
                </div>
            `;
        };
        
        videoPlayer.innerHTML = '';
        videoPlayer.appendChild(iframe);
        
        console.log('✅ Enhanced video player setup complete with clean interface');
    } catch (error) {
        console.error('Error setting up video:', error);
        videoPlayer.innerHTML = `
            <div style="
                display: flex; 
                flex-direction: column;
                align-items: center; 
                justify-content: center; 
                height: 100%; 
                background: linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%); 
                color: #6b7280;
                border-radius: 12px;
                padding: 2rem;
                text-align: center;
            ">
                <div style="
                    width: 60px;
                    height: 60px;
                    background: #e5e7eb;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-bottom: 1rem;
                    font-size: 1.5rem;
                ">⚠️</div>
                <p style="margin: 0; font-weight: 500;">Unable to load video</p>
                <p style="margin: 0.5rem 0 0 0; font-size: 0.875rem; opacity: 0.7;">Please check your connection</p>
            </div>
        `;
    }
}

function showTooltip(element, text) {
    hideTooltip();
    
    const tooltip = document.createElement('div');
    tooltip.className = 'planet-tooltip';
    tooltip.textContent = text;
    tooltip.style.cssText = `
        position: absolute;
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 8px 12px;
        border-radius: 6px;
        font-size: 12px;
        white-space: nowrap;
        z-index: 1001;
        pointer-events: none;
        transform: translateX(-50%);
        transition: opacity 0.2s ease;
    `;
    
    document.body.appendChild(tooltip);
    
    const rect = element.getBoundingClientRect();
    tooltip.style.left = rect.left + rect.width / 2 + 'px';
    tooltip.style.top = rect.bottom + 10 + 'px';
    
    // Fade in
    setTimeout(() => {
        tooltip.style.opacity = '1';
    }, 10);
}

function hideTooltip() {
    const tooltip = document.querySelector('.planet-tooltip');
    if (tooltip) {
        tooltip.remove();
    }
}

function updateActiveNavigation() {
    const sections = ['home', 'gemstones', 'about', 'process', 'contact'];
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = 'home';
    
    sections.forEach(sectionId => {
        const section = document.getElementById(sectionId);
        if (section) {
            const rect = section.getBoundingClientRect();
            if (rect.top <= 150 && rect.bottom >= 150) {
                currentSection = sectionId;
            }
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

function setupIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -10% 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('loading');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const elementsToObserve = [
        '.gemstone-card',
        '.process-step',
        '.policy-card',
        '.about-feature',
        '.cert-item'
    ];
    
    elementsToObserve.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
            observer.observe(el);
        });
    });
}

function addLoadingAnimations() {
    // Staggered animations
    const gemstoneCards = document.querySelectorAll('.gemstone-card');
    gemstoneCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
    
    const processSteps = document.querySelectorAll('.process-step');
    processSteps.forEach((step, index) => {
        step.style.animationDelay = `${index * 0.15}s`;
    });
}

// Enhanced planetary animations
setTimeout(() => {
    const planets = document.querySelectorAll('.royal-planet');
    planets.forEach((planet, index) => {
        const orbit = planet.closest('.royal-orbit');
        if (orbit) {
            const delay = Math.random() * 2;
            orbit.style.animationDelay = `-${delay}s`;
        }
    });
}, 1000);

// Console styling
console.log('%c🌟 AstroSatvik × REYVA DIAMONDS 🌟', 'color: #20807d; font-size: 18px; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);');
console.log('%cWhere Ancient Vedic Wisdom Meets Modern Luxury', 'color: #626c71; font-style: italic; font-size: 14px;');
console.log('%c✨ Premium Gemstone Experience Loaded ✨', 'color: #50C878; font-weight: bold; font-size: 14px;');