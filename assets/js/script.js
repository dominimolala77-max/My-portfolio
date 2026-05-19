/* ════════════════════════════════════════════════════
   DOMINICK MOLALA — PROFESSIONAL PORTFOLIO SCRIPT
   ════════════════════════════════════════════════════ */

/* ── MOBILE MENU ──────────────────────────────────── */
let mobileMenu = null;

function buildMobileMenu() {
  if (mobileMenu) return;

  mobileMenu = document.createElement('nav');
  mobileMenu.className = 'mobile-menu';
  mobileMenu.id = 'mobileMenu';
  mobileMenu.setAttribute('role', 'navigation');
  mobileMenu.setAttribute('aria-label', 'Mobile menu');

  const links = document.querySelectorAll('.nav-links .nav-link');
  links.forEach(link => {
    const a = document.createElement('a');
    a.href = link.href;
    a.textContent = link.textContent;
    if (link.classList.contains('active')) a.classList.add('active');
    a.addEventListener('click', () => {
      closeMenu();
    });
    mobileMenu.appendChild(a);
  });

  const cta = document.createElement('a');
  cta.href = '#contact';
  cta.textContent = 'Hire Me / Book Call';
  cta.style.color = '#00F2FE';
  cta.style.fontWeight = '700';
  cta.addEventListener('click', closeMenu);
  mobileMenu.appendChild(cta);

  document.body.appendChild(mobileMenu);
}

function toggleMenu() {
  buildMobileMenu();
  const isOpen = mobileMenu.classList.contains('open');
  if (isOpen) {
    closeMenu();
  } else {
    mobileMenu.classList.add('open');
    document.body.style.overflow = 'hidden';
    const menuToggle = document.getElementById('menuToggle');
    if (menuToggle) menuToggle.setAttribute('aria-expanded', 'true');
  }
}

function closeMenu() {
  if (!mobileMenu) return;
  mobileMenu.classList.remove('open');
  document.body.style.overflow = '';
  const menuToggle = document.getElementById('menuToggle');
  if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
}

// Close on Escape key
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeMenu();
});

/* ── SELECT SERVICE HELPER ────────────────────────── */
function selectService(serviceValue) {
  const selectEl = document.getElementById('serviceSelect');
  const messageEl = document.getElementById('message');
  if (selectEl) {
    selectEl.value = serviceValue;
  }
  if (messageEl) {
    setTimeout(() => {
      messageEl.focus();
    }, 600);
  }
}

/* ── SCROLL-TRIGGERED FADE-IN ─────────────────────── */
function initScrollAnimations() {
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
  );

  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
}

/* ── ACTIVE NAV STATE (SCROLL-BASED) ──────────────── */
function updateActiveNav() {
  const links = document.querySelectorAll('.nav-links .nav-link');
  const sections = document.querySelectorAll('[id]');

  let current = '';

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;

    if (window.scrollY >= sectionTop - 250) {
      current = section.getAttribute('id');
    }
  });

  links.forEach(link => {
    link.classList.remove('active');
    const href = link.getAttribute('href').substring(1);
    if (href === current) {
      link.classList.add('active');
    }
  });

  if (mobileMenu) {
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href').substring(1);
      if (href === current) {
        link.classList.add('active');
      }
    });
  }
}

/* ── EXPANDABLE SECTIONS ──────────────────────────── */
function toggleExpand(headerEl) {
  const content = headerEl.nextElementSibling;
  headerEl.classList.toggle('expanded');
  content.classList.toggle('show');

  if (content.classList.contains('show')) {
    content.style.maxHeight = content.scrollHeight + 100 + 'px';
  } else {
    content.style.maxHeight = '0';
  }
}

/* ── SKILL BAR ANIMATION ──────────────────────────── */
function initSkillBars() {
  const bars = document.querySelectorAll('.skill-bar');
  if (!bars.length) return;

  const barObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
          barObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.4 }
  );

  bars.forEach(bar => barObserver.observe(bar));
}

/* ── NAVBAR SCROLL EFFECT ─────────────────────────── */
function initNavScroll() {
  const nav = document.querySelector('.nav');
  if (!nav) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      nav.style.background = 'rgba(11, 15, 25, 0.9)';
      nav.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.6)';
      nav.style.borderColor = 'rgba(255, 255, 255, 0.15)';
    } else {
      nav.style.background = 'rgba(11, 15, 25, 0.65)';
      nav.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.4)';
      nav.style.borderColor = 'rgba(255, 255, 255, 0.08)';
    }
  }, { passive: true });
}

/* ── CONTACT FORM ─────────────────────────────────── */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const success = document.getElementById('formSuccess');
  const submitBtn = document.getElementById('submitBtn');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();

    const original = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Processing Inquiry...';
    submitBtn.disabled = true;

    // Simulate reliable async submission
    setTimeout(() => {
      submitBtn.innerHTML = original;
      submitBtn.disabled = false;
      form.reset();
      if (success) {
        success.style.display = 'block';
        success.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        setTimeout(() => { success.style.display = 'none'; }, 8000);
      }
    }, 1500);
  });
}

/* ── INIT ─────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.getElementById('menuToggle');
  if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');

  initScrollAnimations();
  initSkillBars();
  initNavScroll();
  initContactForm();
  updateActiveNav();

  window.addEventListener('scroll', updateActiveNav, { passive: true });

  // Trigger animations for initial hero items
  setTimeout(() => {
    document.querySelectorAll('.fade-up').forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.95) {
        el.classList.add('visible');
      }
    });
  }, 100);
});
