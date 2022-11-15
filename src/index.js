import './css/styles.css';
import Notiflix from 'notiflix';
import NewApiService from './js/fetchImages';
const form = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
const newApiService = new NewApiService();

form.addEventListener('submit', searchImages);

loadMoreBtn.addEventListener('click', onLoadMore);

function onLoadMore() {
  newApiService.fetchImages().then(resultOfSerch).catch(onFetchError);
}

async function searchImages(e) {
  e.preventDefault();
  resetResult();
  const {
    elements: { searchQuery },
  } = e.currentTarget;
  if (!searchQuery.value) {
    resetResult();
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    return;
  }
  newApiService.page = 1;
  newApiService.query = searchQuery.value;
  const fetchImg = await newApiService.fetchImages();
  const promise = await 
  Notiflix.Notify.info(
    `Hooray! We found ${newApiService.totalHits} images.`
  );
}

function resetResult() {
  gallery.innerHTML = '';
}