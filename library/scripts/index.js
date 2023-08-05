const nav = document.querySelector('.header__nav');
const bodyContent = document.querySelector('.body');
const headerNavBtn = document.querySelector('.header__nav-btn');

const hiddenNav = () => {
  headerNavBtn.classList.remove('header__nav-btn_active');
  nav.classList.remove('header__nav_active');
};

document.addEventListener('DOMContentLoaded', () => {
  bodyContent.addEventListener('click', (event) => {
    if (event.target.closest('.header__nav-btn')) {
      event.preventDefault();
      headerNavBtn.classList.toggle('header__nav-btn_active');
      nav.classList.toggle('header__nav_active');
    }
    if (
      event.target.closest('.header__link') ||
      event.target.closest('.main')
    ) {
      hiddenNav();
    }
  });
  document.addEventListener('keyup', function (event) {
    if (event.code === 'Escape') {
      hiddenNav();
    }
  });
});
