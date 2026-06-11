// Mobile navigation
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

function setMenuOpen(isOpen) {
  navMenu.classList.toggle('nav__menu--open', isOpen);
  navToggle.classList.toggle('nav__toggle--active', isOpen);
  navToggle.setAttribute('aria-expanded', String(isOpen));
  navToggle.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
}

navToggle.addEventListener('click', () => {
  setMenuOpen(!navMenu.classList.contains('nav__menu--open'));
});

// Close menu on link click
navMenu.querySelectorAll('.nav__link').forEach((link) => {
  link.addEventListener('click', () => {
    setMenuOpen(false);
  });
});

// Header scroll effect
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
  header.classList.toggle('header--scrolled', window.scrollY > 50);
});

// Scroll animations
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const animatedElements = document.querySelectorAll(
  '.section__header, .service-card, .project-card, .skills__group, .process__step, .about__grid > *, .contact__wrapper > *, .trust-bar__item'
);

if (prefersReducedMotion) {
  animatedElements.forEach((el) => el.classList.add('visible'));
} else {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  animatedElements.forEach((el) => {
    el.classList.add('fade-in');
    observer.observe(el);
  });
}

// Portadas de proyectos — imagen local o captura del sitio en vivo
function mshotsUrl(site) {
  return `https://s0.wordpress.com/mshots/v1/${encodeURIComponent(site)}?w=800`;
}

function loadProjectCover(img) {
  const site = img.dataset.site;
  if (!site) return;

  const cover = img.closest('.project-card__cover');
  const localSrc = img.dataset.local;
  const remoteSrc = mshotsUrl(site);

  const markLoaded = () => cover?.classList.add('has-cover');

  img.addEventListener('load', markLoaded);
  img.addEventListener('error', () => {
    if (img.dataset.fallback === 'mshots') return;
    img.dataset.fallback = 'mshots';
    img.src = remoteSrc;
  });

  if (localSrc) {
    const probe = new Image();
    probe.onload = () => {
      img.src = localSrc;
    };
    probe.onerror = () => {
      img.src = remoteSrc;
    };
    probe.src = localSrc;
  } else {
    img.src = remoteSrc;
  }
}

document.querySelectorAll('.project-card__preview').forEach(loadProjectCover);

// Enlaces externos: aviso para lectores de pantalla
document.querySelectorAll('a[target="_blank"]').forEach((link) => {
  if (link.querySelector('.sr-only')) return;
  const hint = document.createElement('span');
  hint.className = 'sr-only';
  hint.textContent = ' (se abre en nueva pestaña)';
  link.appendChild(hint);
});

// Workana — actualizar VITE_WORKANA_URL en .env cuando tengas tu perfil
const workanaLink = document.getElementById('workana-link');
const workanaUrl = import.meta.env.VITE_WORKANA_URL;

if (workanaLink && workanaUrl) {
  workanaLink.href = workanaUrl;
}

// Contact form — envío directo por correo (FormSubmit)
const contactForm = document.getElementById('contact-form');
const formSubmitBtn = document.getElementById('form-submit');
const formStatus = document.getElementById('form-status');
const contactEmail = import.meta.env.VITE_CONTACT_EMAIL || 'gabrielasacher@gmail.com';
const formEndpoint = `https://formsubmit.co/ajax/${encodeURIComponent(contactEmail)}`;

contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const honey = document.getElementById('_honey');
  if (honey?.value) return;

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const subject = document.getElementById('subject').value.trim();
  const message = document.getElementById('message').value.trim();

  if (!name || !email || !subject || !message) {
    formStatus.textContent = 'Completá todos los campos antes de enviar.';
    formStatus.className = 'form__status form__status--error';
    return;
  }

  formSubmitBtn.disabled = true;
  formSubmitBtn.textContent = 'Enviando…';
  formStatus.textContent = '';
  formStatus.className = 'form__status';

  try {
    const response = await fetch(formEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        subject,
        message,
        _subject: `[Portfolio] ${subject}`,
        _template: 'table',
        _captcha: 'false',
      }),
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(data.message || 'Error al enviar');
    }

    formStatus.textContent = '¡Mensaje enviado! Te respondo en menos de 24 horas.';
    formStatus.className = 'form__status form__status--success';
    contactForm.reset();
  } catch {
    formStatus.textContent = `No se pudo enviar. Escribime a ${contactEmail}.`;
    formStatus.className = 'form__status form__status--error';
  } finally {
    formSubmitBtn.disabled = false;
    formSubmitBtn.textContent = 'Enviar mensaje';
  }
});

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav__link');

window.addEventListener('scroll', () => {
  let current = '';

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach((link) => {
    const isActive = link.getAttribute('href') === `#${current}`;
    link.classList.toggle('nav__link--active', isActive);
    if (isActive) {
      link.setAttribute('aria-current', 'page');
    } else {
      link.removeAttribute('aria-current');
    }
  });
});
