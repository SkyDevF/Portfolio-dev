// ===== NAVIGATION FUNCTIONALITY =====

// DOM Elements
const navbar = document.getElementById('navbar');
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const scrollToTopBtn = document.getElementById('scrollToTop');

// ===== STICKY NAVIGATION WITH SCROLL EFFECTS =====
let lastScrollTop = 0;

function handleNavbarScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Add scrolled class for styling
    if (scrollTop > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScrollTop = scrollTop;
}

// ===== MOBILE NAVIGATION TOGGLE =====
function toggleMobileMenu() {
    mobileMenu.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // Prevent body scroll when mobile menu is open
    if (navMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
}

// ===== SMOOTH SCROLLING FOR NAVIGATION LINKS =====
function smoothScrollToSection(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    
    // Handle home link
    if (targetId === '#home') {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    } else {
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar height
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }
    
    // Close mobile menu after clicking a link
    if (navMenu.classList.contains('active')) {
        toggleMobileMenu();
    }
    
    // Update active link
    updateActiveNavLink(targetId);
}

// ===== ACTIVE NAVIGATION LINK HIGHLIGHTING =====
function updateActiveNavLink(targetId) {
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === targetId) {
            link.classList.add('active');
        }
    });
}

// ===== SCROLL SPY FOR ACTIVE SECTION HIGHLIGHTING =====
function handleScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 100; // Offset for navbar
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            updateActiveNavLink(`#${sectionId}`);
        }
    });
}

// ===== SCROLL TO TOP FUNCTIONALITY =====
function handleScrollToTopVisibility() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollToTopBtn) {
        if (scrollTop > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    }
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// ===== CTA BUTTON FUNCTIONALITY =====
function handleCTAButtonClick(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    
    // Handle smooth scrolling to target section
    if (targetId === '#home') {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    } else {
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar height
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }
    
    // Update active link
    updateActiveNavLink(targetId);
}

// ===== TOUCH DEVICE SUPPORT =====
function addTouchSupport() {
    // Add touch-friendly classes for better mobile interaction
    const ctaButtons = document.querySelectorAll('.hero-buttons .btn');
    
    ctaButtons.forEach(button => {
        // Add touch start event for immediate visual feedback
        button.addEventListener('touchstart', function() {
            this.style.transform = 'translateY(-1px)';
        }, { passive: true });
        
        // Reset on touch end
        button.addEventListener('touchend', function() {
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        }, { passive: true });
        
        // Prevent double-tap zoom on buttons
        button.addEventListener('touchend', function(e) {
            e.preventDefault();
            this.click();
        });
    });
    
    // Add touch support for all interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .btn');
    
    interactiveElements.forEach(element => {
        // Improve touch target size for small elements
        const computedStyle = window.getComputedStyle(element);
        const minTouchTarget = 44; // 44px minimum touch target
        
        if (parseInt(computedStyle.height) < minTouchTarget) {
            element.style.minHeight = minTouchTarget + 'px';
            element.style.display = 'inline-flex';
            element.style.alignItems = 'center';
            element.style.justifyContent = 'center';
        }
    });
}

// ===== EVENT LISTENERS =====
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    if (mobileMenu) {
        mobileMenu.addEventListener('click', toggleMobileMenu);
    }
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', smoothScrollToSection);
    });
    
    // CTA buttons smooth scrolling
    const ctaButtons = document.querySelectorAll('.hero-buttons .btn');
    ctaButtons.forEach(button => {
        button.addEventListener('click', handleCTAButtonClick);
    });
    
    // Scroll to top button
    if (scrollToTopBtn) {
        scrollToTopBtn.addEventListener('click', scrollToTop);
    }
    
    // Add touch support for mobile devices
    addTouchSupport();
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (navMenu.classList.contains('active') && 
            !navMenu.contains(e.target) && 
            !mobileMenu.contains(e.target)) {
            toggleMobileMenu();
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
            toggleMobileMenu();
        }
    });
    
    // Initialize scroll spy on page load
    handleScrollSpy();
});

// ===== UTILITY FUNCTIONS =====

// Debounce function for performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimized scroll handler
const optimizedScrollHandler = debounce(function() {
    handleNavbarScroll();
    handleScrollSpy();
    handleScrollToTopVisibility();
}, 10);

// Use optimized scroll handler for better performance
window.addEventListener('scroll', optimizedScrollHandler);
// =====
 SCROLL-TRIGGERED ANIMATIONS =====

