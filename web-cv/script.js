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

const projectData = [
  {
    category: 'CI/CD · SECURITY',
    title: 'Secure CI/CD Pipeline',
    description: 'A Jenkins delivery workflow that builds container images, runs automated checks, and publishes versioned artifacts.',
    tools: ['Jenkins', 'Docker', 'Git']
  },
  {
    category: 'KUBERNETES · GITOPS',
    title: 'GitOps Application Delivery',
    description: 'A Kubernetes deployment flow managed through declarative configuration and synchronized GitOps releases.',
    tools: ['Kubernetes', 'Argo CD', 'Git']
  },
  {
    category: 'INFRASTRUCTURE · AUTOMATION',
    title: 'Repeatable Infrastructure',
    description: 'An infrastructure-as-code and configuration-management workflow for provisioning and preparing consistent environments.',
    tools: ['Terraform', 'Ansible']
  }
];

function createProjectSection(projects) {
  const section = document.createElement('section');
  section.classList.add('section', 'section-grid', 'reveal');
  section.id = 'projects';

  const label = document.createElement('div');
  label.className = 'section-label';
  const number = document.createElement('span');
  number.className = 'section-number';
  number.textContent = '02';
  const heading = document.createElement('h2');
  heading.textContent = 'DevSecOps Projects';
  label.append(number, heading);

  const grid = document.createElement('div');
  grid.className = 'section-body project-grid';
  grid.setAttribute('aria-live', 'polite');

  projects.forEach((project, index) => {
    const card = document.createElement('article');
    card.className = `project-card${index === 0 ? ' featured' : ''}`;

    const top = document.createElement('div');
    top.className = 'project-top';
    const category = document.createElement('span');
    category.textContent = project.category;
    const sequence = document.createElement('span');
    sequence.textContent = `LAB / 0${index + 1}`;
    top.append(category, sequence);

    const content = document.createElement('div');
    const title = document.createElement('h3');
    title.textContent = project.title;
    const description = document.createElement('p');
    description.textContent = project.description;
    content.append(title, description);

    const tools = document.createElement('div');
    tools.className = 'project-bottom';
    project.tools.forEach((tool) => {
      const tag = document.createElement('span');
      tag.textContent = tool;
      tools.append(tag);
    });

    card.append(top, content, tools);
    grid.append(card);
  });

  section.append(label, grid);
  return section;
}

const projectsMount = document.getElementById('projectsMount');
projectsMount.append(createProjectSection(projectData));

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
