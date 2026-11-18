/* =========================================================
   Natalie Aponte Portfolio — script.js
   ---------------------------------------------------------
   1. Theme toggle (remembered between pages)
   2. Reveal sections on scroll
   3. Two Truths & a Lie card flips
   4. Falling leaves easter egg
   5. Heart cursor follower
   6. Footer year
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {
  setUpThemeToggle();
  setUpMobileMenu();
  setUpScrollReveal();
  setUpCards();
  setUpLeaves();
  setUpCursor();
  setFooterYear();
});


/* ---------- 1. Theme toggle ---------- */
function setUpThemeToggle() {
  const toggles = document.querySelectorAll('.theme-toggle');
  const STORAGE_KEY = 'portfolio-theme';

  function applyTheme(isWarm) {
    document.body.classList.toggle('warm', isWarm);
    toggles.forEach((btn) => {
      btn.textContent = isWarm ? '☀️' : '🌙';
      btn.setAttribute('aria-pressed', String(isWarm));
    });
  }

  // Load the saved theme so it carries over between pages
  let saved = null;
  try { saved = localStorage.getItem(STORAGE_KEY); } catch (e) { /* storage unavailable */ }
  applyTheme(saved === 'warm');

  toggles.forEach((btn) => {
    btn.addEventListener('click', () => {
      const isWarm = !document.body.classList.contains('warm');
      applyTheme(isWarm);
      try { localStorage.setItem(STORAGE_KEY, isWarm ? 'warm' : 'default'); } catch (e) { /* ignore */ }
    });
  });
}


/* ---------- 1b. Mobile menu (☰ button on small screens) ---------- */
function setUpMobileMenu() {
  const nav = document.querySelector('.nav');
  const button = document.querySelector('.menu-toggle');
  if (!nav || !button) return;

  function setOpen(open) {
    nav.classList.toggle('open', open);
    button.setAttribute('aria-expanded', String(open));
    button.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    button.textContent = open ? '✕' : '☰';
  }

  button.addEventListener('click', () => setOpen(!nav.classList.contains('open')));

  // close the menu after tapping a link
  nav.querySelectorAll('.nav-links a').forEach((link) => {
    link.addEventListener('click', () => setOpen(false));
  });
}


/* ---------- 2. Reveal sections on scroll ---------- */
function setUpScrollReveal() {
  const sections = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) return; // old browsers: just show everything

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.remove('is-hidden');
        observer.unobserve(entry.target); // only animate once
      }
    });
  }, { threshold: 0.15 });

  sections.forEach((section) => {
    section.classList.add('is-hidden');
    observer.observe(section);
  });
}


/* ---------- 3. Card flips ---------- */
function setUpCards() {
  document.querySelectorAll('.card').forEach((card) => {
    card.addEventListener('click', () => {
      const flipped = card.classList.toggle('flipped');
      card.setAttribute('aria-pressed', String(flipped));
    });
  });
}


/* ---------- 4. Falling leaves easter egg ---------- */
function setUpLeaves() {
  const logo = document.querySelector('.logo');
  if (!logo) return;

  logo.addEventListener('click', () => {
    for (let i = 0; i < 30; i++) createLeaf();
  });
}

function createLeaf() {
  const leaf = document.createElement('div');
  leaf.className = 'leaf';
  leaf.textContent = '🍂';
  leaf.style.left = Math.random() * 100 + 'vw';
  leaf.style.fontSize = (Math.random() * 24 + 16) + 'px';
  leaf.style.animationDuration = (Math.random() * 2 + 3) + 's';
  leaf.style.animationDelay = (Math.random() * 0.8) + 's';

  document.body.appendChild(leaf);
  leaf.addEventListener('animationend', () => leaf.remove());
}


/* ---------- 5. Heart cursor follower ---------- */
function setUpCursor() {
  const cursor = document.querySelector('.custom-cursor');
  const hasMouse = window.matchMedia('(pointer: fine)').matches;
  if (!cursor || !hasMouse) return; // skip on phones & tablets

  document.documentElement.classList.add('has-mouse'); // hides the normal arrow (see style.css)

  document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    cursor.classList.add('active');
  });

  document.addEventListener('mouseleave', () => cursor.classList.remove('active'));
  document.addEventListener('mousedown', () => cursor.classList.add('pressed'));
  document.addEventListener('mouseup', () => cursor.classList.remove('pressed'));
}


/* ---------- 6. Footer year ---------- */
function setFooterYear() {
  const year = new Date().getFullYear();
  document.querySelectorAll('.year').forEach((el) => { el.textContent = year; });
}
