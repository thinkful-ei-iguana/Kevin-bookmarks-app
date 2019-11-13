import api from './api.js';
import store from './store.js';
import bookmarks from './bookmarks.js';

const main = function() {
  api.getBookmarks()
    .then((bookmarksData) => {
      bookmarksData.forEach((bookmark) => {
        store.addBookmark(bookmark);});
      bookmarks.render();
    });
  bookmarks.bindEventListeners();
  bookmarks.render();
};

$(main);