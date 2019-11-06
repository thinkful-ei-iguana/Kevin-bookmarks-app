import api from './api';
import store from './store';
import bookmarks from './store';
import $ from 'jquery';

const main = function() {
  api.getBookmarks()
    .then((bookmarks) => {
      bookmarks.forEach((bookmark) => store.addBookmark(bookmarks));
      bookmarks.render();
    });
  bookmarks.bindEventListeners();
  bookmarks.render();
};

$(main);