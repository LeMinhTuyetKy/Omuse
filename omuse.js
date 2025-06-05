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

    const statsSection = document.querySelector('.stats-section');
    if (!statsSection) return;

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
    const featuresGrid = document.querySelector('.features-grid');
    
    if (featuresGrid) {
        let isDown = false;
        let startX;
        let scrollLeft;

        featuresGrid.addEventListener('mousedown', (e) => {
            isDown = true;
            featuresGrid.style.cursor = 'grabbing';
            startX = e.pageX - featuresGrid.offsetLeft;
            scrollLeft = featuresGrid.scrollLeft;
        });

        featuresGrid.addEventListener('mouseleave', () => {
            isDown = false;
            featuresGrid.style.cursor = 'grab';
        });

        featuresGrid.addEventListener('mouseup', () => {
            isDown = false;
            featuresGrid.style.cursor = 'grab';
        });

        featuresGrid.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - featuresGrid.offsetLeft;
            const walk = (x - startX) * 2;
            featuresGrid.scrollLeft = scrollLeft - walk;
        });

        // Touch events for mobile
        featuresGrid.addEventListener('touchstart', (e) => {
            isDown = true;
            startX = e.touches[0].pageX - featuresGrid.offsetLeft;
            scrollLeft = featuresGrid.scrollLeft;
        });

        featuresGrid.addEventListener('touchend', () => {
            isDown = false;
        });

        featuresGrid.addEventListener('touchmove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.touches[0].pageX - featuresGrid.offsetLeft;
            const walk = (x - startX) * 2;
            featuresGrid.scrollLeft = scrollLeft - walk;
        });
    }
    
    featureCards.forEach(card => {
        // Add hover effect
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 12px 30px rgba(0, 0, 0, 0.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.05)';
        });

        // Add scroll animation
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, {
            threshold: 0.1
        });

        observer.observe(card);
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

// Footer Accordion
document.addEventListener('DOMContentLoaded', function() {
    const footerSections = document.querySelectorAll('.footer-section');
    
    footerSections.forEach(section => {
        const heading = section.querySelector('h3');
        
        heading.addEventListener('click', () => {
            // Close other sections
            footerSections.forEach(otherSection => {
                if (otherSection !== section && otherSection.classList.contains('active')) {
                    otherSection.classList.remove('active');
                }
            });
            
            // Toggle current section
            section.classList.toggle('active');
        });
    });
}); 

// Initialize AOS
AOS.init({
    duration: 800,
    once: true
});

// Cherry Blossom Effect
function createPetals() {
    const container = document.querySelector('.cherry-blossoms');
    let activePetals = 0;
    const maxActivePetals = 12; // Số lượng cánh hoa tối đa
    const petalsPerGroup = 3; // Số cánh hoa mỗi nhóm

    function createPetalGroup() {
        if (activePetals >= maxActivePetals) return;

        // Tạo một nhóm cánh hoa
        for (let i = 0; i < petalsPerGroup; i++) {
            if (activePetals >= maxActivePetals) break;

            const petal = document.createElement('div');
            petal.classList.add('petal');
            
            // Tạo vị trí ngẫu nhiên theo chiều ngang
            const startX = Math.random() * window.innerWidth;
            petal.style.left = `${startX}px`;
            petal.style.top = '-20px';
            
            // Tạo tốc độ rơi ngẫu nhiên
            const duration = 6 + Math.random() * 4; // 6-10 giây
            const delay = Math.random() * 2; // 0-2 giây delay
            
            petal.style.animationDuration = `${duration}s`;
            petal.style.animationDelay = `${delay}s`;
            
            container.appendChild(petal);
            activePetals++;

            // Xóa cánh hoa sau khi animation hoàn thành
            setTimeout(() => {
                if (petal.parentNode) {
                    petal.remove();
                    activePetals--;
                }
            }, (duration + delay) * 1000);
        }
    }

    // Tạo nhóm cánh hoa đầu tiên
    createPetalGroup();

    // Tạo nhóm cánh hoa mới mỗi 2 giây
    setInterval(createPetalGroup, 2000);
}

// Chạy hiệu ứng khi trang load
document.addEventListener('DOMContentLoaded', createPetals);

// Mobile Menu Toggle
document.querySelector('.mobile-menu-icon').addEventListener('click', () => {
    document.querySelector('.mobile-sidebar').classList.add('active');
    document.querySelector('.sidebar-overlay').classList.add('active');
});

document.querySelector('#sidebarCloseBtn').addEventListener('click', () => {
    document.querySelector('.mobile-sidebar').classList.remove('active');
    document.querySelector('.sidebar-overlay').classList.remove('active');
});