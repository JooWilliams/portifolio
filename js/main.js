// ===== TYPING EFFECT =====
const roles = [
  '"Desenvolvedor Júnior"',
  '"Python Enthusiast"',
  '"Java Developer"',
  '"Estudante Full-Stack"',
  '"Automatizador de Processos"',
];
let roleIdx = 0, charIdx = 0, deleting = false;
const typingEl = document.getElementById('typingText');

function type() {
  if (!typingEl) return;
  const current = roles[roleIdx];
  if (!deleting) {
    typingEl.textContent = current.slice(0, ++charIdx);
    if (charIdx === current.length) { deleting = true; return setTimeout(type, 1800); }
  } else {
    typingEl.textContent = current.slice(0, --charIdx);
    if (charIdx === 0) { deleting = false; roleIdx = (roleIdx + 1) % roles.length; }
  }
  setTimeout(type, deleting ? 55 : 90);
}
type();

// ===== MOBILE NAV =====
const toggle = document.getElementById('navToggle');
const menu   = document.getElementById('navMenu');
toggle?.addEventListener('click', () => menu.classList.toggle('open'));
menu?.querySelectorAll('.nav__link').forEach(l =>
  l.addEventListener('click', () => menu.classList.remove('open'))
);

// ===== ACTIVE NAV ON SCROLL =====
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav__link');

function updateActive() {
  const scrollY = window.scrollY + 100;
  sections.forEach(sec => {
    if (scrollY >= sec.offsetTop && scrollY < sec.offsetTop + sec.offsetHeight) {
      navLinks.forEach(l => l.classList.remove('active'));
      document.querySelector(`.nav__link[href="#${sec.id}"]`)?.classList.add('active');
    }
  });
}
window.addEventListener('scroll', updateActive, { passive: true });

// ===== FOOTER YEAR =====
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ===== SCROLL REVEAL (lightweight) =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.opacity = '1';
      e.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.about__card, .skill-pill, .cert-item, .timeline__card, .contact__card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity 0.55s ease, transform 0.55s ease';
  observer.observe(el);
});
