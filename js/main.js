// ===== NAVBAR SCROLL EFFECT =====
window.addEventListener('scroll', function() {
  const navbar = document.querySelector('.navbar');
  const scrollTop = document.querySelector('.scroll-top');
  
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  // Scroll to top button
  if (scrollTop) {
    if (window.scrollY > 500) {
      scrollTop.classList.add('visible');
    } else {
      scrollTop.classList.remove('visible');
    }
  }
});

// ===== SCROLL TO TOP =====
document.addEventListener('DOMContentLoaded', function() {
  const scrollTopBtn = document.querySelector('.scroll-top');
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', function() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});

// ===== ANIMATE ON SCROLL =====
function animateOnScroll() {
  const elements = document.querySelectorAll('.animate-on-scroll');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('animated');
        }, index * 100);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  elements.forEach(el => observer.observe(el));
}
document.addEventListener('DOMContentLoaded', animateOnScroll);

// ===== LIGHTBOX GALLERY =====
let currentLightboxIndex = 0;
let galleryImages = [];

function openLightbox(index) {
  currentLightboxIndex = index;
  const overlay = document.getElementById('lightboxOverlay');
  const img = document.getElementById('lightboxImage');
  
  if (overlay && img && galleryImages.length > 0) {
    img.src = galleryImages[index].src;
    overlay.style.display = 'flex';
    setTimeout(() => overlay.classList.add('active'), 10);
    document.body.style.overflow = 'hidden';
  }
}

function closeLightbox() {
  const overlay = document.getElementById('lightboxOverlay');
  if (overlay) {
    overlay.classList.remove('active');
    setTimeout(() => {
      overlay.style.display = 'none';
      document.body.style.overflow = '';
    }, 300);
  }
}

function navigateLightbox(direction) {
  currentLightboxIndex += direction;
  if (currentLightboxIndex < 0) currentLightboxIndex = galleryImages.length - 1;
  if (currentLightboxIndex >= galleryImages.length) currentLightboxIndex = 0;
  
  const img = document.getElementById('lightboxImage');
  if (img) {
    img.style.opacity = '0';
    setTimeout(() => {
      img.src = galleryImages[currentLightboxIndex].src;
      img.style.opacity = '1';
    }, 200);
  }
}

document.addEventListener('DOMContentLoaded', function() {
  // Initialize gallery items
  const items = document.querySelectorAll('.gallery-item');
  items.forEach((item, index) => {
    const img = item.querySelector('img');
    if (img) {
      galleryImages.push({ src: img.src, alt: img.alt });
      item.addEventListener('click', () => openLightbox(index));
    }
  });

  // Lightbox controls
  const overlay = document.getElementById('lightboxOverlay');
  if (overlay) {
    overlay.addEventListener('click', function(e) {
      if (e.target === overlay) closeLightbox();
    });
  }

  // Keyboard navigation
  document.addEventListener('keydown', function(e) {
    const overlay = document.getElementById('lightboxOverlay');
    if (overlay && overlay.classList.contains('active')) {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') navigateLightbox(-1);
      if (e.key === 'ArrowRight') navigateLightbox(1);
    }
  });
});

// ===== GALLERY FILTER =====
document.addEventListener('DOMContentLoaded', function() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  
  filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      filterBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      
      const filter = this.dataset.filter;
      galleryItems.forEach(item => {
        if (filter === 'all' || item.dataset.category === filter) {
          item.style.display = 'block';
          item.style.animation = 'fadeInUp 0.5s ease';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
});

// ===== COUNTER ANIMATION =====
function animateCounters() {
  const counters = document.querySelectorAll('.counter');
  counters.forEach(counter => {
    const target = parseInt(counter.dataset.target);
    const suffix = counter.dataset.suffix || '';
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    const updateCounter = () => {
      current += step;
      if (current < target) {
        counter.textContent = Math.floor(current) + suffix;
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target + suffix;
      }
    };
    updateCounter();
  });
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounters();
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', function() {
  const counterSection = document.querySelector('.hero-stats');
  if (counterSection) counterObserver.observe(counterSection);
});

// ===== ACTIVE NAV LINK =====
document.addEventListener('DOMContentLoaded', function() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
});

// ===== FORM VALIDATION =====
document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('reservationForm');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const nama = document.getElementById('nama').value;
      const tanggal = document.getElementById('tanggal').value;
      const mobil = document.getElementById('mobil').value;
      const pesan = document.getElementById('pesan').value;
      
      const waNumber = '6281234567890';
      const waMessage = `Halo, saya ingin reservasi rental mobil.%0A%0ANama: ${nama}%0ATanggal Sewa: ${tanggal}%0AJenis Mobil: ${mobil}%0APesan: ${pesan}`;
      
      window.open(`https://wa.me/${waNumber}?text=${waMessage}`, '_blank');
    });
  }
});
