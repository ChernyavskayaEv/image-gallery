const body = document.querySelector('.body');
const mainContent = document.querySelector('.img-galery');
let imgColumns = document.querySelectorAll('.img-galery__column');

const checkScreenWidth = (screenWidth) => {
  if (screenWidth <= 770) changeActiveImgColumns(1);
  if (screenWidth > 770 && screenWidth <= 950) changeActiveImgColumns(2);
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
  showData(imgCollection);
});

const query = 'winter';

const url = `https://api.unsplash.com/search/photos?query=${query}&per_page=40&client_id=yeTW-Vhxrf7GyzsxJmafm_O-RC3r_F4oFzOmKy8Y65I`;

let imgCollection;

const getData = async (url) => {
  const res = await fetch(url);
  const data = await res.json();
  imgCollection = data.results;

  showData(imgCollection);
};

getData(url);

const showData = (imgCollection) => {
  let activeImgColumns = document.querySelectorAll(
    '.img-galery__column.visible'
  );
  let heightColumns;

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
  });
  mainContent.style.height = `${Math.min(...heightColumns)}px`;
};
