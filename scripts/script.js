const themeButtons = document.querySelectorAll('.header__theme-menu-button');

themeButtons.forEach((button) => {
  button.addEventListener('click', () => {
    themeButtons.forEach((btn) => {
      btn.classList.remove('header__theme-menu-button_active');
      btn.removeAttribute('disabled');
    });

    if (button.classList.contains('header__theme-menu-button_type_light')) {
      changeTheme('light');
    } else if (button.classList.contains('header__theme-menu-button_type_dark')) {
      changeTheme('dark');
    } else {
      changeTheme('auto');
    }

    button.classList.add('header__theme-menu-button_active');
    button.setAttribute('disabled', true);
  });
});

function changeTheme(theme) {
  document.body.classList.remove('theme_light', 'theme_dark', 'theme_auto');
  
  if (theme !== 'auto') {
    document.body.classList.add(`theme_${theme}`);
  }
  
  localStorage.setItem('theme', theme);
}

function initTheme() {
  const savedTheme = localStorage.getItem('theme') || 'auto';
  
  changeTheme(savedTheme);

  themeButtons.forEach((btn) => {
    btn.classList.remove('header__theme-menu-button_active');
    btn.removeAttribute('disabled');
  });

  const activeButton = document.querySelector(`.header__theme-menu-button_type_${savedTheme}`);
  if (activeButton) {
    activeButton.classList.add('header__theme-menu-button_active');
    activeButton.setAttribute('disabled', true);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  
  const images = document.querySelectorAll('img[loading="lazy"]');
  
  if ('loading' in HTMLImageElement.prototype) {
    images.forEach(img => {
      img.loading = 'lazy';
    });
  } else {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          imageObserver.unobserve(img);
        }
      });
    });

    images.forEach(img => {
      img.dataset.src = img.src;
      img.src = '';
      imageObserver.observe(img);
    });
  }
});