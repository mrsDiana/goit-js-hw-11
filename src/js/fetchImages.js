export default class NewApiService {
  constructor() {
    this.serchQuery = '';
    this.page = 1;
    this.perPage = 40;
  }

  fetchImages() {
    const BASE_URL = 'https://pixabay.com';
    const KEY = '31283318-f84bd36e26b769e2b71141abe';
    return fetch(
      `${BASE_URL}/api/?key=${KEY}&q=${this.serchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=${this.perPage}`
    ).then(response => {
      if (!response.ok) {
        throw new Error();
      }
      this.page += 1;
      return response.json();
    });
  }
  get query() {
    return this.serchQuery;
  }

  set query(newQuery) {
    this.serchQuery = newQuery;
  }
}
