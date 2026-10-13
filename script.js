// Language switching
let currentLang = 'en';

function applyTranslations(lang) {
  currentLang = lang;
  const dict = translations[lang];
  if (!dict) return;

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) {
      el.textContent = dict[key];
    }
  });
}

document.querySelectorAll('.lang-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelector('.lang-active').classList.remove('lang-active');
    btn.classList.add('lang-active');
    const lang = btn.getAttribute('data-lang');
    applyTranslations(lang);
  });
});

// Initial language
applyTranslations('en');

// Reveal on scroll
const revealEls = document.querySelectorAll('.reveal');
function handleReveal() {
  const trigger = window.innerHeight * 0.80;
  revealEls.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < trigger) {
      el.classList.add('visible');
    }
  });
}
window.addEventListener('scroll', handleReveal);
window.addEventListener('load', handleReveal);

// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const targetId = link.getAttribute('href').substring(1);
    const targetEl = document.getElementById(targetId);
    if (targetEl) {
      e.preventDefault();
      window.scrollTo({
        top: targetEl.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  });
});
