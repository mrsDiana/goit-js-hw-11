import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
const axios = require('axios').default;
export default class NewApiService {
  constructor() {
    this.serchQuery = '';
    this.page = 1;
    this.perPage = 5;
    this.gallery = document.querySelector('.gallery');
    this.loadMoreBtn = document.querySelector('.load-more');
  }
   async fetchImages() {
    const BASE_URL = 'https://pixabay.com';
    const KEY = '31283318-f84bd36e26b769e2b71141abe';
    try {
      const response = await axios.get(
        `${BASE_URL}/api/?key=${KEY}&q=${this.serchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=${this.perPage}`
      );
      const data = await this.resultOfSerch(response.data);
      this.page += 1;
      return data;
    } catch (error) {
    console.log(error);
       return Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
    }
  };

 resultOfSerch(data) {
//   let lightbox = new SimpleLightbox('.gallery a', {captionsData: 'alt', captionDelay: '250'});
// lightbox.refresh();
  
  localStorage.setItem('total-hits', data.totalHits);
  const images=data.hits;
    if (images.length === 0) {
      throw new Error();
    } else if (images.length >= this.perPage) {
      this.mapSerchResult(images);
      this.removeHiddenBtn();
      if (this.page === 1) {
        Notiflix.Notify.info(
          `Hooray! We found ${data.totalHits} images.`
        );
      }
    } else {
      this.mapSerchResult(images);
      Notiflix.Notify.info(
        "We're sorry, but you've reached the end of search results."
      );
      this.addHiddenBtn();
      if (this.page === 1) {
        Notiflix.Notify.info(
          `Hooray! We found ${data.totalHits} images.`
        );
      }
    }
  }

  mapSerchResult(data) {
    const images = data
      .map(
        ({ webformatURL, tags, likes, views, comments, downloads,largeImageURL}) =>
          `<div class="photo-card">
          <a href="${largeImageURL}"><img src="${webformatURL}" alt="${tags}" loading="lazy" /></a>
          
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
  </div>
  </div>`
      )
      .join('');
    this.gallery.insertAdjacentHTML('beforeend', images);
  }

  removeHiddenBtn() {
    this.loadMoreBtn.classList.remove('hidden');
  }
  
  addHiddenBtn() {
    this.loadMoreBtn.classList.add('hidden');
  }

  get query() {
    return this.serchQuery;
  }

  set query(newQuery) {
    this.serchQuery = newQuery;
  }
}
