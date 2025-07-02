const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const statNumbers = document.querySelectorAll('.stat-number');
const contactForm = document.querySelector('.contact-form');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) navLink.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
        current += increment;
        element.textContent = Math.floor(current);
        
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        }
    }, 20);
}

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            
            if (entry.target.classList.contains('stat-number')) {
                const target = parseInt(entry.target.getAttribute('data-count'));
                animateCounter(entry.target, target);
            }
        }
    });
}, observerOptions);

document.querySelectorAll('.project-card, .skill-item, .stat-item, .contact-form').forEach(el => {
    observer.observe(el);
});

statNumbers.forEach(stat => {
    observer.observe(stat);
});

function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

window.addEventListener('load', () => {
    const heroName = document.querySelector('.hero-name');
    const originalText = heroName.textContent;
    typeWriter(heroName, originalText, 100);
});

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    
    if (hero && heroContent) {
        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

function createParticles() {
    const particleContainer = document.querySelector('.hero-bg-animation');
    const particleCount = 20;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        particleContainer.appendChild(particle);
    }
}

createParticles();

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');
    
    if (!name || !email || !subject || !message) {
        showNotification('Please fill in all fields', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }
    
    showNotification('Thank you! Your message has been sent successfully.', 'success');
    this.reset();
});

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '1rem 2rem',
        borderRadius: '8px',
        color: 'white',
        fontWeight: '500',
        zIndex: '10000',
        transform: 'translateX(400px)',
        transition: 'transform 0.3s ease',
        maxWidth: '300px'
    });
    
    switch (type) {
        case 'success':
            notification.style.background = '#10b981';
            break;
        case 'error':
            notification.style.background = '#ef4444';
            break;
        default:
            notification.style.background = '#6366f1';
    }
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 4000);
}

function animateFloatingElements() {
    const floatingElements = document.querySelectorAll('.floating-element');
    
    floatingElements.forEach((element, index) => {
        const randomX = (Math.random() - 0.5) * 20;
        const randomY = (Math.random() - 0.5) * 20;
        const randomRotation = (Math.random() - 0.5) * 30;
        
        element.style.transform = `translate(${randomX}px, ${randomY}px) rotate(${randomRotation}deg)`;
    });
}

setInterval(animateFloatingElements, 3000);

function addScrollRevealAnimation() {
    const sections = document.querySelectorAll('section');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        revealObserver.observe(section);
    });
}

addScrollRevealAnimation();

function createCursorTrail() {
    const trail = [];
    const trailLength = 10;
    
    document.addEventListener('mousemove', (e) => {
        trail.push({ x: e.clientX, y: e.clientY });
        
        if (trail.length > trailLength) {
            trail.shift();
        }
        
        updateTrail();
    });
    
    function updateTrail() {
        const existingTrails = document.querySelectorAll('.cursor-trail');
        existingTrails.forEach(t => t.remove());
        
        trail.forEach((point, index) => {
            const dot = document.createElement('div');
            dot.className = 'cursor-trail';
            Object.assign(dot.style, {
                position: 'fixed',
                left: point.x + 'px',
                top: point.y + 'px',
                width: '4px',
                height: '4px',
                background: 'rgba(99, 102, 241, 0.5)',
                borderRadius: '50%',
                pointerEvents: 'none',
                zIndex: '9999',
                transform: 'translate(-50%, -50%)',
                opacity: (index / trailLength) * 0.5,
                transition: 'opacity 0.2s ease'
            });
            document.body.appendChild(dot);
        });
    }
}

function addThemeToggle() {
    const themeToggle = document.createElement('button');
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    themeToggle.className = 'theme-toggle';
    Object.assign(themeToggle.style, {
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        border: 'none',
        background: 'var(--primary-color)',
        color: 'white',
        fontSize: '1.2rem',
        cursor: 'pointer',
        zIndex: '1000',
        transition: 'all 0.3s ease',
        boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)'
    });
    
    document.body.appendChild(themeToggle);
    
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        const isDark = document.body.classList.contains('dark-theme');
        themeToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    });
}

addThemeToggle();

function addDarkThemeStyles() {
    const darkThemeCSS = `
        .dark-theme {
            --bg-primary: #1f2937;
            --bg-secondary: #111827;
            --bg-dark: #374151;
            --text-primary: #f9fafb;
            --text-secondary: #d1d5db;
            --text-light: #9ca3af;
            --border-color: #374151;
        }
        
        .dark-theme .navbar {
            background: rgba(31, 41, 55, 0.95);
        }
        
        .dark-theme .project-card,
        .dark-theme .skill-item,
        .dark-theme .stat-item,
        .dark-theme .contact-form {
            background: #374151;
            color: #f9fafb;
        }
        
        .dark-theme .form-group input,
        .dark-theme .form-group textarea {
            background: #1f2937;
            border-color: #4b5563;
            color: #f9fafb;
        }
        
        .dark-theme .form-group label {
            color: #9ca3af;
        }
        
        .dark-theme .tech-tag {
            background: #1f2937;
            color: #60a5fa;
        }
    `;
    
    const style = document.createElement('style');
    style.textContent = darkThemeCSS;
    document.head.appendChild(style);
}

addDarkThemeStyles();

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

const debouncedScrollHandler = debounce(() => {
    updateActiveNavLink();
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

function addPreloader() {
    const preloader = document.createElement('div');
    preloader.id = 'preloader';
    preloader.innerHTML = `
        <div class="preloader-content">
            <div class="spinner"></div>
            <p>Loading...</p>
        </div>
    `;
    
    Object.assign(preloader.style, {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        background: '#1f2937',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: '10000',
        transition: 'opacity 0.5s ease'
    });
    
    document.body.appendChild(preloader);
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(preloader);
            }, 500);
        }, 1000);
    });
}

const spinnerCSS = `
    .spinner {
        width: 40px;
        height: 40px;
        border: 4px solid rgba(99, 102, 241, 0.2);
        border-left: 4px solid #6366f1;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin-bottom: 1rem;
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    
    .preloader-content {
        text-align: center;
        color: #f9fafb;
    }
`;

const spinnerStyle = document.createElement('style');
spinnerStyle.textContent = spinnerCSS;
document.head.appendChild(spinnerStyle);

addPreloader();

console.log('Portfolio website loaded successfully! 🚀');
