// script.js — site interactions + services carousel (testimonials removed)
document.addEventListener('DOMContentLoaded', () => {
  /* ---------- AOS ---------- */
  if (typeof AOS !== 'undefined') AOS.init();

  /* ---------- Fade-in (About) ---------- */
  (function initFadeIns() {
    const els = document.querySelectorAll('.fade-in');
    if (!els.length) return;
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.2 });
    els.forEach(el => io.observe(el));
  })();

  /* =======================================================
     SERVICES — grid on desktop, carousel on mobile
     Markup:
       .service-slider > .neumorphic-service-item* + .prev-service + .next-service
     ======================================================= */
  (function initServices() {
    const slider = document.querySelector('.service-slider');
    if (!slider) return;

    const cards = Array.from(slider.querySelectorAll('.neumorphic-service-item'));
    const prevBtn = slider.querySelector('.prev-service');
    const nextBtn = slider.querySelector('.next-service');
    if (!cards.length) return;

    const mql = window.matchMedia('(max-width: 720px)');
    let current = 0;

    const isCarousel = () => mql.matches;

    function render() {
      const carousel = isCarousel();

      if (prevBtn) prevBtn.style.display = carousel ? 'inline-flex' : 'none';
      if (nextBtn) nextBtn.style.display = carousel ? 'inline-flex' : 'none';

      cards.forEach((card, idx) => {
        if (carousel) {
          const active = idx === current;
          card.style.display = active ? 'block' : 'none';
          card.classList.toggle('active', active);
          card.setAttribute('aria-hidden', active ? 'false' : 'true');
          if (active) card.setAttribute('tabindex', '0'); else card.removeAttribute('tabindex');
        } else {
          card.style.display = 'block';
          card.classList.remove('active');
          card.removeAttribute('aria-hidden');
          card.removeAttribute('tabindex');
        }
      });
    }

    function next() { current = (current + 1) % cards.length; render(); }
    function prev() { current = (current - 1 + cards.length) % cards.length; render(); }

    if (prevBtn) prevBtn.addEventListener('click', prev);
    if (nextBtn) nextBtn.addEventListener('click', next);

    // Swipe (mobile)
    let startX = null;
    slider.addEventListener('touchstart', (e) => { startX = e.changedTouches[0].clientX; }, { passive: true });
    slider.addEventListener('touchend', (e) => {
      if (startX == null || !isCarousel()) return;
      const dx = e.changedTouches[0].clientX - startX;
      const THRESH = 40;
      if (dx > THRESH) prev();
      if (dx < -THRESH) next();
      startX = null;
    });

    render();
    mql.addEventListener('change', () => { current = 0; render(); });

    // Fallback re-render on resize
    let rAF;
    window.addEventListener('resize', () => {
      cancelAnimationFrame(rAF);
      rAF = requestAnimationFrame(() => { current = 0; render(); });
    });
  })();

  /* ---------- Mobile Navigation ---------- */
  (function initNav() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (!menuToggle || !navLinks) return;

    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => navLinks.classList.remove('active'));
    });
  })();

  /* ---------- Popup Form ---------- */
  (function initIdeaForm() {
    const overlay = document.getElementById('ideaFormOverlay');
    window.openIdeaForm = () => { if (overlay) overlay.removeAttribute('hidden'); overlay && (overlay.style.display = 'flex'); };
    window.closeIdeaForm = () => { if (overlay) overlay.setAttribute('hidden', ''); overlay && (overlay.style.display = 'none'); };
  })();

  /* ---------- Project Card tap-to-expand (mobile) ---------- */
  (function initProjectCards() {
    const cards = document.querySelectorAll('.js-project-card');
    if (!cards.length) return;
    cards.forEach(card => {
      card.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
          const wasActive = card.classList.contains('active');
          cards.forEach(c => c.classList.remove('active'));
          if (!wasActive) card.classList.add('active');
        }
      });
    });
  })();
});
// script.js — end of site interactions