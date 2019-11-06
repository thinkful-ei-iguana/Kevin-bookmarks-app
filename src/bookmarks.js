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
        <li class="list-item" data-id="${bookmark.id}">
            <p>${listTitle}<span>Rating: ${listRating}</span></p>
            <button class="expand">Expand</button>
        </li>`; 
    } else {return `
            <li class="expanded-item">
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

const generateError = function(message) {
  return ` <section class="error-content">
    <button id="cancel-error">X</button>
    <p>${message}</p>
    </section>`;
};

const renderError = function() {
  if (store.error) {
    const el = generateError(store.error);
    $('.error-container').html(el);
  } else {$('.error-container').empty();
  }
};

const handleCloseError = function() {
  $('.error-container').on('click', '#cancel-error', () => {
    store.setError(null);
    renderError();
  });
};

//render bookmarks from api
const render = function() {
  let bookmarks = store.bookmarks;
  const bookmarkString = generateBookmarkList(bookmarks);
  $('main').html(bookmarkString);
};

const getBookmarkIdFromElement = function(bookmark) {
  return $('.expand').closest('li').data('data-id')
};

//if expand button clicked, toggle expand in api, 
//update STORE, and rerender
const handleExpandBookmark = function() {
  $('main').find('.expand').on('click', event => {
    const id = getBookmarkIdFromElement(event.currentTarget);
    console.log(id);
    const bookmark = store.findById(id);
    api.updateBookmark(id, {expanded: !bookmark.expanded})
      .then(() => {
        store.findAndUpdate(id, {expanded: !bookmark.expanded});
      })
      .catch((err) => {
        store.setError(err.message);
        renderError();
      });
  });
  render();
};

const handleAddBookmark = function() {
  //If add button clicked, toggle adding to true in main object
};

const bindEventListeners = function() {
  handleAddBookmark();
  handleExpandBookmark();
};

//render will be exported when completed
export default {
  render,
  bindEventListeners
};