import $ from 'jquery';

import store from './store';
import api from './api';

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

console.log(generateBookmarkElement(store.bookmarks[0]));

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

const handleAddBookmark = function() {
    
};

const bindEventListners = function() {
  handleAddBookmark();
};

//render will be exported when completed
export default {
  render,
  bindEventListners
};