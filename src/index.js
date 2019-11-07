import api from './api.js';
import store from './store.js';
import bookmarks from './bookmarks.js';

const main = function() {
  api.getBookmarks()
    .then((bookmarksData) => {
      console.log('prior to function: ');
      console.log(bookmarksData);
      bookmarksData.forEach((bookmark) => {
        console.log('inside forEach:');
        console.log(bookmark)
        store.addBookmark(bookmark);});
      bookmarks.render();
    });
  bookmarks.bindEventListeners();
  bookmarks.render();
};

$(main);