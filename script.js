(() => {
  'use strict';

  /* ── 1. CUSTOM CURSOR ───────────────────────
     ✅ FIX: JS now sends raw clientX/Y (top-left anchor).
     CSS handles centering via negative margin — this way
     when CSS expands the cursor on hover (32px → 50px),
     it stays perfectly centered without any JS recalculation.
     Only runs on pointer (mouse) devices, not touch.
  ─────────────────────────────────────────── */
  const cursor = document.getElementById('cursor');
  if (cursor && window.matchMedia('(pointer:fine)').matches) {
    let visible = false;

    document.addEventListener('mousemove', (e) => {
      // ✅ FIX: No hardcoded -16 offset — centering is now done via CSS margin
      cursor.style.transform = `translate3d(${e.clientX}px,${e.clientY}px,0)`;
      if (!visible) { cursor.style.opacity = '1'; visible = true; }
    }, { passive: true });

    document.addEventListener('mouseleave', () => {
      cursor.style.opacity = '0'; visible = false;
    }, { passive: true });
  } else if (cursor) {
    cursor.remove();
    document.body.style.cursor = 'auto';
  }


  /* ── 2. MOBILE NAV ──────────────────────────
     ✅ FIX: Hamburger toggle for mobile navigation.
     Manages aria-expanded, open/close on overlay click,
     closes on nav link click, and traps no scroll
     when menu is open.
  ─────────────────────────────────────────── */
  const menuBtn = document.getElementById('menuBtn');
  const navMenu = document.getElementById('navMenu');

  // Create overlay element for click-outside-to-close
  const overlay = document.createElement('div');
  overlay.className = 'nav__overlay';
  overlay.setAttribute('aria-hidden', 'true');
  document.body.appendChild(overlay);

  function openNav() {
    navMenu.classList.add('open');
    overlay.classList.add('show');
    menuBtn.classList.add('is-open');
    menuBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden'; // prevent bg scroll
  }

  function closeNav() {
    navMenu.classList.remove('open');
    overlay.classList.remove('show');
    menuBtn.classList.remove('is-open');
    menuBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  menuBtn?.addEventListener('click', () => {
    const isOpen = navMenu.classList.contains('open');
    isOpen ? closeNav() : openNav();
  });

  // Close when clicking overlay
  overlay.addEventListener('click', closeNav);

  // Close when a nav link is clicked on mobile
  navMenu?.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 920) closeNav();
    });
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu?.classList.contains('open')) closeNav();
  });


  /* ── 3. NAV SCROLL + ACTIVE LINK ───────────
     ✅ FIX: sectionMap is now built after DOMContentLoaded
     with a short delay so CSS reveal transforms have settled.
     Without this, offsetTop values captured during initial
     render are wrong because .js-reveal elements are shifted
     down by translateY(32px).
  ─────────────────────────────────────────── */
  const nav      = document.getElementById('nav');
  const navLinks = [...document.querySelectorAll('.nav__link')];
  const sections = [...document.querySelectorAll('section[id]')];

  let sectionMap = [];

  function buildSectionMap() {
    return sections.map(s => ({ id: s.id, top: s.offsetTop }));
  }

  function setActiveLink(id) {
    navLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === `#${id}`));
  }

  // ✅ FIX: Defer sectionMap build until layout has fully settled
  // (CSS transitions complete within ~100ms of DOMContentLoaded)
  document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
      sectionMap = buildSectionMap();
    }, 150);
  });

  let lastScroll = -1;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (y === lastScroll) return;
    lastScroll = y;

    nav.classList.toggle('scrolled', y > 55);

    if (sectionMap.length) {
      const active = [...sectionMap].reverse().find(s => y >= s.top - 140);
      if (active) setActiveLink(active.id);
    }
  }, { passive: true });

  // Rebuild sectionMap on resize (layout shift)
  window.addEventListener('resize', () => {
    sectionMap = buildSectionMap();
  }, { passive: true });


  /* ── 4. REVEAL (IntersectionObserver) ──────
     Single shared observer, unobserves after trigger.
  ─────────────────────────────────────────── */
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.js-reveal').forEach(el => revealObs.observe(el));


  /* ── 5. TYPED TEXT ──────────────────────────
     setTimeout-based typewriter. Idle when waiting.
  ─────────────────────────────────────────── */
  const roles = [
    'Backend Developer',
    'Database Designer',
    'AI Enthusiast',
    'User Testing Advocate',
    'Problem Solver ✨',
    'CS Engineering Student',
  ];

  const typedEl = document.getElementById('typed');
  if (typedEl) {
    let ri = 0, ci = 0, del = false;

    function tick() {
      const word = roles[ri];
      if (!del) {
        typedEl.textContent = word.slice(0, ++ci);
        if (ci === word.length) { del = true; return void setTimeout(tick, 1800); }
      } else {
        typedEl.textContent = word.slice(0, --ci);
        if (ci === 0) { del = false; ri = (ri + 1) % roles.length; }
      }
      setTimeout(tick, del ? 45 : 82);
    }
    tick();
  }


  /* ── 6. SMOOTH SCROLL ───────────────────────
     Delegated to one listener — not one per link.
  ─────────────────────────────────────────── */
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });


  /* ── 7. CONTACT FORM ────────────────────────
     ✅ FIX: Full accessible validation with aria-invalid,
     per-field error messages that screen readers announce,
     and proper cleanup on re-submit attempt.

     Replace the await block with EmailJS / Formspree for prod.
  ─────────────────────────────────────────── */
  const form       = document.getElementById('contactForm');
  const submitBtn  = document.getElementById('submitBtn');
  const formStatus = document.getElementById('formStatus');

  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // ✅ FIX: Per-field accessible error helpers
  function showFieldError(inputId, errId, message) {
    const input = document.getElementById(inputId);
    const errEl = document.getElementById(errId);
    if (input) input.setAttribute('aria-invalid', 'true');
    if (errEl) errEl.textContent = message;
  }

  function clearFieldError(inputId, errId) {
    const input = document.getElementById(inputId);
    const errEl = document.getElementById(errId);
    if (input) input.setAttribute('aria-invalid', 'false');
    if (errEl) errEl.textContent = '';
  }

  function clearAllErrors() {
    [['f-name','f-name-err'],['f-email','f-email-err'],['f-msg','f-msg-err']].forEach(
      ([inputId, errId]) => clearFieldError(inputId, errId)
    );
    setStatus('', '');
  }

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const name  = form['name'].value.trim();
      const email = form['email'].value.trim();
      const msg   = form['message'].value.trim();

      // Clear previous errors before re-validating
      clearAllErrors();

      // ✅ FIX: Per-field accessible error messages
      let hasError = false;
      if (!name) {
        showFieldError('f-name', 'f-name-err', 'Please enter your name.');
        hasError = true;
      }
      if (!email || !EMAIL_RE.test(email)) {
        showFieldError('f-email', 'f-email-err', !email ? 'Please enter your email.' : 'Please enter a valid email address.');
        hasError = true;
      }
      if (!msg) {
        showFieldError('f-msg', 'f-msg-err', 'Please write a message.');
        hasError = true;
      }
      if (hasError) return;

      submitBtn.disabled    = true;
      submitBtn.textContent = 'Sending ✦…';
      submitBtn.setAttribute('aria-busy', 'true');

      // ↓ Replace this block with real EmailJS / Formspree send
      try {
        await delay(1300);
        setStatus("✅ Message sent! I'll get back to you soon 💜", 'ok');
        form.reset();
        clearAllErrors();
      } catch (err) {
        setStatus('⚠️ Something went wrong. Please try again or email me directly.', 'warn');
      } finally {
        submitBtn.disabled    = false;
        submitBtn.textContent = 'Send Message →';
        submitBtn.removeAttribute('aria-busy');
      }
    });

    // ✅ FIX: Clear field errors as user types (better UX)
    form.querySelectorAll('input, textarea').forEach(input => {
      input.addEventListener('input', () => {
        const errId = input.id + '-err';
        clearFieldError(input.id, errId);
      });
    });
  }

  function setStatus(msg, type) {
    if (!formStatus) return;
    formStatus.textContent = msg;
    formStatus.style.color = type === 'warn' ? '#f472b6'
                           : type === 'ok'   ? '#d8b4fe'
                           : '';
  }

  function delay(ms) { return new Promise(r => setTimeout(r, ms)); }

})(); // end IIFE — no globals leaked