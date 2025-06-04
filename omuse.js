// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Header scroll effect
const header = document.querySelector('.header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 50) {
        header.classList.remove('scroll-up');
        header.classList.remove('scroll-down');
        return;
    }

    if (currentScroll > lastScroll && currentScroll > 50) {
        header.classList.remove('scroll-up');
        header.classList.add('scroll-down');
    } else if (currentScroll < lastScroll) {
        header.classList.remove('scroll-down');
        header.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);
        const headerHeight = document.querySelector('.header').offsetHeight;

        if (target) {
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });

            // Close mobile menu after clicking a link
            const mobileSidebar = document.getElementById('mobileSidebar');
            if (mobileSidebar.classList.contains('open')) {
                closeSidebar();
            }
        }
    });
});

// Mobile Sidebar Toggle
const mobileSidebar = document.getElementById('mobileSidebar');
const sidebarOverlay = document.getElementById('sidebarOverlay');
const sidebarCloseBtn = document.getElementById('sidebarCloseBtn');
const mobileMenuIconBtn = document.querySelector('.mobile-menu-icon');

function openSidebar() {
    const sidebar = document.getElementById('mobileSidebar');
    const overlay = document.getElementById('sidebarOverlay');
    sidebar.classList.add('open');
    overlay.classList.add('show');
    document.body.style.overflow = 'hidden';

    // Animate menu items
    const menuItems = sidebar.querySelectorAll('.sidebar-menu li');
    menuItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(20px)';
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }, 100 * index);
    });
}

function closeSidebar() {
    const sidebar = document.getElementById('mobileSidebar');
    const overlay = document.getElementById('sidebarOverlay');

    // Animate menu items
    const menuItems = sidebar.querySelectorAll('.sidebar-menu li');
    menuItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(20px)';
    });

    setTimeout(() => {
        sidebar.classList.remove('open');
        overlay.classList.remove('show');
        document.body.style.overflow = '';
    }, 300);
}

if (mobileMenuIconBtn && mobileSidebar && sidebarOverlay && sidebarCloseBtn) {
    mobileMenuIconBtn.addEventListener('click', openSidebar);
    sidebarOverlay.addEventListener('click', closeSidebar);
    sidebarCloseBtn.addEventListener('click', closeSidebar);
}

// Close sidebar on ESC key press
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileSidebar.classList.contains('open')) {
        closeSidebar();
    }
});

// Footer social links hover effect
const socialLinks = document.querySelectorAll('.social-links a');
socialLinks.forEach(link => {
    link.addEventListener('mouseenter', () => {
        link.style.transform = 'translateY(-3px)';
    });
    link.addEventListener('mouseleave', () => {
        link.style.transform = 'translateY(0)';
    });
});

// Footer links hover effect
const footerLinks = document.querySelectorAll('.footer-section a');
footerLinks.forEach(link => {
    link.addEventListener('mouseenter', () => {
        link.style.transform = 'translateX(5px)';
    });
    link.addEventListener('mouseleave', () => {
        link.style.transform = 'translateX(0)';
    });
});

// FAQ Accordion
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    const icon = question.querySelector('.fa-chevron-down');

    question.addEventListener('click', () => {
        const isOpen = item.classList.contains('active');

        // Close all other items
        faqItems.forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('active');
                otherItem.querySelector('.faq-answer').style.maxHeight = null;
                otherItem.querySelector('.fa-chevron-down').style.transform = 'rotate(0deg)';
            }
        });

        // Toggle current item
        if (!isOpen) {
            item.classList.add('active');
            answer.style.maxHeight = answer.scrollHeight + 'px';
            icon.style.transform = 'rotate(180deg)';
        } else {
            item.classList.remove('active');
            answer.style.maxHeight = null;
            icon.style.transform = 'rotate(0deg)';
        }
    });
});

// Testimonial Slider
let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonial-card');
const totalTestimonials = testimonials.length;

function showTestimonial(index) {
    testimonials.forEach((testimonial, i) => {
        testimonial.style.opacity = i === index ? '1' : '0';
        testimonial.style.transform = i === index ? 'translateX(0)' : 'translateX(100%)';
    });
}

function nextTestimonial() {
    currentTestimonial = (currentTestimonial + 1) % totalTestimonials;
    showTestimonial(currentTestimonial);
}

// Auto-rotate testimonials
setInterval(nextTestimonial, 5000);

// Initialize first testimonial
showTestimonial(0);

// Utility Tags Animation
const utilityTags = document.querySelectorAll('.utility-tag');

utilityTags.forEach((tag, index) => {
    tag.style.animationDelay = `${index * 0.2}s`;
    tag.classList.add('animate-in');
});

// Stats Counter Animation
const stats = document.querySelectorAll('.stat-number');
let animated = false;

function animateStats() {
    if (animated) return;

    const statsSection = document.querySelector('.about-stats');
    const statsPosition = statsSection.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.3;

    if (statsPosition < screenPosition) {
        stats.forEach(stat => {
            const target = parseInt(stat.textContent);
            let count = 0;
            const duration = 2000;
            const increment = target / (duration / 16);

            const updateCount = () => {
                if (count < target) {
                    count += increment;
                    stat.textContent = Math.ceil(count) + (stat.textContent.includes('+') ? '+' : '');
                    requestAnimationFrame(updateCount);
                } else {
                    stat.textContent = target + (stat.textContent.includes('+') ? '+' : '');
                }
            };

            updateCount();
        });

        animated = true;
    }
}

window.addEventListener('scroll', animateStats);

// Feature Cards Animation
document.addEventListener('DOMContentLoaded', function() {
    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.feature-icon');
            const glow = this.querySelector('.icon-glow');
            const line = this.querySelector('.decoration-line');
            
            if (icon) icon.style.transform = 'scale(1.1)';
            if (glow) glow.style.opacity = '1';
            if (line) line.style.opacity = '1';
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.feature-icon');
            const glow = this.querySelector('.icon-glow');
            const line = this.querySelector('.decoration-line');
            
            if (icon) icon.style.transform = 'scale(1)';
            if (glow) glow.style.opacity = '0';
            if (line) line.style.opacity = '0';
        });
    });
});

// Contact Info Items Hover Effect
const contactItems = document.querySelectorAll('.info-item');

contactItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'translateY(-5px)';
        item.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.1)';
    });

    item.addEventListener('mouseleave', () => {
        item.style.transform = 'translateY(0)';
        item.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    });
}); 