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

// Metric counters
const metricEls = document.querySelectorAll('.metric-number');
let countersStarted = false;

function startCounters() {
  if (countersStarted) return;

  // FIXED TRIGGER
  const trigger = window.innerHeight * 0.85;

  metricEls.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < trigger) {
      const target = parseInt(el.getAttribute('data-count'), 10);
      let current = 0;
      const step = Math.max(1, Math.floor(target / 50));
      const interval = setInterval(() => {
        current += step;
        if (current >= target) {
          current = target;
          clearInterval(interval);
        }
        el.textContent = current;
      }, 40);
    }
  });

  countersStarted = true;
}

window.addEventListener('scroll', startCounters);
window.addEventListener('load', startCounters);

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
