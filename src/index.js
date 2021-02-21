import './styles/styles.scss';
import * as basicLightbox from 'basiclightbox';
import galeryListTemplate from './template/gallery.hbs';
import ApiService from './js/apiService.js';
import Error from './js/errHandler.js';

const refs = {
  bodyElem: document.querySelector('body'),
  formSectionElem: document.querySelector('.form-section'),
  galleryElem: document.querySelector('.gallery'),
  searchFormElem: document.querySelector('.search-form'),
  btnLoadMore: document.querySelector('.btn-load-more'),
  btnToTop: document.querySelector('.btn-to-top'),
};

const apiService = new ApiService();
const error = new Error();

refs.searchFormElem.addEventListener('submit', onSearch);
refs.btnLoadMore.addEventListener('click', onLoadMore);
refs.btnToTop.addEventListener('click', toTop);
refs.galleryElem.addEventListener('click', onOpenModal);

let intElemOffsetHeight = 0;

async function onSearch(e) {
  e.preventDefault();
  apiService.query = e.currentTarget.elements.query.value;
  try {
    if (apiService.query === '') {
      error.errorOnSearch();
      return;
    }
    apiService.resetPage();
    apiService.fetchArticles().then(arrt => {
      if (arrt.length === 0) {
        error.errorOnSearch();
        return;
      }
      clearArtMarkup();
      appArtMarkup(arrt);
      if (arrt.length < 12) {
        refs.btnLoadMore.style.display = 'none';
        error.errorOnMore();
      } else {
          refs.btnLoadMore.style.display = 'block';
          refs.btnToTop.style.display = 'block';
      }
    });
  } catch (error) {
    console.log(error);
  }
}
async function onLoadMore() {
  try {
    apiService.fetchArticles().then(arrt => {
      intElemOffsetHeight = refs.galleryElem.offsetHeight;
      appArtMarkup(arrt);
      onScroll();
      if (arrt.length < 12) {
          refs.btnLoadMore.style.display = 'none';
          refs.btnToTop.style.display = 'block';
        error.errorOnMore();
      } else {
          refs.btnLoadMore.style.display = 'block';
          refs.btnToTop.style.display = 'block';
      }
    });
  } catch (error) {
    console.log(error);
  }
}
function appArtMarkup(hits) {
  refs.galleryElem.insertAdjacentHTML('beforeend', galeryListTemplate(hits));
}
function clearArtMarkup() {
  refs.galleryElem.innerHTML = '';
}
function onOpenModal(e) {
  if (e.target.nodeName !== 'IMG') {
    return;
  }
  const elem = e.target;
  const instance = basicLightbox.create(
    `<img src=${elem.getAttribute('data-url')}/>`,
  );
  instance.show();
}
async function onScroll() {
  try {
    window.scrollTo({
      top: intElemOffsetHeight + refs.formSectionElem.offsetHeight,
      behavior: 'smooth',
    });
  } catch (error) {
    console.log(error);
  }
}

function toTop() {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });

}