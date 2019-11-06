import api from './api.js';
import store from './store.js';

const main = function() {
  api.getBookmarks()
    .then((bookmarks) => {
      bookmarks.forEach((bookmark) => store.addBookmark(bookmarks));
      bookmarks.render();
    });
    console.log('Trying to log first bookmark');
    console.log(store.bookmarks[0]);
  bookmarks.bindEventListeners();
  bookmarks.render();
};

$(main);