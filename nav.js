// ── nav.js — partagé par toutes les pages ──────────────────────

document.addEventListener('DOMContentLoaded', () => {

  // hamburger
  const ham = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');
  if (ham && navLinks) {
    ham.addEventListener('click', () => navLinks.classList.toggle('open'));
    navLinks.querySelectorAll('a').forEach(a =>
      a.addEventListener('click', () => navLinks.classList.remove('open'))
    );
  }

  // active link — compare href à l'URL courante
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href').split('/').pop();
    if (href === page) a.classList.add('active');
  });

  // scroll reveal + skill bars
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length) {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          e.target.querySelectorAll('.skill-bar-fill').forEach(b => {
            b.style.width = b.dataset.width + '%';
          });
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.08 });
    reveals.forEach(r => obs.observe(r));
  }

  // contact form
  const sendBtn = document.getElementById('send-btn');
  if (sendBtn) {
    sendBtn.addEventListener('click', () => {
      const notif = document.getElementById('notif');
      if (notif) { notif.style.display = 'block'; setTimeout(() => notif.style.display = 'none', 3500); }
      document.querySelectorAll('#contact-form input, #contact-form textarea').forEach(el => el.value = '');
    });
  }

});