// Navbar scroll effect
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Update active nav link based on scroll position
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Mobile menu toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

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

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Animated counters
const counters = document.querySelectorAll('.counter');
let counterAnimated = false;

const animateCounters = () => {
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current) + '+';
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target + '+';
            }
        };

        updateCounter();
    });
};

// Intersection Observer for counter animation
const counterSection = document.querySelector('.about-stats');
if (counterSection) {
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !counterAnimated) {
                animateCounters();
                counterAnimated = true;
            }
        });
    }, { threshold: 0.5 });

    counterObserver.observe(counterSection);
}

// Enhanced scroll animations with Intersection Observer
const animationObserverOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
};

const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) scale(1)';
            }, index * 100);
        }
    });
}, animationObserverOptions);

// Observe all animated elements
const animatedElements = document.querySelectorAll('.class-card, .instructor-card, .stat-card, .testimonial-card');
animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(50px) scale(0.9)';
    el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    animationObserver.observe(el);
});

// Schedule tabs functionality
const scheduleTabs = document.querySelectorAll('.schedule-tab');
const scheduleDays = document.querySelectorAll('.schedule-day');

scheduleTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Remove active class from all tabs and days
        scheduleTabs.forEach(t => t.classList.remove('active'));
        scheduleDays.forEach(d => d.classList.remove('active'));

        // Add active class to clicked tab
        tab.classList.add('active');

        // Show corresponding day schedule
        const day = tab.getAttribute('data-day');
        const daySchedule = document.getElementById(day);
        if (daySchedule) {
            daySchedule.classList.add('active');
        }
    });
});

// Testimonials slider
let currentTestimonial = 0;
const testimonialCards = document.querySelectorAll('.testimonial-card');
const testimonialDots = document.querySelectorAll('.dot');

const showTestimonial = (index) => {
    testimonialCards.forEach(card => card.classList.remove('active'));
    testimonialDots.forEach(dot => dot.classList.remove('active'));

    testimonialCards[index].classList.add('active');
    testimonialDots[index].classList.add('active');
};

testimonialDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentTestimonial = index;
        showTestimonial(currentTestimonial);
    });
});

// Auto-rotate testimonials
setInterval(() => {
    currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
    showTestimonial(currentTestimonial);
}, 5000);

// Contact form handling with WhatsApp integration
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');
const emailSubmitBtn = document.getElementById('emailSubmit');

// WhatsApp number (replace with your actual WhatsApp number)
// Format: country code + number (no + or spaces)
// Example: 1234567890 for +1 234-567-890
const WHATSAPP_NUMBER = '9948318650'; // Replace with your WhatsApp number

// WhatsApp form submission
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const interest = document.getElementById('interest').value;
    const message = document.getElementById('message').value;

    // Simple validation
    if (!name || !email || !phone || !interest || !message) {
        formMessage.textContent = 'Please fill in all required fields.';
        formMessage.className = 'form-message error';
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 3000);
        return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        formMessage.textContent = 'Please enter a valid email address.';
        formMessage.className = 'form-message error';
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 3000);
        return;
    }

    // Create WhatsApp message
    const whatsappMessage = `*New Inquiry from Serenity Yoga Website*

*Name:* ${name}
*Email:* ${email}
*Phone:* ${phone}
*Class Interest:* ${interest}

*Message:*
${message}

---
Sent from Serenity Yoga Institute Website`;

    // Encode message for URL
    const encodedMessage = encodeURIComponent(whatsappMessage);
    
    // Create WhatsApp URL
    const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
    
    // Open WhatsApp
    window.open(whatsappURL, '_blank');
    
    // Show success message
    formMessage.textContent = `Thank you, ${name}! Opening WhatsApp to send your message...`;
    formMessage.className = 'form-message success';

    // Reset form after a delay
    setTimeout(() => {
        contactForm.reset();
        formMessage.style.display = 'none';
    }, 3000);
});

// Email submission (traditional method)
emailSubmitBtn.addEventListener('click', () => {
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const interest = document.getElementById('interest').value;
    const message = document.getElementById('message').value;

    // Simple validation
    if (!name || !email || !phone || !interest || !message) {
        formMessage.textContent = 'Please fill in all required fields.';
        formMessage.className = 'form-message error';
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 3000);
        return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        formMessage.textContent = 'Please enter a valid email address.';
        formMessage.className = 'form-message error';
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 3000);
        return;
    }

    // Create mailto link
    const subject = encodeURIComponent(`Yoga Class Inquiry - ${interest}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nClass Interest: ${interest}\n\nMessage:\n${message}`);
    const mailtoLink = `mailto:info@serenityyoga.com?subject=${subject}&body=${body}`;
    
    // Open email client
    window.location.href = mailtoLink;
    
    // Show success message
    formMessage.textContent = `Thank you, ${name}! Opening your email client...`;
    formMessage.className = 'form-message success';

    // Reset form after a delay
    setTimeout(() => {
        contactForm.reset();
        formMessage.style.display = 'none';
    }, 3000);
});

// Scroll to top button
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});



// Newsletter form handling
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const emailInput = newsletterForm.querySelector('input[type="email"]');
        const email = emailInput.value;

        if (email) {
            alert(`Thank you for subscribing! We'll send updates to ${email}`);
            emailInput.value = '';
        }
    });
}

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    const scrolled = window.scrollY;
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});



// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Dynamic year in footer
const currentYear = new Date().getFullYear();
const footerText = document.querySelector('.footer-bottom p');
if (footerText) {
    footerText.textContent = `© ${currentYear} Serenity Yoga Institute. All rights reserved.`;
}

// Add ripple effect to buttons
const allButtons = document.querySelectorAll('.btn, .btn-small, .btn-primary, .btn-secondary');
allButtons.forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');

        this.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add CSS for ripple effect dynamically
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    .btn, .btn-small, .btn-primary, .btn-secondary {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Theme Toggle Functionality
const themeToggle = document.getElementById('themeToggle');
const themeModal = document.getElementById('themeModal');
const closeModal = document.getElementById('closeModal');
const themeOptions = document.querySelectorAll('.theme-option');

// Load saved theme
const savedTheme = localStorage.getItem('yogaTheme') || 'default';
document.documentElement.setAttribute('data-theme', savedTheme);

// Open theme modal
themeToggle.addEventListener('click', () => {
    themeModal.classList.add('active');
});

// Close theme modal
closeModal.addEventListener('click', () => {
    themeModal.classList.remove('active');
});

// Close modal when clicking outside
themeModal.addEventListener('click', (e) => {
    if (e.target === themeModal) {
        themeModal.classList.remove('active');
    }
});

// Theme selection
themeOptions.forEach(option => {
    option.addEventListener('click', () => {
        const theme = option.getAttribute('data-theme');
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('yogaTheme', theme);
        
        // Add selection animation
        option.style.transform = 'scale(0.9)';
        setTimeout(() => {
            option.style.transform = 'scale(1)';
        }, 200);
        
        // Show confirmation
        showNotification(`Theme changed to ${option.querySelector('span').textContent}!`);
        
        // Close modal after selection
        setTimeout(() => {
            themeModal.classList.remove('active');
        }, 500);
    });
});

// Notification system
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 30px;
        background: var(--gradient-primary);
        color: white;
        padding: 20px 30px;
        border-radius: 50px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        z-index: 10001;
        animation: slideInRight 0.5s ease;
        font-weight: 600;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.5s ease';
        setTimeout(() => notification.remove(), 500);
    }, 3000);
}

// Add notification animations
const notificationStyle = document.createElement('style');
notificationStyle.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
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
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(notificationStyle);

// Parallax effect for sections
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    
    // Hero parallax
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.backgroundPositionY = `${scrolled * 0.5}px`;
    }
    
    // Floating shapes parallax
    const shapes = document.querySelectorAll('.floating-shape');
    shapes.forEach((shape, index) => {
        const speed = (index + 1) * 0.1;
        shape.style.transform = `translate(${scrolled * speed}px, ${scrolled * speed * 0.5}px)`;
    });
});

// Simplified class card interactions - removed 3D tilt for cleaner animation
const enhancedClassCards = document.querySelectorAll('.class-card');
enhancedClassCards.forEach(card => {
    // Simple hover effect - CSS handles the animation
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.4s ease';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transition = 'all 0.4s ease';
    });
});

// Smooth reveal for sections
const sections = document.querySelectorAll('section');
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 1s ease, transform 1s ease';
    sectionObserver.observe(section);
});

// Cursor trail effect (optional - adds magic!)
let cursorTrail = [];
const maxTrailLength = 20;

document.addEventListener('mousemove', (e) => {
    cursorTrail.push({ x: e.clientX, y: e.clientY, time: Date.now() });
    
    if (cursorTrail.length > maxTrailLength) {
        cursorTrail.shift();
    }
});

// Animate stats on scroll
const statCards = document.querySelectorAll('.stat-card');
statCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-20px) scale(1.05) rotate(5deg)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1) rotate(0deg)';
    });
});

// Add loading screen
window.addEventListener('load', () => {
    const loader = document.createElement('div');
    loader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: var(--gradient-primary);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 99999;
        transition: opacity 0.5s ease;
    `;
    
    const loaderContent = document.createElement('div');
    loaderContent.innerHTML = `
        <div style="text-align: center; color: white;">
            <i class="fas fa-spa" style="font-size: 80px; animation: pulse 1.5s infinite;"></i>
            <h2 style="margin-top: 20px; font-size: 32px;">Serenity Yoga</h2>
        </div>
    `;
    
    loader.appendChild(loaderContent);
    document.body.prepend(loader);
    
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => loader.remove(), 500);
    }, 1500);
});

// Add pulse animation for loader
const pulseStyle = document.createElement('style');
pulseStyle.textContent = `
    @keyframes pulse {
        0%, 100% { transform: scale(1); opacity: 1; }
        50% { transform: scale(1.2); opacity: 0.7; }
    }
`;
document.head.appendChild(pulseStyle);

// Hero Background Slideshow
const heroSlides = document.querySelectorAll('.hero-slide');
let currentSlide = 0;

function nextSlide() {
    // Remove active class from current slide
    heroSlides[currentSlide].classList.remove('active');
    
    // Move to next slide
    currentSlide = (currentSlide + 1) % heroSlides.length;
    
    // Add active class to new slide
    heroSlides[currentSlide].classList.add('active');
}

// Change slide every 5 seconds
setInterval(nextSlide, 5000);

console.log('🧘‍♀️ Serenity Yoga Institute - Extraordinary website loaded! ✨');
