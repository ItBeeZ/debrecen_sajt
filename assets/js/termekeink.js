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
const animateElements = document.querySelectorAll('.product-card-detailed, .info-card');
animateElements.forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});

// Product Category Filter
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

// Product card hover effects
const productCards = document.querySelectorAll('.product-card-detailed');
productCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Info cards hover effect
const infoCards = document.querySelectorAll('.info-card');
infoCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-5px)';
        card.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.15)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
        card.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
    });
});

// Product cards stagger animation
productCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
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

// Product search functionality (if search input exists)
const searchInput = document.querySelector('.product-search');
if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const productCards = document.querySelectorAll('.product-card-detailed');
        
        productCards.forEach(card => {
            const productName = card.querySelector('h3').textContent.toLowerCase();
            const productDescription = card.querySelector('.product-description').textContent.toLowerCase();
            
            if (productName.includes(searchTerm) || productDescription.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
}

// Product rating animation
const productRatings = document.querySelectorAll('.product-rating');
productRatings.forEach(rating => {
    const stars = rating.querySelectorAll('i');
    stars.forEach((star, index) => {
        star.style.animationDelay = `${index * 0.1}s`;
        star.style.animation = 'fadeIn 0.5s ease forwards';
    });
});

// Add fadeIn animation for stars
const starStyles = document.createElement('style');
starStyles.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: scale(0);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(starStyles);

// Initialize page-specific functions
document.addEventListener('DOMContentLoaded', () => {
    setActiveNavLink();
    initProductFilters();
});

window.addEventListener('load', () => {
    setActiveNavLink();
    initProductFilters();
});

// Console welcome message
console.log('%c🧀 Debreczeni Sajtműhely - Termékeink 🧀', 'color: #8B4513; font-size: 20px; font-weight: bold;');
console.log('%cFedezze fel sajtjaink változatos világát!', 'color: #666; font-size: 14px;');