// ============================================================
//  QA Portfolio — main.js
//  Handles: nav scroll, mobile menu, counters, reveal, form
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── Nav scroll behaviour ── */
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  /* ── Mobile hamburger ── */
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('nav-links');

  if (hamburger && navLinks) {
    const setMenu = (open) => {
      navLinks.classList.toggle('open', open);
      hamburger.setAttribute('aria-expanded', String(open));
      hamburger.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    };

    hamburger.addEventListener('click', () => {
      setMenu(!navLinks.classList.contains('open'));
    });

    // Close menu when a link is clicked or Esc is pressed
    navLinks.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => setMenu(false));
    });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') setMenu(false);
    });
  }

  // Smooth scroll is handled by CSS (html { scroll-behavior: smooth; }).

  /* ── IntersectionObserver factory ── */
  const createObserver = (callback, options = {}) =>
    new IntersectionObserver(callback, {
      threshold: 0.15,
      rootMargin: '0px 0px -60px 0px',
      ...options
    });

  /* ── Reveal animations (one shared observer) ── */
  document
    .querySelectorAll('.skill-category, .projeto-card, .metrica-card, .met-item, .sobre-card')
    .forEach((el, i) => {
      el.classList.add('reveal');
      if (i % 3 === 1) el.classList.add('reveal-delay-1');
      if (i % 3 === 2) el.classList.add('reveal-delay-2');
    });

  const revealObs = createObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObs.unobserve(entry.target);
      }
    });
  });
  document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

  /* ── Number counter animation ── */
  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-target'), 10);
    const suffix = el.getAttribute('data-suffix') || '';

    if (prefersReducedMotion) {
      el.textContent = target + suffix;
      return;
    }

    const duration = 1600;
    const start    = performance.now();

    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased    = 1 - Math.pow(1 - progress, 3); // ease-out-cubic
      el.textContent = Math.round(eased * target) + suffix;
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }

  const counterObs = createObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObs.unobserve(entry.target);
      }
    });
  });
  document.querySelectorAll('.stat-num, .counter').forEach(el => counterObs.observe(el));

  /* ── Contact form (Formspree, with mailto fallback) ── */
  const form     = document.getElementById('contato-form');
  const btnLabel = document.getElementById('btn-label');
  const formNote = document.getElementById('form-note');

  const showNote = (text, color) => {
    formNote.textContent = text;
    formNote.style.color = color;
  };

  if (form) {
    form.addEventListener('submit', async e => {
      e.preventDefault();

      const nome     = form.nome.value.trim();
      const email    = form.email.value.trim();
      const mensagem = form.mensagem.value.trim();

      if (!nome || !email || !mensagem) {
        showNote('⚠ Preencha todos os campos antes de enviar.', '#ff6b6b');
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        showNote('⚠ Informe um e-mail válido.', '#ff6b6b');
        return;
      }

      const endpoint      = form.getAttribute('action') || '';
      const fallbackEmail = form.dataset.fallbackEmail;
      const openMailto = () => {
        const subject = encodeURIComponent(`Contato via portfólio — ${nome}`);
        const body    = encodeURIComponent(`${mensagem}\n\n${nome} <${email}>`);
        window.location.href = `mailto:${fallbackEmail}?subject=${subject}&body=${body}`;
      };

      // Formspree ainda não configurado: abre o app de e-mail do visitante.
      if (!endpoint || endpoint.includes('SEU_FORM_ID')) {
        openMailto();
        showNote('✉ Abrimos seu app de e-mail com a mensagem pronta para envio.', 'var(--green)');
        return;
      }

      const btn = form.querySelector('button[type="submit"]');
      btnLabel.textContent = 'Enviando...';
      btn.disabled = true;

      try {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: { Accept: 'application/json' },
          body: new FormData(form)
        });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        showNote('✓ Mensagem enviada! Retorno em breve.', 'var(--green)');
        form.reset();
      } catch (err) {
        showNote(`⚠ Não foi possível enviar agora. Escreva direto para ${fallbackEmail}.`, '#ff6b6b');
      } finally {
        btnLabel.textContent = 'Enviar mensagem';
        btn.disabled = false;
      }
    });
  }

  /* ── Subtle parallax on hero ── */
  const hero = document.querySelector('.hero-content');
  if (hero && !prefersReducedMotion && window.matchMedia('(min-width: 900px)').matches) {
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        hero.style.transform = `translateY(${window.scrollY * 0.06}px)`;
        ticking = false;
      });
    }, { passive: true });
  }

  /* ── Active nav link highlight on scroll ── */
  const navLinksAll = document.querySelectorAll('.nav-link');
  const sectionObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const id = entry.target.getAttribute('id');
      navLinksAll.forEach(link => {
        const active = link.getAttribute('href') === `#${id}`;
        link.style.color = active ? 'var(--green)' : '';
        if (active) link.setAttribute('aria-current', 'true');
        else link.removeAttribute('aria-current');
      });
    });
  }, { threshold: 0.4 });
  document.querySelectorAll('section[id]').forEach(s => sectionObs.observe(s));

  /* ── Footer year ── */
  const yearEl = document.getElementById('footer-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

});
