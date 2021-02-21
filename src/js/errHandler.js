import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/Material.css';
import { error } from '@pnotify/core';

export default class Error {
  constructor() {
    this.textNoFound = 'No such images found!';
    this.textNoMore = 'No more images to load!';
  }
  errorOnSearch() {
    return error({
      text: this.textNoFound,
      // title: 'ERROR',
      styling : 'material',
      delay: 2000,
      maxTextHeight: null,
      sticker: false,
    });
  }
  errorOnMore() {
    return error({
      text: this.textNoMore,
      // title: 'ERROR',
      styling : 'material',
      delay: 2000,
      maxTextHeight: null,
      sticker: false,
    });
  }
}
