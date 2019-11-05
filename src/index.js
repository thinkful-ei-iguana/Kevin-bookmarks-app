//import statements
import api from './api';
import store from './store';

const main = function() {
  api.getBookmarks()
    .then((bookmarks) => {
      bookmarks.forEach((bookmark) => store.addBookmark(bookmarks));
      //RENDER FUNCTION
    });
};
//call the main function