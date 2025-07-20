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
// 
===== ADVANCED VISUAL EFFECTS =====

// Particle system for background
function initParticleSystem() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '-1';
    canvas.style.opacity = '0.3';
    
    document.body.appendChild(canvas);
    
    let particles = [];
    let mouse = { x: 0, y: 0 };
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    function createParticle() {
        return {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            size: Math.random() * 2 + 1,
            opacity: Math.random() * 0.5 + 0.2,
            color: `hsl(${Math.random() * 60 + 240}, 70%, 60%)`
        };
    }
    
    function initParticles() {
        particles = [];
        const particleCount = Math.min(50, Math.floor(canvas.width * canvas.height / 15000));
        for (let i = 0; i < particleCount; i++) {
            particles.push(createParticle());
        }
    }
    
    function updateParticles() {
        particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Mouse interaction
            const dx = mouse.x - particle.x;
            const dy = mouse.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
                const force = (100 - distance) / 100;
                particle.vx += dx * force * 0.001;
                particle.vy += dy * force * 0.001;
            }
            
            // Boundary check
            if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
            
            // Keep particles in bounds
            particle.x = Math.max(0, Math.min(canvas.width, particle.x));
            particle.y = Math.max(0, Math.min(canvas.height, particle.y));
        });
    }
    
    function drawParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fillStyle = particle.color;
            ctx.globalAlpha = particle.opacity;
            ctx.fill();
        });
        
        // Draw connections
        particles.forEach((particle, i) => {
            particles.slice(i + 1).forEach(otherParticle => {
                const dx = particle.x - otherParticle.x;
                const dy = particle.y - otherParticle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    ctx.beginPath();
                    ctx.moveTo(particle.x, particle.y);
                    ctx.lineTo(otherParticle.x, otherParticle.y);
                    ctx.strokeStyle = particle.color;
                    ctx.globalAlpha = (100 - distance) / 100 * 0.2;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            });
        });
        
        ctx.globalAlpha = 1;
    }
    
    function animate() {
        updateParticles();
        drawParticles();
        requestAnimationFrame(animate);
    }
    
    // Event listeners
    window.addEventListener('resize', () => {
        resizeCanvas();
        initParticles();
    });
    
    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });
    
    // Initialize
    resizeCanvas();
    initParticles();
    animate();
}

// Typing animation for hero section
function initTypingAnimation() {
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (!heroSubtitle) return;
    
    const originalText = heroSubtitle.textContent;
    const texts = [
        'Web & Mobile Developer',
        'Full-Stack Developer',
        'UI/UX Designer',
        'AI App Creator'
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function typeText() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            heroSubtitle.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            heroSubtitle.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }
        
        if (!isDeleting && charIndex === currentText.length) {
            setTimeout(() => {
                isDeleting = true;
            }, 2000);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
        }
        
        setTimeout(typeText, typingSpeed);
    }
    
    // Start typing animation after a delay
    setTimeout(typeText, 1000);
}

// Glitch effect for hero title
function initGlitchEffect() {
    const heroTitle = document.querySelector('.hero-title');
    if (!heroTitle) return;
    
    const originalText = heroTitle.textContent;
    const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
    
    function glitch() {
        let glitchedText = '';
        for (let i = 0; i < originalText.length; i++) {
            if (Math.random() < 0.1) {
                glitchedText += glitchChars[Math.floor(Math.random() * glitchChars.length)];
            } else {
                glitchedText += originalText[i];
            }
        }
        
        heroTitle.textContent = glitchedText;
        
        setTimeout(() => {
            heroTitle.textContent = originalText;
        }, 50);
    }
    
    // Random glitch effect
    setInterval(() => {
        if (Math.random() < 0.1) {
            glitch();
        }
    }, 3000);
}

// Floating animation for skill items
function initFloatingSkills() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach((item, index) => {
        const delay = index * 200;
        const duration = 3000 + Math.random() * 2000;
        const amplitude = 10 + Math.random() * 10;
        
        item.style.animation = `float ${duration}ms ease-in-out infinite ${delay}ms`;
        item.style.setProperty('--float-amplitude', `${amplitude}px`);
    });
}

// Add floating keyframe animation to CSS
function addFloatingAnimation() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0%, 100% {
                transform: translateY(0px);
            }
            50% {
                transform: translateY(var(--float-amplitude, -10px));
            }
        }
        
        @keyframes pulse-glow {
            0%, 100% {
                box-shadow: 0 0 20px rgba(139, 92, 246, 0.3);
            }
            50% {
                box-shadow: 0 0 40px rgba(139, 92, 246, 0.6);
            }
        }
        
        .project-card:hover {
            animation: pulse-glow 2s ease-in-out infinite;
        }
        
        .hero-title {
            position: relative;
        }
        
        .hero-title::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(45deg, transparent 30%, rgba(139, 92, 246, 0.1) 50%, transparent 70%);
            animation: shine 3s ease-in-out infinite;
            pointer-events: none;
        }
        
        @keyframes shine {
            0% {
                transform: translateX(-100%);
            }
            100% {
                transform: translateX(100%);
            }
        }
    `;
    document.head.appendChild(style);
}

// Interactive cursor effect
function initCursorEffect() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: radial-gradient(circle, rgba(139, 92, 246, 0.8) 0%, transparent 70%);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.1s ease;
        mix-blend-mode: difference;
    `;
    document.body.appendChild(cursor);
    
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function animateCursor() {
        cursorX += (mouseX - cursorX) * 0.1;
        cursorY += (mouseY - cursorY) * 0.1;
        
        cursor.style.left = cursorX - 10 + 'px';
        cursor.style.top = cursorY - 10 + 'px';
        
        requestAnimationFrame(animateCursor);
    }
    
    animateCursor();
    
    // Cursor interactions
    const interactiveElements = document.querySelectorAll('a, button, .btn, .project-card');
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(2)';
            cursor.style.background = 'radial-gradient(circle, rgba(168, 85, 247, 0.8) 0%, transparent 70%)';
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursor.style.background = 'radial-gradient(circle, rgba(139, 92, 246, 0.8) 0%, transparent 70%)';
        });
    });
}

