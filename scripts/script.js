(function setupTheme() {
  const theme = localStorage.getItem('theme');
  if (theme) {
    applyTheme(theme);
  }
})();

document.addEventListener('DOMContentLoaded', () => {
  const currentTheme = [...document.documentElement.classList]
    .find((cn) => cn.startsWith('theme-'))
    ?.replace('theme-', '');
  const themeButtons = [
    ...document.querySelectorAll('.header__theme-menu-button'),
  ];
  markActiveButton(themeButtons, currentTheme);

  themeButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const chosenTheme = [...button.classList]
        .find((cn) => cn.includes('_type_'))
        .split('_type_')[1];
      applyTheme(chosenTheme);
      markActiveButton(themeButtons, chosenTheme);
    });
  });
});

function applyTheme(theme) {
  document.documentElement.className = '';
  document.documentElement.classList.add(`theme-${theme}`);
  localStorage.setItem('theme', theme);
}

function markActiveButton(buttons, theme) {
  buttons.forEach((button) => {
    const buttonTheme = [...button.classList]
      .find((cn) => cn.includes('_type_'))
      .split('_type_')[1];
    if (buttonTheme === theme) {
      button.classList.add('header__theme-menu-button_active');
      button.disabled = true;
    } else {
      button.classList.remove('header__theme-menu-button_active');
      button.disabled = false;
    }
  });
}