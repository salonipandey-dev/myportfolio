(() => {
  'use strict';

  const cursor = document.getElementById('cursor');

  if (cursor && window.matchMedia('(pointer:fine)').matches) {
    let x = 0, y = 0;
    let cx = 0, cy = 0;

    document.addEventListener('mousemove', (e) => {
      x = e.clientX;
      y = e.clientY;
      cursor.style.opacity = 1;
    });

    function animate() {
      cx += (x - cx) * 0.15;
      cy += (y - cy) * 0.15;
      cursor.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
      requestAnimationFrame(animate);
    }
    animate();

    document.addEventListener('mouseleave', () => {
      cursor.style.opacity = 0;
    });

  } else if (cursor) {
    cursor.remove();
  }

  const menuBtn = document.getElementById('menuBtn');
  const navMenu = document.getElementById('navMenu');

  const overlay = document.createElement('div');
  overlay.className = 'nav__overlay';
  document.body.appendChild(overlay);

  function openNav() {
    navMenu.classList.add('open');
    overlay.classList.add('show');
    menuBtn.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function closeNav() {
    navMenu.classList.remove('open');
    overlay.classList.remove('show');
    menuBtn.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  menuBtn?.addEventListener('click', () => {
    navMenu.classList.contains('open') ? closeNav() : openNav();
  });

  overlay.addEventListener('click', closeNav);

  navMenu?.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', closeNav);
  });

  const nav = document.getElementById('nav');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav__link');

  function updateNav() {
    const y = window.scrollY;

    nav.classList.toggle('scrolled', y > 50);

    sections.forEach(section => {
      const top = section.offsetTop - 150;
      const height = section.offsetHeight;
      const id = section.id;

      if (y >= top && y < top + height) {
        navLinks.forEach(link => {
          link.classList.toggle(
            'active',
            link.getAttribute('href') === `#${id}`
          );
        });
      }
    });
  }

  window.addEventListener('scroll', updateNav);

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.js-reveal').forEach(el => {
    observer.observe(el);
  });

  const roles = [
    'Backend Developer',
    'AI System Builder',
    'Database Architect',
    'Problem Solver ✨'
  ];

  const typed = document.getElementById('typed');

  if (typed) {
    let i = 0, j = 0;
    let deleting = false;

    function type() {
      const word = roles[i];

      typed.textContent = word.slice(0, j);

      if (!deleting && j < word.length) {
        j++;
        setTimeout(type, 85);
      } else if (deleting && j > 0) {
        j--;
        setTimeout(type, 45);
      } else {
        deleting = !deleting;
        if (!deleting) i = (i + 1) % roles.length;
        setTimeout(type, 1200);
      }
    }
    type();
  }

  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;

    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;

    e.preventDefault();

    const offset = 80;
    const top = target.offsetTop - offset;

    window.scrollTo({
      top,
      behavior: 'smooth'
    });
  });

  const form = document.getElementById('contactForm');
  const btn = document.getElementById('submitBtn');
  const status = document.getElementById('formStatus');

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      btn.disabled = true;
      btn.textContent = "Sending...";

      try {
        await new Promise(r => setTimeout(r, 1200));

        status.textContent = "✅ Message sent successfully ✨";
        form.reset();

      } catch {
        status.textContent = "⚠️ Something went wrong";
      }

      btn.disabled = false;
      btn.textContent = "Send Message →";
    });
  }

})();