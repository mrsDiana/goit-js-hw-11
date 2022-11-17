import './css/styles.css';
import Notiflix from 'notiflix';
import NewApiService from './js/fetchImages';
import scrollBy from './js/scroll';
const form = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
const newApiService = new NewApiService();

form.addEventListener('submit', searchImages);

// loadMoreBtn.addEventListener('click', onLoadMore);

async function onLoadMore() {
  const fetchImg = await newApiService.fetchImages();
  const infiniteScroll = await loading.classList.remove('show');
  const scroll = await  scrollBy.scroll ();
  
}

function searchImages(e) {
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
  newApiService.query = searchQuery.value.trim();
  newApiService.fetchImages();
}

function resetResult() {
  // newApiService.addHiddenBtn();
  gallery.innerHTML = '';
}


/* Infinite Scroll*/
const loading = document.querySelector('.loading');
window.addEventListener('scroll', () => {
	const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
	
	console.log( { scrollTop, scrollHeight, clientHeight });
	
	if(clientHeight + scrollTop >= scrollHeight - 1) {
		showLoading();
	}
});

function showLoading() {
	loading.classList.add('show');
	setTimeout(onLoadMore, 1000)
} 
