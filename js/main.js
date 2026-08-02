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

  // Print date formatting: d/Mon/yyyy hh:mm am/pm "timezone" (e.g. 2/Aug/2026 03:56 pm IST)
  function getFormattedPrintDate() {
    const now = new Date();
    const day = now.getDate();
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = monthNames[now.getMonth()];
    const year = now.getFullYear();

    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12;
    const formattedHours = String(hours).padStart(2, '0');

    let timeZone = '';
    try {
      const parts = new Intl.DateTimeFormat('en-US', { timeZoneName: 'short' }).formatToParts(now);
      const tzPart = parts.find(p => p.type === 'timeZoneName');
      timeZone = tzPart ? tzPart.value : '';

      const tzMap = {
        'GMT+5:30': 'IST', 'UTC+5:30': 'IST',
        'GMT-5': 'EST',    'UTC-5': 'EST',
        'GMT-8': 'PST',    'UTC-8': 'PST',
        'GMT+1': 'CET',    'UTC+1': 'CET',
        'GMT+9': 'JST',    'UTC+9': 'JST',
        'GMT+0': 'UTC',    'UTC+0': 'UTC'
      };
      if (tzMap[timeZone]) timeZone = tzMap[timeZone];
    } catch (e) {
      timeZone = '';
    }

    return `${day}/${month}/${year} ${formattedHours}:${minutes} ${ampm} ${timeZone}`.trim();
  }

  // Print handler: Automatically expand all <details> accordions and set true @page bottom-left margin box date
  window.addEventListener('beforeprint', () => {
    document.querySelectorAll('details').forEach((detail) => {
      detail.dataset.wasOpen = detail.open;
      detail.open = true;
    });

    const formattedDate = getFormattedPrintDate();
    let printStyle = document.getElementById('dynamic-print-style');
    if (!printStyle) {
      printStyle = document.createElement('style');
      printStyle.id = 'dynamic-print-style';
      document.head.appendChild(printStyle);
    }
    printStyle.textContent = `
      @media print {
        @page {
          @bottom-left {
            content: "Printed: ${formattedDate}";
            font-size: 0.68rem;
            color: #666666;
            font-family: system-ui, -apple-system, sans-serif;
          }
        }
      }
    `;
  });

  window.addEventListener('afterprint', () => {
    document.querySelectorAll('details').forEach((detail) => {
      if (detail.dataset.wasOpen === 'false') {
        detail.open = false;
      }
      delete detail.dataset.wasOpen;
    });
  });
})();
