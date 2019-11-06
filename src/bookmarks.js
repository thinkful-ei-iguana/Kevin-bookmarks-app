import store from './store.js';
import api from './api.js';

//for each bookmarks element generate element to put in html
const generateBookmarkList = function(bookmarks) {
  const bookmarkItems = bookmarks.map(function(bookmark) {
    let listTitle = bookmark.title;
    let listRating = bookmark.rating;
    let expandUrl = bookmark.url;
    let expandDescription = bookmark.description;
    if (bookmark.expanded === false) {
      return `
        <li>
            <p>${listTitle}<span>Rating: ${listRating}</span></p>
            <button class="expand">Expand</button>
        </li>`; 
    } else {return `
            <li>
                <p>${listTitle}<span>Rating: ${listRating}</span></p>
                <button class="delete-bookmark">Delete</button>
                <p class="bookmark-url">url: ${expandUrl}</p>
                <button class="link">Visit Site</button>
                <p>${expandDescription}</p>
            </li>`;
    }
  });
  return `<ul class="bookmark-list">
  ${bookmarkItems.join('')}
  </ul>`;
};

//render bookmarks from store!
const render = function() {
  let bookmarks = store.bookmarks;
  const bookmarkString = generateBookmarkList(bookmarks);
  $('main').html(bookmarkString);
  //add change to view if expanded
};

const handleExpandBookmark = function() {
  //If expand button clicked, toggle expand in STORE and rerender
  $('main').find('.expand').on('click', function() {
    //toggle expanded at the right bookmarks index
  });
  render();
};

const handleAddBookmark = function() {
  //If add button clicked, toggle adding to true in main object
};

const bindEventListeners = function() {
  handleAddBookmark();
};

//render will be exported when completed
export default {
  render,
  bindEventListeners
};