// Text reveal animation
function initTextRevealAnimation() {
    const textElements = document.querySelectorAll('.hero-tagline, .about-text p');
    
    textElements.forEach(element => {
        const text = element.textContent;
        element.innerHTML = '';
        
        text.split('').forEach((char, index) => {
            const span = document.createElement('span');
            span.textContent = char === ' ' ? '\u00A0' : char;
            span.style.opacity = '0';
            span.style.transform = 'translateY(20px)';
            span.style.transition = `all 0.5s ease ${index * 0.02}s`;
            element.appendChild(span);
        });
        
        // Trigger animation when element is in view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const spans = entry.target.querySelectorAll('span');
                    spans.forEach(span => {
                        span.style.opacity = '1';
                        span.style.transform = 'translateY(0)';
                    });
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(element);
    });
}

// Initialize all advanced effects
document.addEventListener('DOMContentLoaded', function() {
    // Add floating animation styles
    addFloatingAnimation();
    
    // Initialize particle system (only on desktop for performance)
    if (window.innerWidth > 768 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        setTimeout(initParticleSystem, 1000);
    }
    
    // Initialize typing animation
    setTimeout(initTypingAnimation, 2000);
    
    // Initialize glitch effect
    setTimeout(initGlitchEffect, 3000);
    
    // Initialize floating skills
    setTimeout(initFloatingSkills, 1000);
    
    // Initialize cursor effect (desktop only)
    if (window.innerWidth > 768) {
        initCursorEffect();
    }
    
    // Initialize text reveal animation
    initTextRevealAnimation();
});

// Performance optimization: disable heavy effects on mobile
window.addEventListener('resize', debounce(function() {
    const isMobile = window.innerWidth <= 768;
    const cursor = document.querySelector('.custom-cursor');
    
    if (isMobile && cursor) {
        cursor.style.display = 'none';
    } else if (!isMobile && cursor) {
        cursor.style.display = 'block';
    }
}, 250));

// Add loading animation
function initLoadingAnimation() {
    const loader = document.createElement('div');
    loader.className = 'page-loader';
    loader.innerHTML = `
        <div class="loader-content">
            <div class="loader-logo">Sky</div>
            <div class="loader-bar">
                <div class="loader-progress"></div>
            </div>
        </div>
    `;
    
    const loaderStyles = `
        .page-loader {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            transition: opacity 0.5s ease, visibility 0.5s ease;
        }
        
        .loader-content {
            text-align: center;
        }
        
        .loader-logo {
            font-family: 'JetBrains Mono', monospace;
            font-size: 3rem;
            font-weight: 700;
            background: linear-gradient(135deg, #8b5cf6, #a855f7);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            margin-bottom: 2rem;
            animation: pulse 2s ease-in-out infinite;
        }
        
        .loader-bar {
            width: 200px;
            height: 4px;
            background: rgba(139, 92, 246, 0.2);
            border-radius: 2px;
            overflow: hidden;
            margin: 0 auto;
        }
        
        .loader-progress {
            width: 0%;
            height: 100%;
            background: linear-gradient(90deg, #8b5cf6, #a855f7);
            border-radius: 2px;
            animation: loading 2s ease-in-out forwards;
        }
        
        @keyframes loading {
            0% { width: 0%; }
            100% { width: 100%; }
        }
        
        .page-loader.fade-out {
            opacity: 0;
            visibility: hidden;
        }
    `;
    
    const style = document.createElement('style');
    style.textContent = loaderStyles;
    document.head.appendChild(style);
    document.body.appendChild(loader);
    
    // Remove loader after page load
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.classList.add('fade-out');
            setTimeout(() => {
                loader.remove();
                style.remove();
            }, 500);
        }, 1000);
    });
}

// Initialize loading animation immediately
initLoadingAnimation();// ===== 
SCROLL TO TOP BUTTON FUNCTIONALITY =====
function initScrollToTopButton() {
    // Create scroll to top button if it doesn't exist
    let scrollToTopBtn = document.getElementById('scrollToTop');
    
    if (!scrollToTopBtn) {
        scrollToTopBtn = document.createElement('button');
        scrollToTopBtn.id = 'scrollToTop';
        scrollToTopBtn.className = 'scroll-to-top';
        scrollToTopBtn.innerHTML = '↑';
        scrollToTopBtn.setAttribute('aria-label', 'Scroll to top');
        document.body.appendChild(scrollToTopBtn);
    }
    
    // Show/hide button based on scroll position
    function toggleScrollToTopButton() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    }
    
    // Smooth scroll to top
    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
    
    // Event listeners
    scrollToTopBtn.addEventListener('click', scrollToTop);
    window.addEventListener('scroll', debounce(toggleScrollToTopButton, 10));
    
    // Initial check
    toggleScrollToTopButton();
}

// Initialize scroll to top button
document.addEventListener('DOMContentLoaded', function() {
    initScrollToTopButton();
});