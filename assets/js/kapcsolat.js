// DOM Elements
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Mobile Navigation Toggle
if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
if (navLinks.length > 0 && hamburger && navMenu) {
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Add fade-in class to elements and observe them
const animateElements = document.querySelectorAll('.contact-item-large, .contact-form-section, .map-container, .faq-item, .opening-hours');
animateElements.forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});

// Contact form handling
const contactForm = document.getElementById('contact-form-detailed');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Basic validation
        if (!data.name || !data.email || !data.message) {
            showNotification('Kérjük, töltse ki az összes kötelező mezőt!', 'error');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            showNotification('Kérjük, adjon meg egy érvényes email címet!', 'error');
            return;
        }
        
        // Show loading state
        const submitBtn = this.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Küldés...';
        submitBtn.disabled = true;
        
        // Simulate form submission (replace with actual form handling)
        setTimeout(() => {
            showNotification('Üzenetét sikeresen elküldtük! Hamarosan válaszolunk.', 'success');
            this.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
    `;
    
    const content = notification.querySelector('.notification-content');
    content.style.cssText = `
        display: flex;
        align-items: center;
        gap: 0.5rem;
    `;
    
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        margin-left: auto;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 5 seconds
    const autoRemove = setTimeout(() => {
        removeNotification(notification);
    }, 5000);
    
    // Close button functionality
    closeBtn.addEventListener('click', () => {
        clearTimeout(autoRemove);
        removeNotification(notification);
    });
}

function removeNotification(notification) {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

// FAQ functionality (static FAQ items - no interaction needed)
function initFAQ() {
    // FAQ items are now static, no interaction needed
    // Just add fade-in animation to FAQ items
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
        item.classList.add('fade-in');
        observer.observe(item);
    });
}

// Contact item hover effects
const contactItems = document.querySelectorAll('.contact-item-large');
contactItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'translateY(-5px)';
        item.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.15)';
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'translateY(0)';
        item.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.15)';
    });
});

// Form input focus effects
const formInputs = document.querySelectorAll('.form-group input, .form-group textarea, .form-group select');
formInputs.forEach(input => {
    input.addEventListener('focus', () => {
        input.parentElement.style.transform = 'scale(1.02)';
        input.style.boxShadow = '0 0 0 3px rgba(139, 69, 19, 0.1)';
    });
    
    input.addEventListener('blur', () => {
        input.parentElement.style.transform = 'scale(1)';
        input.style.boxShadow = 'none';
    });
});

// Set active navigation link
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
        }
    });
}

// Scroll to top functionality
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollToTopBtn.className = 'scroll-to-top';
scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: #8B4513;
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    font-size: 1.2rem;
    box-shadow: 0 4px 12px rgba(139, 69, 19, 0.3);
    transition: all 0.3s ease;
    opacity: 0;
    visibility: hidden;
    z-index: 1000;
`;

document.body.appendChild(scrollToTopBtn);

// Show/hide scroll to top button
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.style.opacity = '1';
        scrollToTopBtn.style.visibility = 'visible';
    } else {
        scrollToTopBtn.style.opacity = '0';
        scrollToTopBtn.style.visibility = 'hidden';
    }
});

// Scroll to top functionality
scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Add hover effect to scroll to top button
scrollToTopBtn.addEventListener('mouseenter', () => {
    scrollToTopBtn.style.transform = 'scale(1.1)';
    scrollToTopBtn.style.background = '#A0522D';
});

scrollToTopBtn.addEventListener('mouseleave', () => {
    scrollToTopBtn.style.transform = 'scale(1)';
    scrollToTopBtn.style.background = '#8B4513';
});

// Map interaction (placeholder)
const mapContainer = document.querySelector('.map-container');
if (mapContainer) {
    mapContainer.addEventListener('click', () => {
        // Placeholder for map interaction
        showNotification('Térkép funkció hamarosan elérhető!', 'info');
    });
}

// Form field validation on input
formInputs.forEach(input => {
    input.addEventListener('input', () => {
        validateField(input);
    });
});

function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;
    
    // Remove existing error styling
    field.style.borderColor = '#e0e0e0';
    
    // Validation rules
    if (fieldName === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            field.style.borderColor = '#f44336';
        } else {
            field.style.borderColor = '#4CAF50';
        }
    }
    
    if (fieldName === 'phone' && value) {
        const phoneRegex = /^[+]?[0-9\s\-\(\)]{8,}$/;
        if (!phoneRegex.test(value)) {
            field.style.borderColor = '#f44336';
        } else {
            field.style.borderColor = '#4CAF50';
        }
    }
    
    if ((fieldName === 'name' || fieldName === 'message') && value) {
        if (value.length < 2) {
            field.style.borderColor = '#f44336';
        } else {
            field.style.borderColor = '#4CAF50';
        }
    }
}

// Contact items stagger animation
contactItems.forEach((item, index) => {
    item.style.animationDelay = `${index * 0.1}s`;
});

// FAQ items stagger animation
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach((item, index) => {
    item.style.animationDelay = `${index * 0.1}s`;
});

// Initialize page-specific functions
document.addEventListener('DOMContentLoaded', () => {
    setActiveNavLink();
    initFAQ();
});

window.addEventListener('load', () => {
    setActiveNavLink();
});

// Console welcome message
console.log('%c🧀 Debreczeni Sajtműhely - Kapcsolat 🧀', 'color: #8B4513; font-size: 20px; font-weight: bold;');
console.log('%cVárjuk megkeresését! Lépjen kapcsolatba velünk!', 'color: #666; font-size: 14px;');