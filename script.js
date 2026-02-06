/**
 * Эне Болом - Interactive Features
 * Mobile-first gynecological literacy course website
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    initAccordion();
    initSmoothScroll();
    initFadeInAnimations();
    initStickyButtonVisibility();
});

/**
 * Accordion functionality for modules section
 */
function initAccordion() {
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const accordionItem = this.parentElement;
            const isActive = accordionItem.classList.contains('active');
            
            // Close all accordion items
            document.querySelectorAll('.accordion-item').forEach(item => {
                item.classList.remove('active');
                item.querySelector('.accordion-header').setAttribute('aria-expanded', 'false');
            });
            
            // Open clicked item if it wasn't already open
            if (!isActive) {
                accordionItem.classList.add('active');
                this.setAttribute('aria-expanded', 'true');
            }
        });
        
        // Keyboard accessibility
        header.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
}

/**
 * Smooth scrolling for anchor links
 */
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                
                // Calculate offset for sticky header if needed
                const offset = 20;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - offset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Fade-in animations on scroll using Intersection Observer
 */
function initFadeInAnimations() {
    // Add fade-in class to sections
    const sections = document.querySelectorAll('section:not(.hero)');
    sections.forEach(section => {
        section.classList.add('fade-in');
    });
    
    // Intersection Observer for fade-in effect
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Unobserve after animation to improve performance
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all fade-in elements
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
}

/**
 * Hide sticky CTA when final CTA is visible
 */
function initStickyButtonVisibility() {
    const stickyCta = document.querySelector('.sticky-cta');
    const finalCta = document.querySelector('.final-cta');
    
    if (!stickyCta || !finalCta) return;
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                stickyCta.style.opacity = '0';
                stickyCta.style.pointerEvents = 'none';
            } else {
                stickyCta.style.opacity = '1';
                stickyCta.style.pointerEvents = 'auto';
            }
        });
    }, observerOptions);
    
    observer.observe(finalCta);
    
    // Add transition for smooth hide/show
    stickyCta.style.transition = 'opacity 0.3s ease';
}

/**
 * Touch-friendly interactions
 * Adding active states for better mobile feedback
 */
document.querySelectorAll('.btn, .fact-card, .about-item, .result-item, .audience-card').forEach(el => {
    el.addEventListener('touchstart', function() {
        this.style.transform = 'scale(0.98)';
    }, { passive: true });
    
    el.addEventListener('touchend', function() {
        this.style.transform = '';
    }, { passive: true });
});
