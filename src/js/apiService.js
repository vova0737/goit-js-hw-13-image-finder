import { error } from '@pnotify/core';

export default class ApiService {
  constructor() {
    this.searchQuery = '';
    this._page = 1;
  }
  async fetchArticles() {
    const KEY = '20353486-11ecb503bec0da706377a3524';
    const SEARCH_URL = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${KEY}`;
    return fetch(SEARCH_URL)
      .then(resolve => {
        return resolve.json();
      })
      .then(data => {
        this._page += 1;
        return data.hits;
      });
  }
  resetPage() {
    this._page = 1;
  }
  get query() {
    return this.searchQuery;
  }
  get page() {
    return this._page;
  }
  set query(newSearchQuery) {
    this.searchQuery = newSearchQuery;
  }
}
