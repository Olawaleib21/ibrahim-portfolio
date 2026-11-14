/**
 * COS 106 — Homepage JavaScript
 * Demonstrates DOM selection, event handling, functions, dynamic text updates,
 * conditional logic, and accessible navigation interactions.
 */
'use strict';

document.documentElement.classList.remove('no-js');

const menuToggle = document.getElementById('menuToggle');
const navigation = document.getElementById('primary-navigation');
const siteHeader = document.querySelector('.site-header');

// 1. Toggle the mobile navigation and keep ARIA state synchronized.
function setMenuOpen(isOpen) {
  if (!menuToggle || !navigation) return;
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute(
    'aria-label',
    isOpen ? 'Close navigation menu' : 'Open navigation menu',
  );
  navigation.classList.toggle('is-open', isOpen);
  document.body.classList.toggle('menu-open', isOpen);
}

if (menuToggle && navigation) {
  menuToggle.addEventListener('click', () => {
    setMenuOpen(menuToggle.getAttribute('aria-expanded') !== 'true');
  });

  // 2. Close when the user chooses a link or presses Escape.
  navigation.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => setMenuOpen(false));
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
      setMenuOpen(false);
      menuToggle.focus();
    }
  });
  document.addEventListener('click', (event) => {
    if (
      menuToggle.getAttribute('aria-expanded') === 'true' &&
      !navigation.contains(event.target) &&
      !menuToggle.contains(event.target)
    ) {
      setMenuOpen(false);
    }
  });
  window.addEventListener('resize', () => {
    if (window.innerWidth > 900) setMenuOpen(false);
  });
}

// 3. Add a subtle header border when scrolling.
function updateHeader() {
  if (siteHeader) siteHeader.classList.toggle('scrolled', window.scrollY > 16);
}
window.addEventListener('scroll', updateHeader, { passive: true });
updateHeader();

// 4. Reveal sections on scroll, respecting reduced motion preferences.
const revealElements = document.querySelectorAll('.reveal');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!reducedMotion && 'IntersectionObserver' in window) {
  document.documentElement.classList.add('reveal-enabled');
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.09, rootMargin: '0px 0px -30px 0px' },
  );
  revealElements.forEach((element) => observer.observe(element));
}

// 5. Keep copyright year current.
const yearElement = document.getElementById('year');
if (yearElement) yearElement.textContent = new Date().getFullYear();
