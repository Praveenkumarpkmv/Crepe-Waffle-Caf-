(function() {
  'use strict';

  const root = document.documentElement;

  // ----------------------------------------------------
  // DARK MODE (Header Icon + Mobile Drawer Toggle)
  // ----------------------------------------------------
  function setDarkMode(isDark) {
    if (isDark) {
      root.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
    }
    syncThemeUI(isDark);
  }

  function syncThemeUI(isDark) {
    document.querySelectorAll('.theme-toggle-btn, #theme-toggle').forEach(function(btn) {
      const text = btn.querySelector('.toggle-text');
      const icon = btn.querySelector('.toggle-icon');
      if (text) text.textContent = isDark ? 'Light Mode' : 'Dark Mode';
      if (icon) icon.textContent = isDark ? '☀️' : '🌙';
      const sunIcon = btn.querySelector('.sun-icon');
      const moonIcon = btn.querySelector('.moon-icon');
      if (sunIcon && moonIcon) {
        sunIcon.style.display = isDark ? 'none' : 'block';
        moonIcon.style.display = isDark ? 'block' : 'none';
      }
      btn.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
      btn.setAttribute('title', isDark ? 'Switch to light mode' : 'Switch to dark mode');
    });
  }

  // Initialize theme from storage
  if (localStorage.getItem('theme') === 'dark') {
    setDarkMode(true);
  } else {
    syncThemeUI(false);
  }

  // ----------------------------------------------------
  // RTL DIRECTION (Header Icon + Mobile Drawer Toggle)
  // ----------------------------------------------------
  function setRtl(isRtl) {
    if (isRtl) {
      root.setAttribute('dir', 'rtl');
      localStorage.setItem('dir', 'rtl');
    } else {
      root.removeAttribute('dir');
      localStorage.setItem('dir', 'ltr');
    }
    syncRtlUI(isRtl);
  }

  function syncRtlUI(isRtl) {
    document.querySelectorAll('.rtl-toggle-btn, #rtl-toggle').forEach(function(btn) {
      const text = btn.querySelector('.toggle-text');
      if (text) text.textContent = isRtl ? 'LTR Mode' : 'RTL Mode';
      btn.setAttribute('aria-label', isRtl ? 'Switch to LTR text direction' : 'Switch to RTL text direction');
      btn.setAttribute('title', isRtl ? 'Switch to LTR text direction' : 'Switch to RTL text direction');
    });
  }

  // Initialize RTL from storage
  if (localStorage.getItem('dir') === 'rtl') {
    setRtl(true);
  } else {
    syncRtlUI(false);
  }

  // ----------------------------------------------------
  // GLOBAL CLICK EVENT DELEGATION FOR TOGGLES
  // ----------------------------------------------------
  document.addEventListener('click', function(e) {
    const themeBtn = e.target.closest('#theme-toggle, .theme-toggle-btn');
    if (themeBtn) {
      const isCurrentlyDark = root.getAttribute('data-theme') === 'dark';
      setDarkMode(!isCurrentlyDark);
      return;
    }

    const rtlBtn = e.target.closest('#rtl-toggle, .rtl-toggle-btn');
    if (rtlBtn) {
      const isCurrentlyRtl = root.getAttribute('dir') === 'rtl';
      setRtl(!isCurrentlyRtl);
      return;
    }
  });

  // ----------------------------------------------------
  // MOBILE NAVIGATION DRAWER & BACKDROP
  // ----------------------------------------------------
  const mobileNav = document.getElementById('mobile-nav');
  const backdrop = document.getElementById('mobile-backdrop');

  function openMobileNav() {
    if (mobileNav) mobileNav.classList.add('open');
    if (backdrop) backdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileNav() {
    if (mobileNav) mobileNav.classList.remove('open');
    if (backdrop) backdrop.classList.remove('open');
    document.body.style.overflow = '';
  }

  document.addEventListener('click', function(e) {
    if (e.target.closest('#mobile-menu-toggle')) {
      e.preventDefault();
      openMobileNav();
    } else if (e.target.closest('#mobile-close') || e.target === backdrop) {
      e.preventDefault();
      closeMobileNav();
    } else if (e.target.closest('#mobile-nav a')) {
      // Let the link navigate, close the drawer
      closeMobileNav();
    }
  });

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closeMobileNav();
    }
  });

  // ----------------------------------------------------
  // DESKTOP DROPDOWN ACCESSIBILITY
  // ----------------------------------------------------
  const dropbtn = document.querySelector('.dropdown .dropbtn');
  if (dropbtn) {
    dropbtn.addEventListener('click', function(e) {
      e.preventDefault();
      const expanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', !expanded);
    });
  }

  // ----------------------------------------------------
  // CONTACT & BOOKING FORM HANDLER
  // ----------------------------------------------------
  const form = document.getElementById('enquiry-form');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      const feedback = document.getElementById('form-feedback');
      if (feedback) {
        feedback.style.display = 'block';
        form.reset();
        setTimeout(function() {
          feedback.style.display = 'none';
        }, 4500);
      }
    });
  }

  // ----------------------------------------------------
  // MENU FILTER TABS
  // ----------------------------------------------------
  const filterBtns = document.querySelectorAll('.filter-btn');
  if (filterBtns.length > 0) {
    filterBtns.forEach(function(btn) {
      btn.addEventListener('click', function() {
        filterBtns.forEach(function(b) {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });
        this.classList.add('active');
        this.setAttribute('aria-selected', 'true');
        const filter = this.getAttribute('data-filter');
        const cards = document.querySelectorAll('.menu-grid .menu-card');
        cards.forEach(function(card) {
          if (filter === 'all' || card.getAttribute('data-category') === filter) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

})();
