const body = document.body;
const themeToggle = document.getElementById('themeToggle');
const printBtn = document.getElementById('printBtn');
const progress = document.getElementById('progress');
const year = document.getElementById('year');

function applyTheme(theme) {
  const dark = theme === 'dark';
  body.classList.toggle('dark', dark);
  themeToggle.textContent = dark ? '☀' : '◐';
  themeToggle.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
  localStorage.setItem('cv-theme', theme);
}

applyTheme(localStorage.getItem('cv-theme') || 'light');

themeToggle.addEventListener('click', () => {
  applyTheme(body.classList.contains('dark') ? 'light' : 'dark');
});

printBtn.addEventListener('click', () => window.print());

year.textContent = new Date().getFullYear();

function updateProgress() {
  const scrollTop = window.scrollY;
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const percent = scrollable > 0 ? (scrollTop / scrollable) * 100 : 0;
  progress.style.width = `${Math.min(100, Math.max(0, percent))}%`;
}

window.addEventListener('scroll', updateProgress, { passive: true });
updateProgress();

const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });
reveals.forEach((el) => observer.observe(el));

// Skill filter adds a lightweight interaction without hiding the factual CV content.
const skillButtons = [...document.querySelectorAll('.skill')];
skillButtons.forEach((button) => {
  button.addEventListener('click', () => {
    skillButtons.forEach((item) => item.classList.remove('active'));
    button.classList.add('active');
  });
});
