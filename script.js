
(() => {
  'use strict';

  const cursor = document.getElementById('cursor');
  if (cursor && window.matchMedia('(pointer:fine)').matches) {
    // Only run on devices that actually have a pointer (not touch)
    let visible = false;

    document.addEventListener('mousemove', (e) => {
      // translate3d avoids layout/paint — stays on GPU
      cursor.style.transform = `translate3d(${e.clientX - 16}px,${e.clientY - 16}px,0)`;
      if (!visible) { cursor.style.opacity = '1'; visible = true; }
    }, { passive: true });

    document.addEventListener('mouseleave', () => {
      cursor.style.opacity = '0'; visible = false;
    }, { passive: true });
  } else if (cursor) {
    // Touch device — remove custom cursor entirely
    cursor.remove();
    document.body.style.cursor = 'auto';
  }


  /* ── 2. NAV SCROLL ──────────────────────────
     One scroll listener (passive).
     Section offsets cached — no DOM queries per scroll.
  ─────────────────────────────────────────── */
  const nav      = document.getElementById('nav');
  const navLinks = [...document.querySelectorAll('.nav__link')];
  const sections = [...document.querySelectorAll('section[id]')];

  // Cache section tops once; update on resize
  let sectionMap = buildSectionMap();

  function buildSectionMap() {
    return sections.map(s => ({ id: s.id, top: s.offsetTop }));
  }

  function setActiveLink(id) {
    navLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === `#${id}`));
  }

  let lastScroll = -1;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (y === lastScroll) return;
    lastScroll = y;

    // Navbar compact class
    nav.classList.toggle('scrolled', y > 55);

    // Active nav link
    const active = [...sectionMap].reverse().find(s => y >= s.top - 140);
    if (active) setActiveLink(active.id);
  }, { passive: true });

  window.addEventListener('resize', () => { sectionMap = buildSectionMap(); }, { passive: true });


  /* ── 3. REVEAL (single observer) ────────────
     One IntersectionObserver, shared by all .js-reveal.
  ─────────────────────────────────────────── */
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObs.unobserve(entry.target); // stop watching after reveal
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.js-reveal').forEach(el => revealObs.observe(el));


  /* ── 4. TYPED TEXT ──────────────────────────
     setTimeout-based — runs only when typing.
     Idle when waiting between words.
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


  /* ── 5. SMOOTH SCROLL ───────────────────────
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


  /* ── 6. CONTACT FORM ────────────────────────
     Lightweight validation + fake send sim.
     Replace the await block with EmailJS / Formspree for prod.
  ─────────────────────────────────────────── */
  const form       = document.getElementById('contactForm');
  const submitBtn  = document.getElementById('submitBtn');
  const formStatus = document.getElementById('formStatus');

  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const name  = form['name'].value.trim();
      const email = form['email'].value.trim();
      const msg   = form['message'].value.trim();

      if (!name || !email || !msg) {
        setStatus('⚠️ Please fill in all fields.', 'warn');
        return;
      }
      if (!EMAIL_RE.test(email)) {
        setStatus('⚠️ Please enter a valid email.', 'warn');
        return;
      }

      submitBtn.disabled        = true;
      submitBtn.textContent     = 'Sending ✦…';
      setStatus('', '');

      // ↓ Replace with real send (EmailJS / Formspree)
      await delay(1300);

      setStatus("✅ Message sent! I'll get back to you soon 💜", 'ok');
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send Message →';
      form.reset();
    });
  }

  function setStatus(msg, type) {
    formStatus.textContent = msg;
    formStatus.style.color = type === 'warn' ? '#f472b6'
                           : type === 'ok'   ? '#d8b4fe'
                           : '';
  }

  function delay(ms) { return new Promise(r => setTimeout(r, ms)); }

})(); // end IIFE — no globals leaked