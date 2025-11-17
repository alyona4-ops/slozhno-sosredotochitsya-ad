const themeButtons = document.querySelectorAll('.header__theme-menu-button');

themeButtons.forEach((button) => {
  button.addEventListener('click', () => {
    themeButtons.forEach((btn) => {
      btn.classList.remove('header__theme-menu-button_active');
      btn.disabled = false;
    });

    if (button.classList.contains('header__theme-menu-button_type_light')) {
      document.body.className = 'page theme_light';
    } else if (button.classList.contains('header__theme-menu-button_type_dark')) {
      document.body.className = 'page theme_dark';
    } else {
      document.body.className = 'page';
    }

    button.classList.add('header__theme-menu-button_active');
    button.disabled = true;
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme') || 'auto';
  
  if (savedTheme === 'light') {
    document.body.className = 'page theme_light';
  } else if (savedTheme === 'dark') {
    document.body.className = 'page theme_dark';
  } else {
    document.body.className = 'page';
  }

  themeButtons.forEach((btn) => {
    btn.classList.remove('header__theme-menu-button_active');
    btn.disabled = false;
  });

  const activeButton = document.querySelector(`.header__theme-menu-button_type_${savedTheme}`);
  if (activeButton) {
    activeButton.classList.add('header__theme-menu-button_active');
    activeButton.disabled = true;
  }
});