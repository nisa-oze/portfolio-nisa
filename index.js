/* -----------------------------------------
  Focus outline only for keyboard users
 ---------------------------------------- */
const handleFirstTab = (e) => {
  if (e.key === 'Tab') {
    document.body.classList.add('user-is-tabbing');
    window.removeEventListener('keydown', handleFirstTab);
    window.addEventListener('mousedown', handleMouseDownOnce);
  }
};
const handleMouseDownOnce = () => {
  document.body.classList.remove('user-is-tabbing');
  window.removeEventListener('mousedown', handleMouseDownOnce);
  window.addEventListener('keydown', handleFirstTab);
};
window.addEventListener('keydown', handleFirstTab);

/* -----------------------------------------
  Back to Top
 ---------------------------------------- */
const backToTopButton = document.querySelector('.back-to-top');
const setBackToTop = (visible) => {
  if (!backToTopButton) return;
  backToTopButton.style.visibility = visible ? 'visible' : 'hidden';
  backToTopButton.style.opacity    = visible ? '1'       : '0';
  backToTopButton.style.transform  = visible ? 'scale(1)' : 'scale(0)';
};
window.addEventListener('scroll', () => setBackToTop(window.scrollY > 700));

/* -----------------------------------------
  DOMContentLoaded
 ---------------------------------------- */
document.addEventListener('DOMContentLoaded', function () {

  /* ---- CV Zoom (comme Nollan) ---- */
  const cvImage      = document.getElementById('cv-image');
  const zoomInBtn    = document.getElementById('zoom-in');
  const zoomOutBtn   = document.getElementById('zoom-out');
  const resetZoomBtn = document.getElementById('reset-zoom');

  if (cvImage && zoomInBtn && zoomOutBtn && resetZoomBtn) {
    let scale = 1;
    const scaleStep = 0.25;
    const maxScale  = 3;
    const minScale  = 1;

    const applyScale = () => {
      cvImage.style.transform = `scale(${scale})`;
      cvImage.classList.toggle('zoomed', scale > 1);
    };

    zoomInBtn.addEventListener('click',    () => { scale = Math.min(maxScale, scale + scaleStep); applyScale(); });
    zoomOutBtn.addEventListener('click',   () => { scale = Math.max(minScale, scale - scaleStep); applyScale(); });
    resetZoomBtn.addEventListener('click', () => { scale = 1; applyScale(); });
    cvImage.addEventListener('click',      () => { scale = (scale === 1) ? 2 : 1; applyScale(); });
  }

  /* ---- Mobile Menu Toggle ---- */
  const navToggle = document.getElementById('nav-toggle');
  const navMenu   = document.getElementById('nav-menu');
  const navLinks  = document.querySelectorAll('.nav__link');

  if (navToggle && navMenu) {
    const closeMenu = () => {
      navMenu.classList.remove('active');
      navToggle.classList.remove('active');
      navToggle.setAttribute('aria-expanded', 'false');
    };
    const openMenu = () => {
      navMenu.classList.add('active');
      navToggle.classList.add('active');
      navToggle.setAttribute('aria-expanded', 'true');
    };

    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.addEventListener('click', () => navMenu.classList.contains('active') ? closeMenu() : openMenu());
    navLinks.forEach(link => link.addEventListener('click', closeMenu));
    document.addEventListener('click', e => {
      if (!navMenu.contains(e.target) && !navToggle.contains(e.target) && navMenu.classList.contains('active')) closeMenu();
    });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
  }

});