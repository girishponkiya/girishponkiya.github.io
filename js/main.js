(function () {
  const root = document.documentElement;

  // Theme toggle
  const themeButton = document.getElementById('theme-toggle');
  if (themeButton) {
    const themeIcon = themeButton.querySelector('i');

    function systemTheme() {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    function applyTheme(theme) {
      root.setAttribute('data-theme', theme);
      if (themeIcon) {
        themeIcon.className = theme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
      }
      themeButton.title = theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';
      themeButton.setAttribute('aria-pressed', theme === 'dark');
    }

    const savedTheme = localStorage.getItem('theme');
    applyTheme(savedTheme || systemTheme());

    themeButton.addEventListener('click', () => {
      const nextTheme = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      localStorage.setItem('theme', nextTheme);
      applyTheme(nextTheme);
    });

    // Listen for OS theme changes if user hasn't explicitly set a preference
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem('theme')) {
        applyTheme(e.matches ? 'dark' : 'light');
      }
    });
  }

  // Cards toggle
  const cardsButton = document.getElementById('cards-toggle');
  if (cardsButton) {
    const cardsIcon = cardsButton.querySelector('i');

    function applyCards(tinted) {
      root.setAttribute('data-style', tinted ? 'tinted' : 'clear');
      if (cardsIcon) {
        cardsIcon.className = tinted ? 'fa-solid fa-droplet' : 'fa-solid fa-droplet-slash';
      }
      cardsButton.title = tinted ? 'Switch to clear' : 'Switch to tinted';
      cardsButton.classList.toggle('active', !tinted);
      cardsButton.setAttribute('aria-pressed', !tinted);
    }

    const savedStyle = localStorage.getItem('style');
    applyCards(savedStyle !== 'clear');

    cardsButton.addEventListener('click', () => {
      const isClear = root.getAttribute('data-style') === 'clear';
      const newTinted = isClear;
      localStorage.setItem('style', newTinted ? 'tinted' : 'clear');
      applyCards(newTinted);
    });
  }

  // Email obfuscation (Option B)
  const emailLink = document.getElementById('email-link');
  if (emailLink) {
    const user = 'girish.isical';
    const domain = 'gmail.com';
    emailLink.href = 'mailto:' + user + '@' + domain;
  }

  // FAB Section Navigation logic
  const fabNav = document.getElementById('fab-nav');
  const fabBtn = document.getElementById('fab-btn');
  const fabMenu = document.getElementById('fab-menu');
  const profileCard = document.getElementById('profile');
  const fabItems = document.querySelectorAll('.fab-item');
  const sections = document.querySelectorAll('.ios-card[id]');

  if (fabNav) {
    fabNav.classList.add('visible');
  }

  // Toggle FAB menu
  if (fabBtn && fabMenu) {
    fabBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = fabMenu.classList.toggle('open');
      fabBtn.classList.toggle('open', isOpen);
    });

    // Close menu when clicking outside or selecting an item
    document.addEventListener('click', (e) => {
      if (!fabNav.contains(e.target)) {
        fabMenu.classList.remove('open');
        fabBtn.classList.remove('open');
      }
    });

    fabItems.forEach((item) => {
      item.addEventListener('click', () => {
        fabMenu.classList.remove('open');
        fabBtn.classList.remove('open');
      });
    });
  }

  // Active section highlighting
  if (sections.length > 0 && fabItems.length > 0) {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          fabItems.forEach((item) => {
            if (item.getAttribute('href') === '#' + id) {
              item.classList.add('active');
            } else {
              item.classList.remove('active');
            }
          });
        }
      });
    }, { rootMargin: '-20% 0px -70% 0px' });

    sections.forEach((section) => sectionObserver.observe(section));
  }
})();
