/**
 * Tarun Kumar, Advocate - Premium Law Portfolio Interactive Script
 * Handles Navigation, Chamber Themes, Particle Dust Canvas, 3D Tilt & Toast Alerts
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- 1. Scroll Progress Bar ---
  const progressBar = document.getElementById('scroll-progress');
  window.addEventListener('scroll', () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
    if (progressBar) {
      progressBar.style.width = `${progress}%`;
    }
  }, { passive: true });

  // --- 2. Sticky Navbar & Active Section Tracking ---
  const siteNav = document.getElementById('site-nav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      siteNav.classList.add('scrolled');
    } else {
      siteNav.classList.remove('scrolled');
    }
  }, { passive: true });

  // Active Navigation Link Highlighting on Scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { threshold: 0.35, rootMargin: '-70px 0px -40% 0px' });

  sections.forEach(sec => navObserver.observe(sec));

  // --- 3. Mobile Navigation Drawer ---
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');

  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.toggle('open');
      mobileToggle.classList.toggle('active', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    mobileDrawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
        mobileToggle.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  // --- 4. Toast Notification Utility ---
  const toastAlert = document.getElementById('toast-alert');
  const toastText = document.getElementById('toast-text');

  function showToast(message) {
    if (!toastAlert || !toastText) return;
    toastText.textContent = message;
    toastAlert.classList.add('show');
    setTimeout(() => {
      toastAlert.classList.remove('show');
    }, 4000);
  }

  // --- 5. Interactive Legal Chamber Theme Switcher ---
  const themeBtn = document.getElementById('theme-btn');
  const themeDropdown = document.getElementById('theme-dropdown');
  const themeLabel = document.getElementById('theme-btn-label');
  const themeOptions = document.querySelectorAll('.theme-option-btn');

  const themeNames = {
    'navy-gold': 'Navy & Gold',
    'oxford-mahogany': 'Oxford Mahogany',
    'emerald-justice': 'Emerald Justice',
    'midnight-platinum': 'Midnight Platinum'
  };

  if (themeBtn && themeDropdown) {
    themeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      themeDropdown.classList.toggle('show');
    });

    document.addEventListener('click', (e) => {
      if (!themeDropdown.contains(e.target) && e.target !== themeBtn) {
        themeDropdown.classList.remove('show');
      }
    });

    themeOptions.forEach(opt => {
      opt.addEventListener('click', () => {
        themeOptions.forEach(o => o.classList.remove('active'));
        opt.classList.add('active');

        const theme = opt.dataset.theme;
        if (theme === 'navy-gold') {
          document.documentElement.removeAttribute('data-theme');
        } else {
          document.documentElement.setAttribute('data-theme', theme);
        }

        if (themeLabel && themeNames[theme]) {
          themeLabel.textContent = themeNames[theme];
        }

        themeDropdown.classList.remove('show');
        showToast(`Chamber Theme switched to ${themeNames[theme] || 'Custom'}`);
      });
    });
  }

  // --- 6. Interactive Contact Form Submission ---
  const contactForm = document.getElementById('contact-form');
  const submitBtn = document.getElementById('submit-form-btn');

  if (contactForm && submitBtn) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('form-name').value.trim();
      const email = document.getElementById('form-email').value.trim();
      const phone = document.getElementById('form-phone').value.trim();
      const subject = document.getElementById('form-subject').value.trim();
      const message = document.getElementById('form-message').value.trim();

      if (!name || !email || !message) {
        showToast('Please fill in all required fields.');
        return;
      }

      // Email format check
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        showToast('Please enter a valid email address.');
        return;
      }

      // Button loading state
      const originalBtnText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg style="animation: spin 1s linear infinite; width: 16px; height: 16px; margin-right: 8px;" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none" opacity="0.3"></circle>
          <path d="M4 12a8 8 0 018-8" stroke="currentColor" stroke-width="4" fill="none"></path>
        </svg>
        Sending Inquiry...
      `;

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
        contactForm.reset();
        showToast('Thank you, ' + name + '. Your inquiry has been dispatched to Advocate Tarun Kumar’s office.');
      }, 1200);
    });
  }

  // --- 7. Quick Action Triggers ---
  const btnQuickCall = document.getElementById('btn-quick-call');
  if (btnQuickCall) {
    btnQuickCall.addEventListener('click', () => {
      showToast('Initiating call to Advocate Tarun Kumar (+91 9053799009)...');
    });
  }

  const btnQuickEmail = document.getElementById('btn-quick-email');
  if (btnQuickEmail) {
    btnQuickEmail.addEventListener('click', () => {
      showToast('Opening email client for office.tarunlegal@gmail.com...');
    });
  }

  // --- 8. Realistic 3D Tilt Card & Specular Light Glare ---
  const tiltCards = document.querySelectorAll('.tilt-card-luxury');
  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -5; // max 5 deg tilt
      const rotateY = ((x - centerX) / centerX) * 5;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px)`;
      
      const posX = ((x / rect.width) * 100).toFixed(1);
      const posY = ((y / rect.height) * 100).toFixed(1);
      card.style.setProperty('--mouse-x', `${posX}%`);
      card.style.setProperty('--mouse-y', `${posY}%`);
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    });
  });

  // --- 9. Scroll Reveal Animation via IntersectionObserver ---
  const revealElements = document.querySelectorAll(
    '.about-facts-card, .timeline-card, .achievement-card, .skill-card, .insight-card, .contact-info-panel, .contact-form-panel'
  );

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
    revealObserver.observe(el);
  });

  // --- 10. Golden Stardust Particles Canvas in Hero ---
  const canvas = document.getElementById('particles-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = canvas.width = canvas.offsetWidth;
    let height = canvas.height = canvas.offsetHeight;

    window.addEventListener('resize', () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    });

    const particles = [];
    const particleCount = 42;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2.2 + 0.6,
        speedY: Math.random() * 0.4 + 0.15,
        speedX: (Math.random() - 0.5) * 0.25,
        opacity: Math.random() * 0.6 + 0.2,
        pulsing: Math.random() * 0.02 + 0.01
      });
    }

    function animateParticles() {
      ctx.clearRect(0, 0, width, height);

      particles.forEach(p => {
        p.y -= p.speedY;
        p.x += p.speedX;
        p.opacity += Math.sin(Date.now() * 0.002) * p.pulsing;

        if (p.y < 0) {
          p.y = height + 5;
          p.x = Math.random() * width;
        }
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(223, 183, 108, ${Math.max(0.1, Math.min(0.8, p.opacity))})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = '#dfb76c';
        ctx.fill();
      });

      requestAnimationFrame(animateParticles);
    }

    animateParticles();
  }
});
