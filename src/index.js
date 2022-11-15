import './css/styles.css';
import Notiflix from 'notiflix';
import NewApiService from './js/fetchImages';
// import SimpleLightbox from "simplelightbox";
// import "simplelightbox/dist/simple-lightbox.min.css";
const form = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
const newApiService = new NewApiService();

form.addEventListener('submit', searchImages);

loadMoreBtn.addEventListener('click', onLoadMore);

function onLoadMore() {
  newApiService.fetchImages().then(resultOfSerch).catch(onFetchError);
}

function searchImages(e) {
  e.preventDefault();
  resetResult();
  const {
    elements: { searchQuery },
  } = e.currentTarget;
  const totalHits = localStorage.getItem('total-hits');
  if (!searchQuery.value) {
    resetResult();
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    return;
  }
  newApiService.page = 1;
  newApiService.query = searchQuery.value;
  newApiService.fetchImages();
//   let lightbox = new SimpleLightbox('.gallery a', {captionsData: 'alt', captionDelay: '250'});
// lightbox.refresh();
}

function resetResult() {
  newApiService.addHiddenBtn();

  gallery.innerHTML = '';
}

