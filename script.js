const siteData = {
  name: 'Pushpa Topno',
  title: 'Aspiring Web Developer',
  tagline: 'Building modern and user-friendly web experiences while continuously learning and growing in the world of technology.',
  email: 'pushpatopno037@gmail.com',
  location: 'India',
  focus: 'Front-end development',
  skills: [
    { name: 'HTML', description: 'Semantic structure, accessibility, and modern markup.', level: 92 },
    { name: 'CSS', description: 'Responsive layouts, animations, and modern styling.', level: 88 }
  ],
  projects: [
    {
      title: 'Personal Portfolio Website',
      description: 'Create a polished portfolio to showcase skills, experience, and projects.',
      tech: 'HTML • CSS • JavaScript',
      github: '#',
      live: '#'
    },
    {
      title: 'Responsive Landing Page',
      description: 'Build a modern landing page optimized for mobile and desktop devices.',
      tech: 'HTML • CSS • JavaScript',
      github: '#',
      live: '#'
    },
    {
      title: 'Modern Business Website',
      description: 'Design a sleek business landing experience with polished brand visuals.',
      tech: 'HTML • CSS • JavaScript',
      github: '#',
      live: '#'
    }
  ],
  futureGoals: [
    'Learning JavaScript and modern front-end development patterns.',
    'Learning Git and GitHub for version control and collaboration.',
    'Expanding web development skills with responsive design and accessibility.',
    'Building real-world projects to strengthen practical experience.',
    'Preparing for opportunities in the tech industry with dedication and growth.'
  ],
  socials: [
    { label: 'LinkedIn', url: '#', comment: 'Add LinkedIn URL here' },
    { label: 'GitHub', url: '#', comment: 'Add GitHub URL here' },
    { label: 'Resume', url: '#', comment: 'Add Resume PDF here' }
  ]
};

const typedPhrases = [
  'Web Development Student.',
  'Front-end Explorer.',
  'Building modern websites.',
  'Creating polished digital experiences.'
];

const typedTextElement = document.getElementById('typed-text');
const nav = document.querySelector('.nav');
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelectorAll('.nav-link');
const revealElements = document.querySelectorAll('[data-reveal]');
const progressBar = document.getElementById('page-progress');
const loader = document.getElementById('page-loader');
const footerYear = document.getElementById('footer-year');
const contactForm = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');

function setPersonalInfo() {
  document.querySelector('.hero-copy h1').textContent = siteData.name;
  document.querySelector('.hero-title').textContent = siteData.title;
  document.querySelector('.hero-description').textContent = siteData.tagline;
  document.querySelector('.contact-card a[href^="mailto:"]').textContent = siteData.email;
  document.querySelector('.contact-card a[href^="mailto:"]').href = `mailto:${siteData.email}`;
  footerYear.textContent = new Date().getFullYear();

  const aboutDetails = document.querySelector('.about-details');
  aboutDetails.innerHTML = `
    <div>
      <span class="detail-label">Location</span>
      <strong>${siteData.location}</strong>
    </div>
    <div>
      <span class="detail-label">Focus</span>
      <strong>${siteData.focus}</strong>
    </div>
  `;

  const skillCards = document.querySelectorAll('.skill-card');
  skillCards.forEach((card, index) => {
    const skill = siteData.skills[index];
    if (!skill) return;
    card.querySelector('h3').textContent = skill.name;
    card.querySelector('p').textContent = skill.description;
    const progress = card.querySelector('.skill-progress');
    progress.style.width = `${skill.level}%`;
    card.querySelector('span').textContent = `${skill.level}%`;
  });

  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach((card, index) => {
    const project = siteData.projects[index];
    if (!project) return;
    card.querySelector('h3').textContent = project.title;
    card.querySelector('p').textContent = project.description;
    card.querySelector('.project-tech').textContent = project.tech;
    card.querySelector('.project-actions a:nth-child(1)').href = project.github;
    card.querySelector('.project-actions a:nth-child(2)').href = project.live;
  });

  const socialLinks = document.querySelector('.social-links');
  socialLinks.innerHTML = siteData.socials
    .map(link => `<a href="${link.url}" aria-label="${link.label} placeholder">${link.label}</a>`)
    .join('');
}

let typedIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeAnimation() {
  const current = typedPhrases[typedIndex];
  const displayed = current.substring(0, charIndex);
  typedTextElement.textContent = displayed;

  if (!isDeleting && charIndex < current.length) {
    charIndex++;
    setTimeout(typeAnimation, 100);
  } else if (isDeleting && charIndex > 0) {
    charIndex--;
    setTimeout(typeAnimation, 40);
  } else {
    isDeleting = !isDeleting;
    if (!isDeleting) {
      typedIndex = (typedIndex + 1) % typedPhrases.length;
    }
    setTimeout(typeAnimation, isDeleting ? 700 : 1500);
  }
}

typeAnimation();

function updateProgressBar() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  progressBar.style.width = `${progress}%`;
}

function revealOnScroll() {
  revealElements.forEach((element) => {
    const rect = element.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      element.classList.add('revealed');
    }
  });
}

function setActiveNav() {
  const offset = 120;
  const sections = Array.from(document.querySelectorAll('main section'));
  const currentSection = sections.find((section) => {
    const rect = section.getBoundingClientRect();
    return rect.top <= offset && rect.bottom > offset;
  });

  navLinks.forEach((link) => link.classList.remove('active'));
  if (currentSection) {
    const activeLink = document.querySelector(`.nav-link[href="#${currentSection.id}"]`);
    if (activeLink) activeLink.classList.add('active');
  }
}

window.addEventListener('scroll', () => {
  updateProgressBar();
  revealOnScroll();
  setActiveNav();
});

window.addEventListener('load', () => {
  setTimeout(() => loader.classList.add('hide'), 300);
  revealOnScroll();
  updateProgressBar();
  setActiveNav();
});

navToggle.addEventListener('click', () => {
  const expanded = navToggle.getAttribute('aria-expanded') === 'true';
  navToggle.setAttribute('aria-expanded', String(!expanded));
  nav.classList.toggle('open');
});

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

contactForm.addEventListener('submit', (event) => {
  event.preventDefault();
  formMessage.textContent = 'Message sent successfully! Thank you for reaching out.';
  contactForm.reset();
});

setPersonalInfo();
