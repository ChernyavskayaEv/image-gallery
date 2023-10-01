const body = document.querySelector('.body');
const galeryTitle = document.querySelector('.title');
const searchContainer = document.querySelector('.search-container');
const form = document.querySelector('.search-form');
const formQuery = document.getElementById('form-query');
const resetButton = document.querySelector('.reset');
const imgContent = document.querySelector('.img-galery');
const errorRequest = document.querySelector('.error-request_container');
let imgColumns = document.querySelectorAll('.img-galery__column');

form.style.width = `${galeryTitle.clientWidth}px`;

const checkScreenWidth = (screenWidth) => {
  if (screenWidth <= 500) changeActiveImgColumns(1);
  if (screenWidth > 500 && screenWidth <= 950) changeActiveImgColumns(2);
  if (screenWidth > 950 && screenWidth <= 1204) changeActiveImgColumns(3);
  if (screenWidth > 1204) changeActiveImgColumns(4);
};

const changeActiveImgColumns = (i) => {
  imgColumns.forEach((item, index) => {
    item.classList.remove('visible');
    if (index < i) item.classList.add('visible');
  });
};

checkScreenWidth(body.offsetWidth);
window.addEventListener('resize', () => {
  checkScreenWidth(body.offsetWidth);
  imgColumns.forEach((column) => (column.textContent = ''));
  showData(imgCollection, query);
});

let query = 'nature';

let url = `https://api.unsplash.com/search/photos?query=${query}&per_page=40&client_id=yeTW-Vhxrf7GyzsxJmafm_O-RC3r_F4oFzOmKy8Y65I`;

let imgCollection;

const getData = async (url) => {
  const res = await fetch(url);
  const data = await res.json();
  imgCollection = data.results;

  showData(imgCollection, query);
};

getData(url);

const showData = (imgCollection, queryValue) => {
  let activeImgColumns = document.querySelectorAll(
    '.img-galery__column.visible'
  );
  let heightColumns;

  if (imgCollection.length > 0) {
    errorRequest.classList.add('hidden');
    const promises = [];
    imgCollection.forEach((item) => {
      heightColumns = [...activeImgColumns].map((item) => item.offsetHeight);
      let indexMinColumn = heightColumns.findIndex(
        (value) => value === Math.min(...heightColumns)
      );

      const img = document.createElement('img');
      img.classList.add('img-galery-item');
      img.src = `${item.urls.regular}`;
      img.alt = `${item.alt_description}`;
      [...activeImgColumns][indexMinColumn].append(img);
      promises.push(new Promise((resolve) => (img.onload = resolve)));
    });
    Promise.all(promises).then(() => {
      imgContent.style.height = `${Math.min(
        ...([...activeImgColumns]
          .map((item) => item.offsetHeight)
          .filter((v) => v) || 0)
      )}px`;
    });
  } else {
    document.querySelector(
      '.error-request'
    ).textContent = `There are no results for «${queryValue}».`;
    errorRequest.classList.remove('hidden');
  }
};

form.addEventListener('change', () => {
  resetButton.classList.remove('opacity');
});

form.addEventListener('click', (event) => {
  if (event.target.classList.contains('reset')) {
    event.target.classList.add('opacity');
    formQuery.focus();
  }
});

form.addEventListener('submit', (event) => {
  event.preventDefault();

  query = formQuery.value;
  if (query) {
    url = `https://api.unsplash.com/search/photos?query=${query}&per_page=30&orientation=squarish&client_id=yeTW-Vhxrf7GyzsxJmafm_O-RC3r_F4oFzOmKy8Y65I`;

    imgColumns.forEach((column) => (column.textContent = ''));
    getData(url);
  }
});

document.addEventListener('scroll', () => {
  if (galeryTitle.getBoundingClientRect().bottom < 0) {
    searchContainer.style.position = 'fixed';
  } else {
    searchContainer.style.position = '';
  }
});
