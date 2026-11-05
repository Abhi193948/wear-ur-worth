/* ===================================================================
   NAIL OVER MALE - By wear-ur-worth | Professional Nail Artistry & Extensions
   Interactive JavaScript
   =================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initGalleryFilter();
  initLightbox();
  initFaqAccordion();
  initBookingForms();
  initBackToTop();
  highlightActiveNav();
});

/* --------------------------------------------------
   1. NAVBAR & MOBILE DRAWER
   -------------------------------------------------- */
function initNavbar() {
  const header = document.querySelector('.main-header');
  const toggleBtn = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const closeBtn = document.querySelector('.mobile-nav-close');
  const navLinks = document.querySelectorAll('.nav-link');

  // Sticky header on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  });

  // Mobile toggle
  if (toggleBtn && navMenu) {
    toggleBtn.addEventListener('click', () => {
      navMenu.classList.add('open');
      document.body.style.overflow = 'hidden';
    });

    const closeNav = () => {
      navMenu.classList.remove('open');
      document.body.style.overflow = '';
    };

    if (closeBtn) closeBtn.addEventListener('click', closeNav);

    navLinks.forEach(link => {
      link.addEventListener('click', closeNav);
    });

    // Close when clicking outside on mobile
    document.addEventListener('click', (e) => {
      if (navMenu.classList.contains('open') && 
          !navMenu.contains(e.target) && 
          !toggleBtn.contains(e.target)) {
        closeNav();
      }
    });
  }
}

/* --------------------------------------------------
   2. HIGHLIGHT ACTIVE NAV ITEM
   -------------------------------------------------- */
function highlightActiveNav() {
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;
    
    // Normalize path comparison
    if (currentPath.endsWith(href) || 
       (href === 'index.html' && (currentPath.endsWith('/') || currentPath === '')) ||
       (currentPath.includes(href) && href !== 'index.html')) {
      link.classList.add('active');
    }
  });
}

/* --------------------------------------------------
   3. GALLERY CATEGORY FILTER
   -------------------------------------------------- */
function initGalleryFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  if (!filterBtns.length || !galleryItems.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      galleryItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        if (filterValue === 'all' || itemCategory === filterValue) {
          item.style.display = 'block';
          item.style.animation = 'fadeInUp 0.4s ease forwards';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

/* --------------------------------------------------
   4. LIGHTBOX MODAL
   -------------------------------------------------- */
function initLightbox() {
  const lightbox = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxBookBtn = document.getElementById('lightboxBookBtn');
  const closeBtn = document.querySelector('.lightbox-close');
  const viewBtns = document.querySelectorAll('.view-lightbox-btn');

  if (!lightbox) return;

  viewBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const parentItem = btn.closest('.gallery-item');
      if (!parentItem) return;

      const img = parentItem.querySelector('img');
      const title = parentItem.querySelector('h4')?.textContent || 'Luxury Nail Art';
      const imgSrc = img?.getAttribute('src');

      if (lightboxImg && imgSrc) lightboxImg.src = imgSrc;
      if (lightboxTitle) lightboxTitle.textContent = title;

      if (lightboxBookBtn) {
        const message = encodeURIComponent(`Hi wear-ur-worth, I loved this nail design "${title}" on your website gallery. I'd like to book an appointment for this look!`);
        lightboxBookBtn.href = `https://wa.me/919625649292?text=${message}`;
      }

      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  const closeLightbox = () => {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  };

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('open')) {
      closeLightbox();
    }
  });
}

/* --------------------------------------------------
   5. FAQ ACCORDION
   -------------------------------------------------- */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    if (!questionBtn || !answer) return;

    questionBtn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all other items
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
          const otherAnswer = otherItem.querySelector('.faq-answer');
          if (otherAnswer) otherAnswer.style.maxHeight = null;
        }
      });

      if (isActive) {
        item.classList.remove('active');
        answer.style.maxHeight = null;
      } else {
        item.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });
}

/* --------------------------------------------------
   6. BOOKING FORMS & WHATSAPP INTEGRATION
   -------------------------------------------------- */
function initBookingForms() {
  const bookingForms = document.querySelectorAll('.appointment-form');

  bookingForms.forEach(form => {
    const whatsappBtn = form.querySelector('.btn-submit-whatsapp');
    const normalSubmitBtn = form.querySelector('.btn-submit-form');

    // Helper to get formatted data
    const getFormData = () => {
      const name = form.querySelector('[name="client_name"]')?.value.trim() || '';
      const phone = form.querySelector('[name="client_phone"]')?.value.trim() || '';
      const email = form.querySelector('[name="client_email"]')?.value.trim() || '';
      const service = form.querySelector('[name="service_type"]')?.value || 'Nail Art / Extensions';
      const date = form.querySelector('[name="preferred_date"]')?.value || 'Flexible';
      const time = form.querySelector('[name="preferred_time"]')?.value || 'Anytime';
      const notes = form.querySelector('[name="special_notes"]')?.value.trim() || 'None';

      return { name, phone, email, service, date, time, notes };
    };

    // Helper for validation
    const validateBasic = (data) => {
      if (!data.name) {
        showToast('Please enter your full name');
        return false;
      }
      if (!data.phone || data.phone.length < 10) {
        showToast('Please enter a valid 10-digit phone number');
        return false;
      }
      return true;
    };

    // WhatsApp Direct Send Button
    if (whatsappBtn) {
      whatsappBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const data = getFormData();
        if (!validateBasic(data)) return;

        const text = `*New Appointment Inquiry - wear-ur-worth*%0A%0A` +
          `👤 *Name:* ${encodeURIComponent(data.name)}%0A` +
          `📞 *Phone:* ${encodeURIComponent(data.phone)}%0A` +
          (data.email ? `📧 *Email:* ${encodeURIComponent(data.email)}%0A` : '') +
          `💅 *Service:* ${encodeURIComponent(data.service)}%0A` +
          `📅 *Preferred Date:* ${encodeURIComponent(data.date)}%0A` +
          `⏰ *Preferred Time:* ${encodeURIComponent(data.time)}%0A` +
          (data.notes !== 'None' ? `📝 *Notes:* ${encodeURIComponent(data.notes)}%0A` : '') +
          `%0A_Sent via wear-ur-worth Website_`;

        window.open(`https://wa.me/919625649292?text=${text}`, '_blank');
        showToast('Opening WhatsApp with your booking details...');
      });
    }

    // Standard Submit Button
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = getFormData();
      if (!validateBasic(data)) return;

      // Simulated success feedback
      showToast('Thank you! wear-ur-worth will call you back shortly.');
      form.reset();
    });
  });
}

/* --------------------------------------------------
   7. BACK TO TOP
   -------------------------------------------------- */
function initBackToTop() {
  const backBtn = document.querySelector('.back-to-top');
  if (!backBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backBtn.classList.add('show');
    } else {
      backBtn.classList.remove('show');
    }
  });

  backBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* --------------------------------------------------
   8. TOAST NOTIFICATION UTILITY
   -------------------------------------------------- */
function showToast(message, duration = 3500) {
  let toast = document.querySelector('.toast-notice');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast-notice';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `<i class="fa-solid fa-circle-check"></i> <span>${message}</span>`;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, duration);
}
