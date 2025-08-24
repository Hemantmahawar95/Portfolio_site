// DOM Elements
const loginPage = document.getElementById('loginPage');
const portfolioContent = document.getElementById('portfolioContent');
const loginForm = document.getElementById('loginForm');
const logoutBtn = document.getElementById('logoutBtn');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Login System
function showLoginPage() {
    loginPage.style.display = 'flex';
    portfolioContent.style.display = 'none';
    document.body.style.overflow = 'hidden';
}

function hideLoginPage() {
    loginPage.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function login(username, password) {
    // Demo credentials
    if (username === 'admin' && password === '1234') {
        hideLoginPage();
        showPortfolio();
        return true;
    } else {
        alert('Invalid credentials! Use: username: admin, password: 1234');
        return false;
    }
}

function logout() {
    showLoginPage();
    hidePortfolio();
}

function showPortfolio() {
    // Hide login page first
    loginPage.style.display = 'none';
    
    // Show portfolio content
    portfolioContent.classList.remove('hidden');
    portfolioContent.style.display = 'block';
    
    // Enable scrolling
    document.body.style.overflow = 'auto';
    
    console.log('Portfolio shown successfully!');
    console.log('Portfolio content display:', portfolioContent.style.display);
    console.log('Portfolio content hidden class:', portfolioContent.classList.contains('hidden'));
    console.log('Portfolio content visible:', portfolioContent.offsetHeight > 0);
    
    // Set up contact form and other features
    setTimeout(() => {
        handleContactForm();
        addFooterLinkHandlers();
    }, 100);
}

function hidePortfolio() {
    portfolioContent.classList.add('hidden');
    portfolioContent.style.display = 'none';
}

// Always show login page first
function checkLoginStatus() {
    showLoginPage();
    hidePortfolio();
}

// Event Listeners
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    login(username, password);
});

logoutBtn.addEventListener('click', logout);

// Mobile Navigation
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth Scrolling for Navigation Links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Smooth Scrolling for Footer Links
let footerHandlersAdded = false;

function addFooterLinkHandlers() {
    if (footerHandlersAdded) {
        console.log('Footer handlers already added, skipping...');
        return;
    }
    
    const footerLinks = document.querySelectorAll('.footer-section a[href^="#"]');
    console.log('Found footer links:', footerLinks.length); // Debug log
    
    if (footerLinks.length === 0) {
        console.log('No footer links found, will retry later...');
        return;
    }
    
    footerLinks.forEach((link, index) => {
        console.log(`Setting up footer link ${index + 1}:`, link.href); // Debug log
        
        // Remove any existing listeners to prevent duplicates
        link.removeEventListener('click', handleFooterLinkClick);
        link.addEventListener('click', handleFooterLinkClick);
    });
    
    footerHandlersAdded = true;
    console.log('Footer link handlers successfully added!');
}

function handleFooterLinkClick(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    
    console.log('Footer link clicked:', targetId); // Debug log
    console.log('Target section found:', targetSection); // Debug log
    
    if (targetSection) {
        targetSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    } else {
        console.error('Target section not found:', targetId);
    }
}

// Navbar Background on Scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Floating Elements Animation - Simplified
function animateFloatingElements() {
    const floatingElements = document.querySelectorAll('.floating-element');
    
    floatingElements.forEach(element => {
        const speed = element.getAttribute('data-speed');
        const y = Math.sin(Date.now() * 0.0005 * speed) * 10; // Reduced movement
        element.style.transform = `translateY(${y}px)`;
    });
    
    // Only animate every 100ms instead of every frame for better performance
    setTimeout(() => {
        requestAnimationFrame(animateFloatingElements);
    }, 100);
}

// Parallax Effect for Hero Section - Simplified
function parallaxEffect() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    
    if (hero && heroContent) {
        // Reduced parallax effect for smoother experience
        heroContent.style.transform = `translateY(${scrolled * 0.2}px)`;
    }
}

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation - Simplified
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.skill-item, .project-card, .stat, .contact-item');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(15px)'; // Reduced movement
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease'; // Faster, smoother
        observer.observe(el);
    });
});

// Skill Items Hover Effect - Simplified
function addSkillHoverEffects() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateY(-5px) scale(1.02)'; // Reduced movement
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Project Cards Hover Effect
function addProjectHoverEffects() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const overlay = card.querySelector('.project-overlay');
            if (overlay) {
                overlay.style.opacity = '1';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            const overlay = card.querySelector('.project-overlay');
            if (overlay) {
                overlay.style.opacity = '0';
            }
        });
    });
}

