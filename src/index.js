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

function searchImages(e) {
  e.preventDefault();
  resetResult();
  const {
    elements: { searchQuery },
  } = e.currentTarget;
  newApiService.page = 1;
  newApiService.query = searchQuery.value;
  newApiService.fetchImages().then(resultOfSerch).catch(onFetchError);
}

function hiddenBtn() {
  loadMoreBtn.classList.remove('hidden');
}

function resetResult() {
  gallery.innerHTML = '';
}

function resultOfSerch(data) {
  const images = data.hits;
  if (images.length === 0) {
    throw new Error();
  } else if (images.length >= newApiService.perPage) {
    mapSerchResult(images);
    hiddenBtn();
  } else {
    mapSerchResult(images);
    Notiflix.Notify.info(
      "We're sorry, but you've reached the end of search results."
    );
  }
}

function mapSerchResult(data) {
  const images = data
    .map(
      ({ webformatURL, tags, likes, views, comments, downloads }) =>
        `<img src="${webformatURL}" alt="${tags}" loading="lazy" />
<div class="info">
  <p class="info-item">
    <b>Likes</b>
    ${likes}
  </p>
  <p class="info-item">
    <b>Views</b>
    ${views}
  </p>
  <p class="info-item">
    <b>Comments</b>
    ${comments}
  </p>
  <p class="info-item">
    <b>Downloads</b>
    ${downloads}
  </p>
</div>`
    )
    .join('');
  gallery.insertAdjacentHTML('beforeend', images);
}

function onFetchError(error) {
  Notiflix.Notify.failure(
    'Sorry, there are no images matching your search query. Please try again.'
  );
}
