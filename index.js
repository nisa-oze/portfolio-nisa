/* ── Back to Top ── */
const backTop = document.querySelector('.back-top');
if (backTop) {
  window.addEventListener('scroll', () => {
    backTop.classList.toggle('visible', window.scrollY > 600);
  });
}

/* ── Mobile Nav ── */
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('nav-toggle');
  const menu   = document.getElementById('nav-links');
  if (!toggle || !menu) return;

  const close = () => { menu.classList.remove('open'); toggle.classList.remove('active'); toggle.setAttribute('aria-expanded','false'); };
  const open  = () => { menu.classList.add('open');    toggle.classList.add('active');    toggle.setAttribute('aria-expanded','true');  };

  toggle.addEventListener('click', () => menu.classList.contains('open') ? close() : open());
  document.querySelectorAll('.nav__link').forEach(l => l.addEventListener('click', close));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
  document.addEventListener('click', e => {
    if (!menu.contains(e.target) && !toggle.contains(e.target)) close();
  });

  /* ── Active link ── */
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__link').forEach(l => {
    const href = l.getAttribute('href');
    if (href === page || (page === '' && href === 'index.html')) l.classList.add('nav__link--active');
  });

  /* ── Fade-up observer ── */
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
  }, { threshold: .12 });
  document.querySelectorAll('.fade-up').forEach(el => obs.observe(el));

  /* ── CV zoom ── */
  const cvImg    = document.getElementById('cv-image');
  const zoomIn   = document.getElementById('zoom-in');
  const zoomOut  = document.getElementById('zoom-out');
  const zoomRst  = document.getElementById('zoom-reset');
  if (cvImg && zoomIn) {
    let scale = 1;
    const apply = () => { cvImg.style.transform = `scale(${scale})`; cvImg.classList.toggle('zoomed', scale > 1); };
    zoomIn.addEventListener('click',  () => { scale = Math.min(3, scale + .25); apply(); });
    zoomOut.addEventListener('click', () => { scale = Math.max(1, scale - .25); apply(); });
    zoomRst.addEventListener('click', () => { scale = 1; apply(); });
    cvImg.addEventListener('click',   () => { scale = scale > 1 ? 1 : 2; apply(); });
  }
});