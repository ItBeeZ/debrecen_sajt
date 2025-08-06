// DOM Elements
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const contactForm = document.getElementById('contact-form');

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

// Smooth scrolling for navigation links (only for anchor links)
if (navLinks.length > 0) {
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            // Only prevent default for anchor links (starting with #)
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(href);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
            // For regular links (like .html files), let the browser handle navigation normally
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
const animateElements = document.querySelectorAll('.feature, .product-card, .contact-item');
animateElements.forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});

// Contact form handling
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const message = formData.get('message');
    
    // Basic validation
    if (!name || !email || !message) {
        showNotification('Kérjük, töltse ki az összes kötelező mezőt!', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showNotification('Kérjük, adjon meg egy érvényes email címet!', 'error');
        return;
    }
    
    // Simulate form submission
    setTimeout(() => {
        showNotification('Üzenetét sikeresen elküldtük! Hamarosan felvesszük Önnel a kapcsolatot.', 'success');
        contactForm.reset();
    }, 2000);
    });
}

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 90px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        max-width: 400px;
        animation: slideInRight 0.3s ease;
    `;
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Add notification animations to CSS
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        line-height: 1;
    }
    
    .notification-close:hover {
        opacity: 0.8;
    }
`;
document.head.appendChild(notificationStyles);

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElement = document.querySelector('.cheese-illustration');
    
    if (parallaxElement) {
        const speed = scrolled * 0.5;
        parallaxElement.style.transform = `translateY(${speed}px)`;
    }
});

// Product card hover effects
const productCards = document.querySelectorAll('.product-card');
productCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Feature cards stagger animation
const features = document.querySelectorAll('.feature');
features.forEach((feature, index) => {
    feature.style.animationDelay = `${index * 0.2}s`;
});

// Typing effect for hero subtitle
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect when page loads
window.addEventListener('load', () => {
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
        const originalText = heroSubtitle.textContent;
        setTimeout(() => {
            typeWriter(heroSubtitle, originalText, 80);
        }, 1000);
    }
});

// Counter animation for statistics (if needed in future)
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    }
    
    updateCounter();
}

// Lazy loading for images (if images are added later)
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    if (images.length > 0) {
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
}

// Initialize lazy loading
lazyLoadImages();

// Active Navigation Link
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href === currentPage || 
            (currentPage === '' && href === 'index.html') ||
            (currentPage === 'index.html' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
}

// Product Category Filter (for products page)
function initProductFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card-detailed');
    
    if (filterBtns.length === 0) return;
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');
            
            const filter = btn.dataset.filter;
            
            productCards.forEach(card => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeInUp 0.5s ease';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// Enhanced Contact Form (for contact page)
function initContactForm() {
    const contactForm = document.querySelector('.contact-form-detailed');
    if (!contactForm) return;
    
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
        
        // Simulate form submission
        const submitBtn = this.querySelector('.btn-large');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Küldés...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            showNotification('Üzenetét sikeresen elküldtük! Hamarosan felvesszük Önnel a kapcsolatot.', 'success');
            this.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// FAQ Toggle (for contact page)
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('h3');
        if (question) {
            question.style.cursor = 'pointer';
            question.addEventListener('click', () => {
                const answer = item.querySelector('p');
                const isVisible = answer.style.display !== 'none';
                
                // Close all other FAQ items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        const otherAnswer = otherItem.querySelector('p');
                        otherAnswer.style.display = 'none';
                        otherItem.style.backgroundColor = 'white';
                    }
                });
                
                // Toggle current item
                if (isVisible) {
                    answer.style.display = 'none';
                    item.style.backgroundColor = 'white';
                } else {
                    answer.style.display = 'block';
                    item.style.backgroundColor = '#FAFAFA';
                }
            });
        }
    });
}

// Initialize page-specific functions
function initPageSpecific() {
    setActiveNavLink();
    initProductFilters();
    initContactForm();
    initFAQ();
}

// Call page-specific initialization
document.addEventListener('DOMContentLoaded', initPageSpecific);
window.addEventListener('load', initPageSpecific);

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

// Console welcome message
console.log('%c🧀 Debreczeni Sajtműhely Weboldal 🧀', 'color: #8B4513; font-size: 20px; font-weight: bold;');
console.log('%cKöszönjük, hogy meglátogatta weboldalunkat!', 'color: #666; font-size: 14px;');