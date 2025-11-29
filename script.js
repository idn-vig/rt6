// ==================== //
// LOADING SCREEN
// ==================== //
window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loadingScreen');
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
    }, 1800);
});

// ==================== //
// BACK TO TOP BUTTON
// ==================== //
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ==================== //
// MOBILE MENU TOGGLE
// ==================== //
const navToggle = document.getElementById('navToggle');
const mobileMenu = document.getElementById('mobileMenu');

navToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    const icon = navToggle.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        navToggle.querySelector('i').classList.add('fa-bars');
        navToggle.querySelector('i').classList.remove('fa-times');
    });
});

// ==================== //
// NAVBAR SCROLL EFFECT
// ==================== //
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 5px 30px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// ==================== //
// SMOOTH SCROLL
// ==================== //
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ==================== //
// IURAN STATUS GRID
// ==================== //
const statusGrid = document.getElementById('statusGrid');

// Data warga (dummy)
const wargaData = [
    { nama: 'Pak Ahmad', status: 'paid' },
    { nama: 'Bu Sri', status: 'paid' },
    { nama: 'Pak Budi', status: 'paid' },
    { nama: 'Bu Dewi', status: 'paid' },
    { nama: 'Pak Joko', status: 'paid' },
    { nama: 'Bu Siti', status: 'paid' },
    { nama: 'Pak Agus', status: 'paid' },
    { nama: 'Bu Rina', status: 'paid' },
    { nama: 'Pak Dedi', status: 'paid' },
    { nama: 'Bu Ani', status: 'paid' },
    { nama: 'Pak Heru', status: 'paid' },
    { nama: 'Bu Lina', status: 'paid' },
    { nama: 'Pak Eko', status: 'paid' },
    { nama: 'Bu Yuni', status: 'paid' },
    { nama: 'Pak Rudi', status: 'paid' },
    { nama: 'Bu Wati', status: 'paid' },
    { nama: 'Pak Surya', status: 'paid' },
    { nama: 'Bu Mega', status: 'paid' },
    { nama: 'Pak Indra', status: 'paid' },
    { nama: 'Bu Ratna', status: 'paid' },
    { nama: 'Pak Wahyu', status: 'paid' },
    { nama: 'Bu Tuti', status: 'paid' },
    { nama: 'Pak Bambang', status: 'paid' },
    { nama: 'Bu Ida', status: 'paid' },
    { nama: 'Pak Slamet', status: 'paid' },
    { nama: 'Bu Ningsih', status: 'paid' },
    { nama: 'Pak Teguh', status: 'paid' },
    { nama: 'Bu Lastri', status: 'paid' },
    { nama: 'Pak Didik', status: 'unpaid' },
    { nama: 'Bu Sumini', status: 'unpaid' },
    { nama: 'Pak Yanto', status: 'unpaid' },
    { nama: 'Bu Karni', status: 'unpaid' },
    { nama: 'Pak Sugeng', status: 'unpaid' },
    { nama: 'Bu Parti', status: 'unpaid' },
    { nama: 'Pak Tono', status: 'unpaid' }
];

function renderStatusGrid() {
    if (statusGrid) {
        statusGrid.innerHTML = wargaData.map(warga => `
            <div class="status-item ${warga.status}">
                <i class="fas ${warga.status === 'paid' ? 'fa-check-circle' : 'fa-times-circle'}"></i>
                <span>${warga.nama}</span>
            </div>
        `).join('');
    }
}

renderStatusGrid();

// ==================== //
// NUMBER COUNTER ANIMATION
// ==================== //
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const originalText = counter.textContent;
        const hasPlus = originalText.includes('+');
        const hasPercent = originalText.includes('%');
        const target = parseInt(originalText.replace(/[^0-9]/g, ''));
        const duration = 2000;
        let startTime = null;
        
        const updateCounter = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            
            // Easing function for smooth animation
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const current = Math.floor(target * easeOutQuart);
            
            let displayValue = current.toString();
            if (hasPlus) displayValue += '+';
            if (hasPercent) displayValue += '%';
            
            counter.textContent = displayValue;
            counter.classList.add('counting');
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = originalText;
                counter.classList.remove('counting');
            }
        };
        
        // Start animation when element is in viewport
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    requestAnimationFrame(updateCounter);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(counter);
    });
}

// ==================== //
// FORM SUBMISSION
// ==================== //
const laporForm = document.getElementById('laporForm');

if (laporForm) {
    laporForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(laporForm);
        
        // Show success message
        alert('Laporan berhasil dikirim! Pengurus RT akan segera menindaklanjuti.');
        
        // Reset form
        laporForm.reset();
    });
}

// ==================== //
// SCROLL REVEAL ANIMATION
// ==================== //
function revealOnScroll() {
    // Reveal cards with stagger effect
    const revealCards = document.querySelectorAll('.reveal-card');
    revealCards.forEach((card, index) => {
        const cardTop = card.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (cardTop < windowHeight - 100) {
            setTimeout(() => {
                card.classList.add('revealed');
            }, index * 100);
        }
    });
    
    // Reveal section headers
    const sectionHeaders = document.querySelectorAll('.section-header');
    sectionHeaders.forEach(header => {
        const headerTop = header.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (headerTop < windowHeight - 50) {
            header.classList.add('visible');
        }
    });
    
    // Original card reveals
    const elements = document.querySelectorAll('.kas-card, .iuran-card, .tatatertib-card, .pengurus-card');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Initial styles for animation
document.querySelectorAll('.kas-card, .iuran-card, .tatatertib-card, .pengurus-card').forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
});

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', () => {
    setTimeout(revealOnScroll, 100);
});

// ==================== //
// PARALLAX EFFECT
// ==================== //
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    
    // Parallax for floating icons
    const floatingIcons = document.querySelectorAll('.floating-icon');
    floatingIcons.forEach((icon, index) => {
        const speed = 0.05 + (index * 0.01);
        icon.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// ==================== //
// ACTIVE NAV LINK
// ==================== //
const sections = document.querySelectorAll('section[id]');

function setActiveNav() {
    const scrollY = window.scrollY;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', setActiveNav);

// ==================== //
// KAS TABLE FILTER
// ==================== //
const filterBulan = document.getElementById('filterBulan');

if (filterBulan) {
    filterBulan.addEventListener('change', (e) => {
        const bulan = e.target.value;
        // In real app, this would fetch data from server
        console.log(`Loading data for month: ${bulan}`);
        // For now, just show alert
        // alert(`Memuat data bulan ${e.target.options[e.target.selectedIndex].text}`);
    });
}

// ==================== //
// INITIALIZE
// ==================== //
document.addEventListener('DOMContentLoaded', () => {
    animateCounters();
    
    // Delay reveal to let loading screen finish
    setTimeout(() => {
        revealOnScroll();
    }, 2000);
});

// ==================== //
// TILT EFFECT ON CARDS
// ==================== //
document.querySelectorAll('.kas-card, .pengumuman-card, .pengurus-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// ==================== //
// MAGNETIC BUTTON EFFECT
// ==================== //
document.querySelectorAll('.btn-primary, .btn-secondary, .btn-submit').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        btn.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
    });
    
    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0, 0)';
    });
});
