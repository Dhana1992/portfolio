const navToggle = document.getElementById('nav-toggle');
const navList = document.querySelector('.nav__list');
const navLinks = document.querySelectorAll('.nav__link');
const sections = document.querySelectorAll('main section[id]');
const header = document.getElementById('header');

navToggle?.addEventListener('click', () => {
  navList.classList.toggle('show');
});

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    navList.classList.remove('show');
  });
});

const expandButtons = document.querySelectorAll('.expand-toggle');
const sectionToggles = document.querySelectorAll('.section-toggle');

expandButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const card = button.closest('.expandable-card');
    const content = card?.querySelector('.expandable-content');
    if (!content) return;

    const isOpen = content.classList.toggle('open');
    button.textContent = isOpen ? 'View Less' : 'View More';
  });
});

sectionToggles.forEach((button) => {
  button.addEventListener('click', () => {
    const target = button.dataset.target;
    const hiddenCards = document.querySelectorAll(`#${target} .hidden-card`);
    if (!hiddenCards.length) return;

    const isExpanded = button.classList.toggle('active');
    hiddenCards.forEach((card) => {
      card.style.display = isExpanded ? 'grid' : 'none';
    });
    const label = target === 'experience' ? 'Experience' : 'Projects';
    button.textContent = isExpanded ? `Show Less ${label}` : `View More ${label}`;
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const id = entry.target.getAttribute('id');
      const navLink = document.querySelector(`.nav__link[href='#${id}']`);

      if (entry.isIntersecting) {
        navLinks.forEach((link) => link.classList.remove('active'));
        navLink?.classList.add('active');
      }
    });
  },
  {
    rootMargin: '-35% 0px -55% 0px',
    threshold: 0,
  }
);

sections.forEach((section) => observer.observe(section));

window.addEventListener('scroll', () => {
  if (window.scrollY > 24) {
    header.classList.add('header--scrolled');
  } else {
    header.classList.remove('header--scrolled');
  }
});

const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.15,
  }
);

revealElements.forEach((el) => revealObserver.observe(el));
