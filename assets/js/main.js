/*
 * Centre for Preventive Health - Main JavaScript
 * Handles form submissions, animations, and interactive features
 */

document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize all functions
    initializeNavigation();
    initializeFormHandling();
    initializeAnimations();
    initializeWhatsAppIntegration();
    initializeTestimonialCarousel();
    
    console.log('Centre for Preventive Health website initialized');
});

/* ===================================
   Navigation Functions
   =================================== */

function initializeNavigation() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.classList.remove('scrolled');
            navbar.style.backgroundColor = '';
            navbar.style.backdropFilter = '';
        }
    });
    
    // Smooth scrolling for anchor links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    // Mobile menu close on link click
    const navbarCollapse = document.querySelector('#navbarNav');
    const navbarToggler = document.querySelector('.navbar-toggler');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth < 992 && navbarCollapse.classList.contains('show')) {
                navbarToggler.click();
            }
        });
    });
}

/* ===================================
   Form Handling
   =================================== */

function initializeFormHandling() {
    const quickContactForm = document.getElementById('quickContactForm');
    
    if (quickContactForm) {
        quickContactForm.addEventListener('submit', handleQuickContactSubmission);
    }
    
    // Add form validation
    addFormValidation();
}

function handleQuickContactSubmission(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    const submitBtn = form.querySelector('button[type="submit"]');
    
    // Get form values
    const name = form.querySelector('input[type="text"]').value;
    const phone = form.querySelector('input[type="tel"]').value;
    const email = form.querySelector('input[type="email"]').value;
    const healthConcern = form.querySelector('select').value;
    const message = form.querySelector('textarea').value || '';
    
    // Validate required fields
    if (!name || !phone || !email || !healthConcern) {
        showNotification('Please fill in all required fields', 'error');
        return;
    }
    
    // Validate email
    if (!isValidEmail(email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }
    
    // Validate phone
    if (!isValidPhone(phone)) {
        showNotification('Please enter a valid phone number', 'error');
        return;
    }
    
    // Show loading state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Submitting...';
    submitBtn.disabled = true;
    
    // Simulate form submission (replace with actual backend integration)
    setTimeout(() => {
        // Create WhatsApp message
        const whatsappMessage = createWhatsAppMessage(name, phone, email, healthConcern, message);
        
        // Open WhatsApp
        window.open(`https://wa.me/91XXXXXXXXXX?text=${encodeURIComponent(whatsappMessage)}`, '_blank');
        
        // Show success message
        showNotification('Thank you! We will contact you soon.', 'success');
        
        // Reset form
        form.reset();
        
        // Reset button
        submitBtn.innerHTML = 'Book Free Consultation';
        submitBtn.disabled = false;
        
        // Track conversion (replace with actual analytics)
        trackFormSubmission('quick_contact', {
            name: name,
            healthConcern: healthConcern
        });
        
    }, 2000);
}

function createWhatsAppMessage(name, phone, email, healthConcern, message) {
    let whatsappText = `Hello! I would like to book a consultation.\n\n`;
    whatsappText += `*Name:* ${name}\n`;
    whatsappText += `*Phone:* ${phone}\n`;
    whatsappText += `*Email:* ${email}\n`;
    whatsappText += `*Health Concern:* ${healthConcern}\n`;
    if (message) {
        whatsappText += `*Message:* ${message}\n`;
    }
    whatsappText += `\nI found you through your website. Please let me know the next steps.`;
    
    return whatsappText;
}

function addFormValidation() {
    const inputs = document.querySelectorAll('input, select, textarea');
    
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            clearFieldError(this);
        });
    });
}

function validateField(field) {
    const value = field.value.trim();
    const type = field.type;
    const required = field.hasAttribute('required');
    
    clearFieldError(field);
    
    if (required && !value) {
        showFieldError(field, 'This field is required');
        return false;
    }
    
    if (type === 'email' && value && !isValidEmail(value)) {
        showFieldError(field, 'Please enter a valid email address');
        return false;
    }
    
    if (type === 'tel' && value && !isValidPhone(value)) {
        showFieldError(field, 'Please enter a valid phone number');
        return false;
    }
    
    return true;
}

function showFieldError(field, message) {
    field.classList.add('is-invalid');
    
    let errorDiv = field.parentNode.querySelector('.invalid-feedback');
    if (!errorDiv) {
        errorDiv = document.createElement('div');
        errorDiv.className = 'invalid-feedback';
        field.parentNode.appendChild(errorDiv);
    }
    errorDiv.textContent = message;
}

