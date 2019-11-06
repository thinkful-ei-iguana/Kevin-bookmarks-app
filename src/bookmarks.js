import store from './store.js';
import api from './api.js';

//generate element to put in html
const generateBookmarkElement = function(bookmarks) {
  let listTitle = store.bookmarks.title;
  let listRating = store.bookmarks.rating;
  return `<ul class="bookmark-list">
        <li>
            <p>${listTitle}<span>${listRating}</span></p>
            <button>Expand</button>
        </li>`;
};

console.log(generateBookmarkElement(store.bookmarks));

const generateBookmarkString = function(bookmarks) {
  const bookmarkList = store.bookmarks.map((bookmark) => generateBookmarkElement(bookmark));
  return bookmarkList.join('');
};

//render bookmarks from store!
const render = function() {
  let bookmarks = [store.bookmarks];
  const bookmarkString = generateBookmarkString(bookmarks);
  $('main').html(bookmarkString);
};

const handleExpandBookmark = function() {
  //If expand button clicked, toggle expand in STORE and rerender
  render();
};

const handleAddBookmark = function() {
  //If add button clicked, toggle adding to true in main object
};

const bindEventListners = function() {
  handleAddBookmark();
};

//render will be exported when completed
export default {
  render,
  bindEventListners
};