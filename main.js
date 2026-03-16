// ============================================================
//  QA Portfolio — main.js
//  Handles: nav scroll, counters, skill bars, reveal, form
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  /* ── Nav scroll behaviour ── */
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  /* ── Mobile hamburger ── */
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.querySelector('.nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });

    // Close menu when a link is clicked
    navLinks.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => navLinks.classList.remove('open'));
    });
  }

  /* ── Smooth scroll for nav links ── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ── IntersectionObserver factory ── */
  const createObserver = (callback, options = {}) =>
    new IntersectionObserver(callback, {
      threshold: 0.15,
      rootMargin: '0px 0px -60px 0px',
      ...options
    });

  /* ── Reveal animations ── */
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length) {
    const revealObs = createObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObs.unobserve(entry.target);
        }
      });
    });
    revealEls.forEach(el => revealObs.observe(el));
  }

  /* ── Number counter animation ── */
  function animateCounter(el) {
    const target  = parseInt(el.getAttribute('data-target'), 10);
    const suffix  = el.getAttribute('data-suffix') || '';
    const duration = 1600;
    const start    = performance.now();

    const step = (now) => {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out-cubic
      const eased    = 1 - Math.pow(1 - progress, 3);
      const current  = Math.round(eased * target);

      el.textContent = current + suffix;

      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target + suffix;
    };

    requestAnimationFrame(step);
  }

  const counterEls = document.querySelectorAll('.stat-num, .counter');
  if (counterEls.length) {
    const counterObs = createObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObs.unobserve(entry.target);
        }
      });
    });
    counterEls.forEach(el => counterObs.observe(el));
  }

  /* ── Skill bar animation ── */
  const skillBars = document.querySelectorAll('.skill-bar');
  if (skillBars.length) {
    const skillObs = createObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const bar   = entry.target;
          const level = bar.getAttribute('data-level');
          setTimeout(() => {
            bar.style.width = level + '%';
          }, 100);
          skillObs.unobserve(bar);
        }
      });
    }, { threshold: 0.3 });

    skillBars.forEach(bar => skillObs.observe(bar));
  }

  /* ── Contact form (demo / mailto fallback) ── */
  const form    = document.getElementById('contato-form');
  const btnLabel = document.getElementById('btn-label');
  const formNote = document.getElementById('form-note');

  if (form) {
    form.addEventListener('submit', async e => {
      e.preventDefault();

      const nome      = form.nome.value.trim();
      const email     = form.email.value.trim();
      const mensagem  = form.mensagem.value.trim();

      if (!nome || !email || !mensagem) {
        formNote.textContent = '⚠ Preencha todos os campos antes de enviar.';
        formNote.style.color = '#ff6b6b';
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        formNote.textContent = '⚠ Informe um e-mail válido.';
        formNote.style.color = '#ff6b6b';
        return;
      }

      // Simulate send (replace with actual endpoint / EmailJS / Formspree)
      btnLabel.textContent = 'Enviando...';
      form.querySelector('.btn').disabled = true;

      await new Promise(r => setTimeout(r, 1200));

      formNote.textContent = '✓ Mensagem enviada! Retorno em breve.';
      formNote.style.color = 'var(--green)';
      btnLabel.textContent = 'Enviar mensagem';
      form.querySelector('.btn').disabled = false;
      form.reset();

      // Fallback: open mailto (optional)
      // window.location.href = `mailto:bruno@email.com?subject=Contato via portfólio&body=${encodeURIComponent(mensagem)}`;
    });
  }

  /* ── Typing effect for hero terminal (extra flair) ── */
  // Already handled via CSS animation-delay; no JS needed.

  /* ── Parallax subtle on hero ── */
  const hero = document.querySelector('.hero-content');
  if (hero && window.matchMedia('(min-width: 900px)').matches) {
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      hero.style.transform = `translateY(${y * 0.06}px)`;
    }, { passive: true });
  }

  /* ── Add reveal class to sections dynamically ── */
  const sectionsToReveal = document.querySelectorAll(
    '.skill-category, .projeto-card, .metrica-card, .met-item, .sobre-card'
  );
  sectionsToReveal.forEach((el, i) => {
    el.classList.add('reveal');
    if (i % 3 === 1) el.classList.add('reveal-delay-1');
    if (i % 3 === 2) el.classList.add('reveal-delay-2');

    const obs = createObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    });
    obs.observe(el);
  });

  /* ── Active nav link highlight on scroll ── */
  const sections = document.querySelectorAll('section[id]');
  const navLinksAll = document.querySelectorAll('.nav-link');

  const sectionObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinksAll.forEach(link => {
          link.style.color = link.getAttribute('href') === `#${id}`
            ? 'var(--green)'
            : '';
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => sectionObs.observe(s));

});