function clearFieldError(field) {
    field.classList.remove('is-invalid');
    const errorDiv = field.parentNode.querySelector('.invalid-feedback');
    if (errorDiv) {
        errorDiv.remove();
    }
}

/* ===================================
   Validation Helpers
   =================================== */

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
    return phoneRegex.test(phone);
}

/* ===================================
   Animations and Scroll Effects
   =================================== */

function initializeAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);
    
    // Observe service cards and testimonials
    const animateElements = document.querySelectorAll('.service-card, .testimonial-card, .icon-circle');
    animateElements.forEach(el => observer.observe(el));
    
    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelector('.hero-banner');
        
        if (parallax) {
            const speed = scrolled * 0.5;
            parallax.style.transform = `translateY(${speed}px)`;
        }
    });
}

/* ===================================
   WhatsApp Integration
   =================================== */

function initializeWhatsAppIntegration() {
    const whatsappBtns = document.querySelectorAll('.whatsapp-btn, .btn-success');
    
    whatsappBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Track WhatsApp click
            trackEvent('whatsapp_click', {
                source: this.classList.contains('whatsapp-btn') ? 'floating_button' : 'form_button'
            });
            
            // Open WhatsApp
            const defaultMessage = "Hello! I'm interested in learning more about your health programs.";
            window.open(`https://wa.me/91XXXXXXXXXX?text=${encodeURIComponent(defaultMessage)}`, '_blank');
        });
    });
}

/* ===================================
   Testimonial Carousel
   =================================== */

function initializeTestimonialCarousel() {
    const carousel = document.getElementById('testimonialsCarousel');
    
    if (carousel) {
        // Auto-advance carousel
        setInterval(function() {
            const nextBtn = carousel.querySelector('.carousel-control-next');
            if (nextBtn && !carousel.matches(':hover')) {
                nextBtn.click();
            }
        }, 7000);
        
        // Pause on hover
        carousel.addEventListener('mouseenter', function() {
            this.style.animationPlayState = 'paused';
        });
        
        carousel.addEventListener('mouseleave', function() {
            this.style.animationPlayState = 'running';
        });
    }
}

/* ===================================
   Notification System
   =================================== */

function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.custom-notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `custom-notification alert alert-${type === 'error' ? 'danger' : type} alert-dismissible`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 9999;
        min-width: 300px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        border-radius: 8px;
        animation: slideInRight 0.3s ease;
    `;
    
    const icon = type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-triangle' : 'info-circle';
    
    notification.innerHTML = `
        <div class="d-flex align-items-center">
            <i class="fas fa-${icon} me-2"></i>
            <span>${message}</span>
            <button type="button" class="btn-close ms-auto" aria-label="Close"></button>
        </div>
    `;
    
    // Add styles for animation
    if (!document.getElementById('notificationStyles')) {
        const style = document.createElement('style');
        style.id = 'notificationStyles';
        style.textContent = `
            @keyframes slideInRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOutRight {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.btn-close');
    closeBtn.addEventListener('click', function() {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

/* ===================================
   Analytics and Tracking
   =================================== */

function trackFormSubmission(formType, data) {
    // Google Analytics 4 event tracking
    if (typeof gtag !== 'undefined') {
        gtag('event', 'form_submission', {
            'event_category': 'engagement',
            'event_label': formType,
            'custom_map': data
        });
    }
    
    // Facebook Pixel tracking
    if (typeof fbq !== 'undefined') {
        fbq('track', 'Lead', {
            content_name: formType,
            content_category: 'health_consultation'
        });
    }
    
    console.log('Form submission tracked:', formType, data);
}

function trackEvent(eventName, data) {
    // Google Analytics 4 event tracking
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, {
            'event_category': 'engagement',
            'custom_map': data
        });
    }
    
    console.log('Event tracked:', eventName, data);
}

/* ===================================
   Utility Functions
   =================================== */

// Debounce function for scroll events
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

// Smooth scroll to element
function scrollToElement(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Format phone number
function formatPhoneNumber(phone) {
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length === 10) {
        return `+91-${cleaned.slice(0, 5)}-${cleaned.slice(5)}`;
    }
    return phone;
}

// Copy to clipboard
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(function() {
        showNotification('Copied to clipboard!', 'success');
    }).catch(function() {
        showNotification('Failed to copy to clipboard', 'error');
    });
}

/* ===================================
   Error Handling
   =================================== */

window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    // You can implement error reporting here
});

window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled promise rejection:', e.reason);
    // You can implement error reporting here
});

/* ===================================
   Performance Optimization
   =================================== */

// Lazy load images when they come into view
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeLazyLoading);
} else {
    initializeLazyLoading();
} 