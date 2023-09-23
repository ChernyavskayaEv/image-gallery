document.addEventListener('DOMContentLoaded', () => {
  //consts for burger menu
  const nav = document.querySelector('.header__nav');
  const bodyContent = document.querySelector('.body');
  const headerNavBtn = document.querySelector('.header__nav-btn');

  const hiddenNav = () => {
    headerNavBtn.classList.remove('header__nav-btn_active');
    nav.classList.remove('header__nav_active');
  };

  //const for authorization menu
  const profileMenu = document.querySelector('.profile__menu');

  const hiddenProfileMenu = () => {
    profileMenu.classList.remove('profile__menu_active');
  };

  //const for window LOG IN, REGISTER, Profile, buy-card
  const fixedOverlay = document.querySelector('.fixed-overlay');
  const modalLogIn = document.querySelector('.modal__login');
  const modalRegister = document.querySelector('.modal__register');
  const modalProfile = document.querySelector('.modal_profile');
  const modalBuyCard = document.querySelector('.modal__buy-card');

  const openModalLogin = () => {
    fixedOverlay.classList.remove('hidden');
    modalLogIn.classList.remove('hidden');
    setTimeout(() => {
      fixedOverlay.classList.remove('opacity');
      modalLogIn.classList.remove('opacity');
    }, 100);
  };

  const openModalRegister = () => {
    fixedOverlay.classList.remove('hidden');
    modalRegister.classList.remove('hidden');
    setTimeout(() => {
      fixedOverlay.classList.remove('opacity');
      modalRegister.classList.remove('opacity');
    }, 100);
  };

  const closeModalWindows = () => {
    fixedOverlay.classList.add('opacity');
    modalRegister.classList.add('opacity');
    modalLogIn.classList.add('opacity');
    modalProfile.classList.add('opacity');
    modalBuyCard.classList.add('opacity');
    setTimeout(() => {
      fixedOverlay.classList.add('hidden');
      modalRegister.classList.add('hidden');
      modalLogIn.classList.add('hidden');
      modalProfile.classList.add('hidden');
      modalBuyCard.classList.add('hidden');
    }, 1000);
  };

  //consts for carousel in the About block
  const photoGallerySlider = document.querySelector('.photo-gallery-slider');
  const sliderPaginationItems = photoGallerySlider.querySelectorAll(
    '.about__slider_item'
  );
  const arrowSliderLeft = photoGallerySlider.querySelector('.left');
  const arrowSliderRight = photoGallerySlider.querySelector('.right');

  //consts for slider in Favorites block
  const favoritesBooks = document.querySelectorAll('.favorites__books');

  //consts for profile-menu
  const iconInitialsUser = document.querySelector('.header__icon-name');
  const iconImg = document.querySelector('.header__icon-img');
  const profileMenuTitle = document.querySelector('.profile__menu-title');
  const profileMenuCard = document.querySelector('.profile__menu-card');
  const profileMenuLogIn = document.querySelector('.log-in');
  const profileMenuRegister = document.querySelector('.register');
  const profileMenuProfile = document.querySelector('.my-profile');
  const profileMenuLogOut = document.querySelector('.log-out');

  //--------
  bodyContent.addEventListener('click', (event) => {
    console.log(event.target);

    //burger menu
    if (event.target.closest('.header__nav-btn')) {
      event.preventDefault();
      hiddenProfileMenu();
      headerNavBtn.classList.toggle('header__nav-btn_active');
      nav.classList.toggle('header__nav_active');
    }
    if (
      event.target.closest('.header__link') ||
      event.target.closest('.main') ||
      event.target.closest('.profile__menu-item')
    ) {
      hiddenNav();
      hiddenProfileMenu();
    }

    //Authorization menu when clicking on the user icon
    if (event.target.closest('.header__icon')) {
      event.preventDefault();
      profileMenu.classList.add('profile__menu_active');
      hiddenNav();
    }

    //Modal window LOG IN
    if (
      event.target.closest('.log-in') ||
      event.target.closest('.librarycard__login-button') ||
      (event.target.classList.contains('book__button') &&
        !document
          .querySelector('.profile__menu-title')
          .classList.contains('hidden'))
    ) {
      openModalLogin();
    }

    //Modal window REGISTER
    if (
      event.target.closest('.register') ||
      event.target.closest('.librarycard__signup-button')
    ) {
      openModalRegister();
    }

    if (event.target.closest('.modal__login_register')) {
      if (event.target.closest('.modal__register')) {
        closeModalWindows();
        setTimeout(() => {
          openModalLogin();
        }, 1100);
      } else {
        closeModalWindows();
        setTimeout(() => {
          openModalRegister();
        }, 1100);
      }
    }

    //Modal window My Profile
    if (event.target.classList.contains('my-profile')) {
      fixedOverlay.classList.remove('hidden');
      modalProfile.classList.remove('hidden');
      setTimeout(() => {
        fixedOverlay.classList.remove('opacity');
        modalProfile.classList.remove('opacity');
      }, 100);
    }

    //Modal window Buy Card
    if (
      event.target.classList.contains('book__button') &&
      !iconInitialsUser.classList.contains('hidden') &&
      !iconInitialsUser.classList.contains('buyCardTrue')
    ) {
      fixedOverlay.classList.remove('hidden');
      modalBuyCard.classList.remove('hidden');
      setTimeout(() => {
        fixedOverlay.classList.remove('opacity');
        modalBuyCard.classList.remove('opacity');
      }, 100);
    }

    //closing modal windows
    if (
      event.target.classList.contains('fixed-overlay') ||
      event.target.closest('.close-btn')
    ) {
      closeModalWindows();
    }

    //copy user card
    if (event.target.classList.contains('icon_copy')) {
      let cardNumber = document.querySelector('.card-number').innerHTML;
      navigator.clipboard.writeText(cardNumber);
    }

    //Carousel in the About block (1 stage)
    if (event.target.closest('.about')) {
      let activeSlider = document.querySelector('.active');

      let orderActiveSlider =
        [...sliderPaginationItems].findIndex(
          (item) => item == activeSlider.closest('.about__slider_item')
        ) + 1;

      let currentPositionSliders = document
        .querySelector('.about__photo-gallery_items')
        .style.transform.match(/-?\d+/gm)[0];

      let orderNewSlider;

      if (event.target.closest('.about__slider_item')) {
        orderNewSlider =
          [...sliderPaginationItems].findIndex(
            (item) => item == event.target.closest('.about__slider_item')
          ) + 1;
      }

      if (event.target.closest('.left')) {
        orderNewSlider = orderActiveSlider - 1;
      }

      if (event.target.closest('.right')) {
        orderNewSlider = orderActiveSlider + 1;
      }

      let necessaryShiftSlider = orderNewSlider - orderActiveSlider;
      let newPositionSliders =
        currentPositionSliders - necessaryShiftSlider * 475;

      const moveSlider = () => {
        document.querySelector(
          '.about__photo-gallery_items'
        ).style.transform = `translateX(${newPositionSliders}px)`;
      };

      moveSlider();

      activeSlider.classList.remove('active');
      sliderPaginationItems[orderNewSlider - 1].firstElementChild.classList.add(
        'active'
      );

      if (orderNewSlider > 1 && orderNewSlider < 5) {
        arrowSliderLeft.removeAttribute('disabled');
        arrowSliderRight.removeAttribute('disabled');
      }

      if (orderNewSlider === 1) {
        arrowSliderLeft.setAttribute('disabled', 'disabled');
      }

      if (orderNewSlider === 5) {
        arrowSliderRight.setAttribute('disabled', 'disabled');
      }
    }

    //Slider in Favorites block (1 stage)

    if (
      event.target.id === 'winter' ||
      event.target.id === 'spring' ||
      event.target.id === 'summer' ||
      event.target.id === 'autumn'
    ) {
      const season = event.target.id;
      favoritesBooks.forEach((books) => {
        books.classList.add('opacity');
        setTimeout(() => {
          books.classList.add('hidden');
          document.querySelector(`.${season}`).classList.remove('hidden');
        }, 1000);
      });
      setTimeout(() => {
        document.querySelector(`.${season}`).classList.remove('opacity');
      }, 1100);
    }
  });

  document.addEventListener('keyup', (event) => {
    if (event.code === 'Escape') {
      hiddenNav();
      hiddenProfileMenu();
      closeModalWindows();
    }
  });

  //user data
  const symbols = '0123456789ABCDEF';
  const getCardNumber = () =>
    Array.from(
      new Array(9),
      (x) => symbols[Math.floor(Math.random() * 16)]
    ).join('');

  class User {
    constructor({ first_name, last_name, email, password }) {
      this.first_name = first_name;
      this.last_name = last_name;
      this.email = email;
      this.cardNumber = getCardNumber();
      this.password = password;
      this.books = [];
      this.visits = 1;
      this.bonuses = 0;
      this.buyCard = false;
    }
  }

  const storage = window.localStorage;

  const saveUser = (userData) => {
    const { cardNumber, email } = userData;
    storage.setItem(email, JSON.stringify(userData));
    let cardMapStr = storage.getItem('cardsMapping');
    const cardMap = cardMapStr ? JSON.parse(cardMapStr) : {};
    cardMap[cardNumber] = email;
    storage.setItem('cardsMapping', JSON.stringify(cardMap));
  };

  const getUser = (value) => {
    let userData = storage.getItem(value);
    if (!userData) {
      const cardMapStr = storage.getItem('cardsMapping');
      if (!cardMapStr) return;
      const cardMap = JSON.parse(cardMapStr);
      const email = cardMap[value];
      if (!email) return;
      userData = storage.getItem(email);
    }
    return JSON.parse(userData);
  };

  //active account

  const activeAccount = (user) => {
    let initialsUser = `${user.first_name[0].toUpperCase()}${user.last_name[0].toUpperCase()}`;

    iconImg.classList.add('hidden');
    iconInitialsUser.textContent = initialsUser;
    iconInitialsUser.setAttribute(
      'title',
      `${user.first_name} ${user.last_name}`
    );
    iconInitialsUser.classList.remove('hidden');

    profileMenuTitle.classList.add('hidden');
    profileMenuLogIn.classList.add('hidden');
    profileMenuRegister.classList.add('hidden');
    profileMenuCard.classList.remove('hidden');
    profileMenuProfile.classList.remove('hidden');
    profileMenuLogOut.classList.remove('hidden');

    fillMyProfile(user);

    logOut(user);

    //buy library card
    const formBuyCard = document.querySelector('.modal__buy-card');

    const buyingCard = (event) => {
      event.preventDefault();

      let errorBuyCard = formBuyCardValidate(formBuyCard);

      if (errorBuyCard === 0) {
        user.buyCard = true;
        iconInitialsUser.classList.add('buyCardTrue');
        saveUser(user);
        formBuyCard.reset();
        closeModalWindows();
      }
    };

    const formBuyCardValidate = (formBuyCard) => {
      let error = 0;
      let buyCardReqs = document.querySelectorAll('.card-req');

      for (let buyCardReq of buyCardReqs) {
        formRemoveError(buyCardReq);
        if (
          buyCardReq.classList.contains('number-card-data') &&
          [...buyCardReq.value].length !== 16
        ) {
          formAddError(buyCardReq);
          error++;
        } else if (
          buyCardReq.classList.contains('expiration-code-data-month') &&
          [...buyCardReq.value].length !== 2
        ) {
          formAddError(buyCardReq);
          error++;
        } else if (
          buyCardReq.classList.contains('expiration-code-data-year') &&
          [...buyCardReq.value].length !== 2
        ) {
          formAddError(buyCardReq);
          error++;
        } else if (
          buyCardReq.classList.contains('cvc-card-data') &&
          [...buyCardReq.value].length !== 3
        ) {
          formAddError(buyCardReq);
          error++;
        } else {
          if (buyCardReq.value === '') {
            formAddError(buyCardReq);
            error++;
          }
        }
      }
      return error;
    };

    formBuyCard.addEventListener('submit', buyingCard);

    //buy books
  };

  //fill My Profile
  const modalProfileInitials = document.querySelector(
    '.modal_profile__initials'
  );
  const modalProfilefullName = document.querySelector(
    '.modal_profile__fullname'
  );
  const modalProfileScoreVisitsisits = document.querySelector(
    '.modal_profile__score-visits'
  );
  const modalProfileScoreBonuses = document.querySelector(
    '.modal_profile__score-bonuses'
  );
  const modalProfileScoreBooks = document.querySelector(
    '.modal_profile__score-books'
  );
  const modalProfileListBooks = document.querySelector('.list-books');
  const modalProfileCardNumber = document.querySelector('.card-number');

  const fillMyProfile = (user) => {
    modalProfileInitials.textContent = `${user.first_name[0].toUpperCase()}${user.last_name[0].toUpperCase()}`;
    modalProfilefullName.textContent = `${user.first_name} ${user.last_name}`;
    modalProfileScoreVisitsisits.textContent = user.visits;
    modalProfileScoreBonuses.textContent = user.bonuses;
    modalProfileScoreBooks.textContent = user.books.length;
    if (user.buyCard) {
      iconInitialsUser.classList.add('buyCardTrue');
    }
    if (user.books.length > 0) {
      console.log([...user.books]);
    }
    if (user.books.length === 0) {
      modalProfileListBooks.textContent = '';
    }
    modalProfileCardNumber.textContent = user.cardNumber;
  };

  //log out
  const logOut = (user) => {
    profileMenuLogOut.addEventListener('click', (event) => {
      iconImg.classList.remove('hidden');
      iconInitialsUser.textContent = '';
      iconInitialsUser.removeAttribute('title');
      iconInitialsUser.classList.add('hidden');
      iconInitialsUser.classList.remove('buyCardTrue');
      profileMenuTitle.classList.remove('hidden');
      profileMenuLogIn.classList.remove('hidden');
      profileMenuRegister.classList.remove('hidden');
      profileMenuCard.classList.add('hidden');
      profileMenuProfile.classList.add('hidden');
      profileMenuLogOut.classList.add('hidden');
    });
  };

  //registering (2 stage)
  const formRegister = document.querySelector('.modal__register');

  const registering = (event) => {
    event.preventDefault();

    let errorRegister = formRegisterValidate(formRegister);

    let registeringData = new FormData(formRegister);

    if (errorRegister === 0) {
      const user = new User({
        first_name: registeringData.get('register-first-name'),
        last_name: registeringData.get('register-last-name'),
        email: registeringData.get('register-email'),
        password: registeringData.get('register-password'),
      });
      saveUser(user);
      formRegister.reset();
      closeModalWindows();
      activeAccount(user);
    }
  };

  const formRegisterValidate = (formRegister) => {
    let error = 0;
    let registerReqs = document.querySelectorAll('.register-req');

    for (let registerReq of registerReqs) {
      formRemoveError(registerReq);

      if (registerReq.classList.contains('register-email')) {
        if (emailTest(registerReq)) {
          formAddError(registerReq);
          error++;
        }
      } else if (
        registerReq.classList.contains('register-password') &&
        [...registerReq.value].length < 8
      ) {
        formAddError(registerReq);
        error++;
      } else {
        if (registerReq.value === '') {
          formAddError(registerReq);
          error++;
        }
      }
    }
    return error;
  };

  formRegister.addEventListener('submit', registering);

  //authorization (3 stage)
  const formLogIn = document.querySelector('.modal__login');

  const authorization = (event) => {
    event.preventDefault();

    let errorAuthorization = formLogInValidate(formLogIn);

    let authorizationData = new FormData(formLogIn);

    if (errorAuthorization === 0) {
      let emailOrCard = authorizationData.get('login-email-or-card');
      let password = authorizationData.get('login-password');
      let authorizedUser = getUser(emailOrCard);

      if (authorizedUser && authorizedUser.password === password) {
        authorizedUser.visits += 1;
        saveUser(authorizedUser);
        formLogIn.reset();
        closeModalWindows();
        activeAccount(authorizedUser);
      }
    }
  };

  const formLogInValidate = (formLogIn) => {
    let error = 0;
    let logInReqs = document.querySelectorAll('.login-req');

    for (let logInReq of logInReqs) {
      formRemoveError(logInReq);

      if (
        logInReq.classList.contains('login-password') &&
        [...logInReq.value].length < 8
      ) {
        formAddError(logInReq);
        error++;
      } else {
        if (logInReq.value === '') {
          formAddError(logInReq);
          error++;
        }
      }
    }
    return error;
  };

  formLogIn.addEventListener('submit', authorization);

  const formAddError = (validatedField) => {
    validatedField.classList.add('error');
  };

  const formRemoveError = (validatedField) => {
    validatedField.classList.remove('error');
  };

  const emailTest = (validatedField) => {
    return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(
      validatedField.value
    );
  };

  const form = document.querySelector('.form-library-card');

  form.addEventListener('click', (event) => {
    console.log(event.target);

    event.preventDefault();
  });
});
