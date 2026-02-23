/* ===================================================
   BOXCAR CAFE - JavaScript
=================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- LOADER ---------- */
  const loader = document.getElementById('loader');
  const loaderLogo = document.getElementById('loaderLogo');
  const boxcarWrapper = document.getElementById('boxcarWrapper');

  // Show logo after boxcar arrives at center (~2.8s = 0.3s delay + 2.5s animation)
  setTimeout(() => {
    loaderLogo.classList.add('visible');
  }, 2200);

  // Stop wheel animation when boxcar stops
  setTimeout(() => {
    const wheels = boxcarWrapper.querySelectorAll('.wheel');
    wheels.forEach(w => w.style.animationPlayState = 'paused');
  }, 2800);

  // Hide loader
  setTimeout(() => {
    loader.classList.add('hidden');
    document.body.style.overflow = '';
  }, 4000);

  // Prevent scrolling during loader
  document.body.style.overflow = 'hidden';

  /* ---------- HEADER SCROLL ---------- */
  const header = document.getElementById('header');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    if (scrollY > 60) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    lastScroll = scrollY;
  });

  /* ---------- MOBILE MENU ---------- */
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  mobileToggle.addEventListener('click', () => {
    mobileToggle.classList.toggle('active');
    mobileMenu.classList.toggle('open');

    if (mobileMenu.classList.contains('open')) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  });

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileToggle.classList.remove('active');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  /* ---------- MENU TABS ---------- */
  const tabs = document.querySelectorAll('.menu-tab');
  const panels = document.querySelectorAll('.menu-panel');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;

      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));

      tab.classList.add('active');
      document.getElementById(target).classList.add('active');
    });
  });

  /* ---------- SMOOTH SCROLL ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = header.offsetHeight + 20;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ---------- SCROLL REVEAL ---------- */
  const revealElements = document.querySelectorAll(
    '.about-content, .about-images, .menu-card, .event-card, ' +
    '.visit-content, .visit-map, .feature-content, .contact-wrapper, ' +
    '.section-header'
  );

  revealElements.forEach(el => el.classList.add('reveal'));

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  /* ---------- CONTACT FORM ---------- */
  const contactForm = document.getElementById('contactForm');

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const btn = contactForm.querySelector('.btn');
    const originalText = btn.textContent;

    btn.textContent = 'Message Sent!';
    btn.style.background = '#4A7C59';

    setTimeout(() => {
      btn.textContent = originalText;
      btn.style.background = '';
      contactForm.reset();
    }, 3000);
  });

  /* ---------- STAGGER ANIMATION FOR GRID ITEMS ---------- */
  const staggerItems = document.querySelectorAll('.menu-card, .event-card');

  const staggerObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.transitionDelay = '0s';
        }, index * 100);
      }
    });
  }, { threshold: 0.1 });

  staggerItems.forEach((item, index) => {
    item.style.transitionDelay = `${index * 0.08}s`;
    staggerObserver.observe(item);
  });

});
