/**
 * BrightSmile Dental — script.js
 * All interactivity: header scroll, mobile nav, scroll animations,
 * count-up counters, before/after sliders, testimonials carousel,
 * FAQ accordion, contact form validation, and smooth scroll.
 *
 * Vanilla JS only — no dependencies required.
 */

(function () {
  'use strict';

  /* ------------------------------------------------------------------ */
  /* 1. HEADER — Transparent → Solid on scroll                          */
  /* ------------------------------------------------------------------ */
  const header = document.getElementById('header');

  function updateHeader() {
    if (!header) return;
    if (window.scrollY > 70) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader(); // Run immediately on page load

  /* ------------------------------------------------------------------ */
  /* 2. MOBILE NAV — Open / Close overlay                               */
  /* ------------------------------------------------------------------ */
  const hamburger    = document.querySelector('.hamburger');
  const mobileNav    = document.querySelector('.mobile-nav');
  const navCloseBtn  = document.querySelector('.mobile-nav-close');
  const mobileLinks  = document.querySelectorAll('.mobile-nav a');

  function openNav() {
    mobileNav.classList.add('open');
    hamburger.classList.add('active');
    document.body.style.overflow = 'hidden';
    hamburger.setAttribute('aria-expanded', 'true');
  }

  function closeNav() {
    mobileNav.classList.remove('open');
    hamburger.classList.remove('active');
    document.body.style.overflow = '';
    hamburger.setAttribute('aria-expanded', 'false');
  }

  hamburger?.addEventListener('click', openNav);
  navCloseBtn?.addEventListener('click', closeNav);
  mobileLinks.forEach(link => link.addEventListener('click', closeNav));

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileNav?.classList.contains('open')) closeNav();
  });

  /* ------------------------------------------------------------------ */
  /* 3. SCROLL-TRIGGERED ANIMATIONS                                      */
  /*    .fade-in, .fade-in-left, .fade-in-right, .stagger              */
  /* ------------------------------------------------------------------ */
  const animEls = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right, .stagger');

  const animObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  animEls.forEach((el) => animObserver.observe(el));

  /* ------------------------------------------------------------------ */
  /* 4. COUNT-UP ANIMATIONS for Trust Bar                               */
  /* ------------------------------------------------------------------ */
  const countEls = document.querySelectorAll('[data-count]');
  let countersPlayed = false;

  function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  function animateCounter(el) {
    const target   = parseFloat(el.dataset.count);
    const suffix   = el.dataset.suffix || '';
    const prefix   = el.dataset.prefix || '';
    const isDecimal = target % 1 !== 0;
    const duration  = 2200;
    const startTime = performance.now();

    function tick(now) {
      const elapsed  = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased    = easeOutCubic(progress);
      const value    = target * eased;
      el.textContent = prefix + (isDecimal ? value.toFixed(1) : Math.floor(value)) + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }

  const trustSection = document.getElementById('trust');
  if (trustSection) {
    const trustObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !countersPlayed) {
          countersPlayed = true;
          countEls.forEach(animateCounter);
        }
      },
      { threshold: 0.25 }
    );
    trustObserver.observe(trustSection);
  }

  /* ------------------------------------------------------------------ */
  /* 5. BEFORE / AFTER SLIDERS                                          */
  /* ------------------------------------------------------------------ */
  document.querySelectorAll('.ba-slider').forEach((slider) => {
    const afterEl   = slider.querySelector('.ba-after');
    const divider   = slider.querySelector('.ba-divider-line');
    const handleEl  = slider.querySelector('.ba-handle-btn');
    let isDragging  = false;

    function setSliderPercent(clientX) {
      const rect    = slider.getBoundingClientRect();
      let pct       = ((clientX - rect.left) / rect.width) * 100;
      pct           = Math.max(3, Math.min(97, pct));
      const pctStr  = pct + '%';

      afterEl.style.clipPath  = `inset(0 ${100 - pct}% 0 0)`;
      divider.style.left      = pctStr;
      handleEl.style.left     = pctStr;
    }

    // Mouse
    slider.addEventListener('mousedown', (e) => {
      isDragging = true;
      setSliderPercent(e.clientX);
      e.preventDefault();
    });

    document.addEventListener('mousemove', (e) => {
      if (isDragging) setSliderPercent(e.clientX);
    });

    document.addEventListener('mouseup', () => { isDragging = false; });

    // Touch
    slider.addEventListener('touchstart', (e) => {
      isDragging = true;
      setSliderPercent(e.touches[0].clientX);
    }, { passive: true });

    document.addEventListener('touchmove', (e) => {
      if (isDragging) setSliderPercent(e.touches[0].clientX);
    }, { passive: true });

    document.addEventListener('touchend', () => { isDragging = false; });
  });

  /* ------------------------------------------------------------------ */
  /* 6. TESTIMONIALS CAROUSEL                                           */
  /* ------------------------------------------------------------------ */
  const track       = document.querySelector('.testimonials-track');
  const dots        = document.querySelectorAll('.c-dot');
  const totalSlides = dots.length;
  let current       = 0;
  let autoTimer     = null;

  function goTo(idx) {
    current = ((idx % totalSlides) + totalSlides) % totalSlides;
    if (track) track.style.transform = `translateX(-${current * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === current));
  }

  function startAuto() {
    stopAuto();
    if (totalSlides > 1) autoTimer = setInterval(() => goTo(current + 1), 5500);
  }

  function stopAuto() {
    clearInterval(autoTimer);
  }

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => { goTo(i); startAuto(); });
  });

  const testimonialsSec = document.getElementById('testimonials');
  testimonialsSec?.addEventListener('mouseenter', stopAuto);
  testimonialsSec?.addEventListener('mouseleave', startAuto);

  if (totalSlides > 0) {
    goTo(0);
    startAuto();
  }

  /* ------------------------------------------------------------------ */
  /* 7. FAQ ACCORDION                                                   */
  /* ------------------------------------------------------------------ */
  document.querySelectorAll('.faq-trigger').forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const item   = trigger.closest('.faq-item');
      const isOpen = item.classList.contains('open');

      // Close all open items
      document.querySelectorAll('.faq-item.open').forEach((openItem) => {
        openItem.classList.remove('open');
        openItem.querySelector('.faq-trigger').setAttribute('aria-expanded', 'false');
      });

      // Toggle clicked item
      if (!isOpen) {
        item.classList.add('open');
        trigger.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* ------------------------------------------------------------------ */
  /* 8. APPOINTMENT FORM VALIDATION & SUBMISSION                        */
  /* ------------------------------------------------------------------ */
  const apptForm = document.getElementById('appt-form');

  if (apptForm) {
    // Live validation
    apptForm.querySelectorAll('input, textarea').forEach((input) => {
      input.addEventListener('blur', () => validateField(input));
      input.addEventListener('input', () => {
        const group = input.closest('.form-group');
        if (group?.classList.contains('has-error')) validateField(input);
      });
    });

    apptForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const isValid = validateAll();

      if (isValid) {
        const btn  = apptForm.querySelector('[type="submit"]');
        const orig = btn.innerHTML;
        btn.innerHTML  = '✓ &nbsp;Appointment Request Sent!';
        btn.disabled   = true;
        btn.style.background = '#10B981';
        btn.style.boxShadow  = '0 8px 24px rgba(16,185,129,0.35)';
        apptForm.reset();
        clearAllErrors();

        setTimeout(() => {
          btn.innerHTML       = orig;
          btn.disabled        = false;
          btn.style.background = '';
          btn.style.boxShadow  = '';
        }, 6000);
      }
    });
  }

  function getFieldRule(id) {
    const rules = {
      'f-name':    { test: v => v.trim().length >= 2,                    msg: 'Please enter your full name.' },
      'f-email':   { test: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()), msg: 'Please enter a valid email address.' },
      'f-phone':   { test: v => v.replace(/\D/g,'').length >= 10,        msg: 'Please enter a valid 10-digit phone number.' },
    };
    return rules[id] || null;
  }

  function validateField(input) {
    const rule  = getFieldRule(input.id);
    if (!rule) return true;
    const group = input.closest('.form-group');
    const errEl = group?.querySelector('.field-error');
    const pass  = rule.test(input.value);

    if (!pass) {
      group?.classList.add('has-error');
      if (errEl) errEl.textContent = rule.msg;
    } else {
      group?.classList.remove('has-error');
    }
    return pass;
  }

  function validateAll() {
    let allValid = true;
    ['f-name', 'f-email', 'f-phone'].forEach((id) => {
      const input = apptForm?.querySelector(`#${id}`);
      if (input && !validateField(input)) allValid = false;
    });
    return allValid;
  }

  function clearAllErrors() {
    apptForm?.querySelectorAll('.form-group.has-error').forEach((g) => g.classList.remove('has-error'));
  }

  /* ------------------------------------------------------------------ */
  /* 9. SMOOTH SCROLL for all anchor links                              */
  /* ------------------------------------------------------------------ */
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('href');
      if (id === '#') return;
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        const top = target.getBoundingClientRect().top + window.scrollY - 78;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ------------------------------------------------------------------ */
  /* 10. ACTIVE NAV HIGHLIGHT on scroll                                 */
  /* ------------------------------------------------------------------ */
  const navLinks = document.querySelectorAll('.nav a[href^="#"]');
  const sections = Array.from(navLinks)
    .map((a) => document.querySelector(a.getAttribute('href')))
    .filter(Boolean);

  const navHighlightObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach((a) => {
            const isActive = a.getAttribute('href') === `#${id}`;
            a.style.fontWeight = isActive ? '700' : '500';
          });
        }
      });
    },
    { threshold: 0.35, rootMargin: '-80px 0px 0px 0px' }
  );

  sections.forEach((sec) => navHighlightObserver.observe(sec));

  /* ------------------------------------------------------------------ */
  /* Done                                                               */
  /* ------------------------------------------------------------------ */
  console.log('%c🦷 BrightSmile Dental', 'font-size:1.25rem;font-weight:bold;color:#0077B6;');
  console.log('Demo template loaded — replace [TODO] placeholders with real content.');
})();
