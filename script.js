// Background movement
const bgLayer = document.querySelector(".bg-layer");

document.addEventListener("mousemove", e => {
  const x = (e.clientX / window.innerWidth - 0.5) * 40;
  const y = (e.clientY / window.innerHeight - 0.5) * 40;
  bgLayer.style.transform = `translate(${x}px, ${y}px)`;
});

// Floating particles
const particles = document.querySelector('.particles');

for (let i = 0; i < 40; i++) {
  const dot = document.createElement('span');
  dot.style.left = Math.random() * 100 + '%';
  dot.style.top = Math.random() * 100 + '%';
  dot.style.animationDelay = Math.random() * 5 + 's';
  particles.appendChild(dot);
}

// Magnetic hover
document.querySelectorAll('.magnetic').forEach(el => {
  el.addEventListener('mousemove', e => {
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / 20;
    const y = (e.clientY - rect.top - rect.height / 2) / 20;
    el.style.transform = `translate(${x}px, ${y}px)`;
  });

  el.addEventListener('mouseleave', () => {
    el.style.transform = `translate(0px, 0px)`;
  });
});

// Cursor glow motion (delayed)
const glow = document.querySelector('.cursor-glow');
let glowX = 0;
let glowY = 0;

document.addEventListener('mousemove', e => {
  glowX = e.clientX;
  glowY = e.clientY;
});

function animateGlow() {
  const currentX = parseFloat(glow.style.left) || 0;
  const currentY = parseFloat(glow.style.top) || 0;

  const newX = currentX + (glowX - currentX) * 0.15;
  const newY = currentY + (glowY - currentY) * 0.15;

  glow.style.left = newX + 'px';
  glow.style.top = newY + 'px';

  requestAnimationFrame(animateGlow);
}

animateGlow();

// Metrics counter animation
const counters = document.querySelectorAll(".metric-number");
let countersStarted = false;

const startCounters = () => {
  if (countersStarted) return;
  countersStarted = true;

  counters.forEach(counter => {
    const target = +counter.getAttribute("data-count");
    let count = 0;

    const update = () => {
      count += 1;
      counter.textContent = count;
      if (count < target) requestAnimationFrame(update);
    };

    update();
  });
};

// Reveal on scroll
const reveals = document.querySelectorAll('.reveal');

const revealOnScroll = () => {
  reveals.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      el.classList.add('visible');
    }
  });

  const metrics = document.querySelector("#metrics");
  const rect = metrics.getBoundingClientRect();
  if (rect.top < window.innerHeight && rect.bottom >= 0) {
    startCounters();
  }
};

window.addEventListener("scroll", revealOnScroll);
revealOnScroll();