// Intersection Observer for scroll animations
function initScrollAnimations() {
    // Create intersection observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                
                // For staggered animations, add delays to child elements
                if (entry.target.classList.contains('stagger-animation')) {
                    const children = entry.target.children;
                    Array.from(children).forEach((child, index) => {
                        setTimeout(() => {
                            child.classList.add('animate');
                        }, index * 100);
                    });
                }
            }
        });
    }, observerOptions);
    
    // Observe all elements with animation classes
    const animatedElements = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right, .zoom-in, .stagger-animation');
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Enhanced scroll animations for About Me section
function initAboutMeAnimations() {
    const aboutSection = document.querySelector('#about');
    if (!aboutSection) return;
    
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const aboutObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate section title first
                const sectionTitle = entry.target.querySelector('.section-title');
                if (sectionTitle) {
                    sectionTitle.classList.add('animate');
                }
                
                // Then animate image and text with staggered timing
                setTimeout(() => {
                    const aboutImage = entry.target.querySelector('.about-image');
                    if (aboutImage) {
                        aboutImage.classList.add('animate');
                    }
                }, 200);
                
                setTimeout(() => {
                    const aboutText = entry.target.querySelector('.about-text');
                    if (aboutText) {
                        aboutText.classList.add('animate');
                    }
                }, 400);
                
                // Add special effects to profile image
                setTimeout(() => {
                    const profileImg = entry.target.querySelector('.profile-img');
                    if (profileImg) {
                        profileImg.style.animation = 'zoomIn 0.8s ease-out forwards, subtle-glow 3s ease-in-out infinite 1s';
                    }
                }, 600);
            }
        });
    }, observerOptions);
    
    aboutObserver.observe(aboutSection);
}

// Add parallax effect to About Me section
function initAboutMeParallax() {
    const aboutSection = document.querySelector('#about');
    if (!aboutSection) return;
    
    const handleParallax = () => {
        const scrolled = window.pageYOffset;
        const aboutTop = aboutSection.offsetTop;
        const aboutHeight = aboutSection.offsetHeight;
        const windowHeight = window.innerHeight;
        
        // Only apply parallax when section is in view
        if (scrolled + windowHeight > aboutTop && scrolled < aboutTop + aboutHeight) {
            const rate = (scrolled - aboutTop + windowHeight) / (aboutHeight + windowHeight);
            const yPos = -(rate * 50); // Subtle parallax movement
            
            const profileImg = aboutSection.querySelector('.profile-img');
            if (profileImg) {
                profileImg.style.transform = `translateY(${yPos}px) scale(${1 + rate * 0.05})`;
            }
        }
    };
    
    // Use throttled scroll handler for better performance
    let ticking = false;
    const throttledParallax = () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                handleParallax();
                ticking = false;
            });
            ticking = true;
        }
    };
    
    window.addEventListener('scroll', throttledParallax, { passive: true });
}

// Initialize all scroll animations when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize general scroll animations
    initScrollAnimations();
    
    // Initialize About Me specific animations
    initAboutMeAnimations();
    
    // Initialize profile image error handling
    initProfileImageHandling();
    
    // Initialize About Me parallax effect (optional enhancement)
    if (window.innerWidth > 768) { // Only on desktop for performance
        initAboutMeParallax();
    }
});

// Handle window resize for responsive animations
window.addEventListener('resize', debounce(function() {
    // Reinitialize parallax on resize if needed
    if (window.innerWidth > 768) {
        initAboutMeParallax();
    }
}, 250));// ==
=== PROFILE IMAGE ERROR HANDLING =====
function initProfileImageHandling() {
    const profileImg = document.querySelector('.profile-img');
    if (!profileImg) return;
    
    // Handle image load error
    profileImg.addEventListener('error', function() {
        this.classList.add('error');
        this.style.display = 'flex';
        this.style.alignItems = 'center';
        this.style.justifyContent = 'center';
        this.style.background = 'var(--gradient-primary)';
        this.style.color = 'white';
        this.style.fontFamily = 'var(--font-heading)';
        this.style.fontSize = 'var(--fs-4xl)';
        this.style.fontWeight = '700';
        this.textContent = 'Sky';
    });
    
    // Check if image is already broken on load
    if (profileImg.complete && profileImg.naturalHeight === 0) {
        profileImg.dispatchEvent(new Event('error'));
    }
}