// Contact Form Handling
function handleContactForm() {
    const contactForm = document.getElementById('contactForm');
    console.log('Setting up contact form handler...'); // Debug log
    
    if (contactForm) {
        console.log('Contact form found, adding event listener...'); // Debug log
        
        // Test if we can access the form elements
        const nameInput = document.getElementById('contactName');
        const emailInput = document.getElementById('contactEmail');
        const messageInput = document.getElementById('contactMessage');
        
        console.log('Form elements found:', {
            nameInput: nameInput ? 'Yes' : 'No',
            emailInput: emailInput ? 'Yes' : 'No',
            messageInput: messageInput ? 'Yes' : 'No'
        });
        
        // Remove any existing listeners to prevent duplicates
        contactForm.removeEventListener('submit', handleContactFormSubmit);
        contactForm.addEventListener('submit', handleContactFormSubmit);
        
        console.log('Contact form event listener added successfully!'); // Debug log
        
        // Also add click event to the submit button for extra debugging
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        if (submitBtn) {
            submitBtn.addEventListener('click', (e) => {
                console.log('Submit button clicked!');
            });
        }
        
        // Add input event listeners to all form fields for debugging
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach((input, index) => {
            input.addEventListener('input', (e) => {
                console.log(`Input ${index + 1} changed:`, e.target.value);
            });
            input.addEventListener('focus', (e) => {
                console.log(`Input ${index + 1} focused:`, e.target.placeholder);
            });
        });
        
    } else {
        console.log('Contact form not found yet...'); // Debug log
    }
}

function handleContactFormSubmit(e) {
    e.preventDefault();
    console.log('Contact form submitted!'); // Debug log
    
    // Get form data using IDs
    const name = document.getElementById('contactName').value;
    const email = document.getElementById('contactEmail').value;
    const message = document.getElementById('contactMessage').value;
    
    console.log('Form data:', { name, email, message }); // Debug log
    
    // Simple validation
    if (!name || !email || !message) {
        alert('Please fill in all fields');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address');
        return;
    }
    
    // Simulate form submission
    alert('Thank you for your message! I\'ll get back to you soon.');
    e.target.reset();
    console.log('Form submitted and reset successfully!'); // Debug log
}

// Typing Effect for Hero Title - Simplified
function typeWriter(element, text, speed = 150) {
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

// Initialize Typing Effect
function initTypingEffect() {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 150); // Slower typing
        }, 2000); // Longer delay
    }
}

// Counter Animation for Stats
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent);
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current) + '+';
                setTimeout(updateCounter, 20);
            } else {
                counter.textContent = target + '+';
            }
        };
        
        updateCounter();
    });
}

// Smooth Reveal Animation for Sections - Simplified
function revealOnScroll() {
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const windowHeight = window.innerHeight;
        const scrolled = window.pageYOffset;
        
        if (scrolled + windowHeight > sectionTop + sectionHeight / 2) {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }
    });
}

// Initialize all functions
function init() {
    checkLoginStatus();
    addSkillHoverEffects();
    addProjectHoverEffects();
    initTypingEffect();
    
    // Start animations
    if (document.querySelector('.floating-element')) {
        animateFloatingElements();
    }
    
    // Add scroll event listeners
window.addEventListener('scroll', () => {
    parallaxEffect();
    revealOnScroll();
    
    // Try to add footer handlers if they haven't been added yet
    if (!footerHandlersAdded) {
        addFooterLinkHandlers();
    }
    
    // Also try to add contact form handler if it's not working
    handleContactForm();
});
    
    // Initialize section animations - Simplified
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)'; // Reduced movement
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease'; // Faster, smoother
    });
    
    // Trigger initial reveal
    setTimeout(revealOnScroll, 200);
    
    // Animate counters when about section is visible
    const aboutSection = document.querySelector('#about');
    if (aboutSection) {
        const aboutObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    aboutObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        aboutObserver.observe(aboutSection);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', init);

// Add document click listener to catch form interactions
document.addEventListener('click', (e) => {
    // If clicking on contact form elements, try to set up the handler
    if (e.target.closest('#contactForm') || e.target.closest('.contact-form')) {
        console.log('Contact form area clicked, setting up handler...');
        handleContactForm();
    }
});

// Add document input listener to catch form interactions
document.addEventListener('input', (e) => {
    // If typing in contact form elements, try to set up the handler
    if (e.target.closest('#contactForm') || e.target.closest('.contact-form')) {
        console.log('Contact form input detected, setting up handler...');
        handleContactForm();
    }
});

// Add document focus listener to catch form interactions
document.addEventListener('focus', (e) => {
    // If focusing on contact form elements, try to set up the handler
    if (e.target.closest('#contactForm') || e.target.closest('.contact-form')) {
        console.log('Contact form focused, setting up handler...');
        handleContactForm();
    }
}, true);

// Add some fun Easter eggs - Simplified
document.addEventListener('keydown', (e) => {
    // Press 'h' for a hidden message
    if (e.key === 'h' && e.ctrlKey) {
        alert('🎉 You found the hidden message! This portfolio was created with ❤️ and JavaScript!');
    }
});

// Add loading animation - Simplified
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.3s ease'; // Faster transition
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 50); // Shorter delay
});

console.log('Portfolio loaded successfully!'); 
