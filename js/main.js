    const root = document.documentElement;
    const themeButton = document.getElementById('theme-toggle');
    const themeIcon = themeButton.querySelector('i');
    function systemTheme() {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    function applyTheme(theme) {
      root.setAttribute('data-theme', theme);
      themeIcon.className = theme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
      themeButton.title = theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';
    }

    const savedTheme = localStorage.getItem('theme');
    applyTheme(savedTheme || systemTheme());

    // Cards toggle
    const cardsButton = document.getElementById('cards-toggle');
    const cardsIcon = cardsButton.querySelector('i');
    function applyCards(tinted) {
      root.setAttribute('data-style', tinted ? 'tinted' : 'clear');
      cardsIcon.className = tinted ? 'fa-solid fa-droplet' : 'fa-solid fa-droplet-slash';
      cardsButton.title = tinted ? 'Switch to clear' : 'Switch to tinted';
      cardsButton.classList.toggle('active', !tinted);
    }
    const savedStyle = localStorage.getItem('style');
    applyCards(savedStyle !== 'clear');
    cardsButton.addEventListener('click', () => {
      const next = root.getAttribute('data-style') !== 'clear';
      localStorage.setItem('style', next ? 'clear' : 'tinted');
      applyCards(!next);
    });

    themeButton.addEventListener('click', () => {
      const nextTheme = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      localStorage.setItem('theme', nextTheme);
      applyTheme(nextTheme);
    });
