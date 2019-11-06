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
            <p class="${listTitle}">${listTitle}<span>Rating: ${listRating}</span></p>
            <button class="expand">Expand</button>
        </li>`; 
    } else {return `
            <li class="expanded-item" data-id="${bookmark.id}">
                <p class="${listTitle}">${listTitle}<span>Rating: ${listRating}</span></p>
                <button class="delete-bookmark">Delete</button>
                <button class="shrink">Shrink</button>
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

//add to the front of html by 'html = `<div> ${store.error} </div>` + html
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
  if (store.filter > 0) {
    bookmarks = bookmarks.filter(bookmark => bookmark.rating >= store.filter);
  }
  let html;
  if (store.adding) {html = `<form action="add-new">
      <label for="title">Site name</label>
      <input type="text" name="title" id="title" placeholder="example site" required>
      <label for="url">Site url</label>
      <input type="text" name="url" id="url" placeholder="http://example.com/" required>
      <label for="rating">Rating</label>
      <input type="radio" name="rating" value="1" id="rating" required>1
      <input type="radio" name="rating" value="2" id="rating" required>2
      <input type="radio" name="rating" value="3" id="rating" required>3
      <input type="radio" name="rating" value="4" id="rating" required>4
      <input type="radio" name="rating" value="5" id="rating" required>5
      <label for="description"></label>
      <input type="text" name="description" placeholder="add a description (optional)">
    </form>
    <button class="cancel">Cancel</button>
    <button class="create">Create</button>`;
  }else {html = generateBookmarkList(bookmarks);}
  if (store.error) {
    renderError();
  }else $('main').html(html);
};

const getBookmarkIdFromElement = function(bookmark) {
  return $(bookmark).closest('li').data('id');
};

//if expand button clicked, toggle expand in api, 
//update STORE, and rerender
const handleExpandBookmark = function() {
  $('main').on('click', '.expand', event => {
    const id = getBookmarkIdFromElement(event.currentTarget);
    const bookmark = store.findById(id);
    store.findAndUpdate(id, {expanded: !bookmark.expanded});
    render();
  });
};

const handleShrinkBookmark = function() {
  $('main').on('click', '.shrink', event => {
    const id = getBookmarkIdFromElement(event.currentTarget);
    const bookmark = store.findById(id);
    store.findAndUpdate(id, {expanded: !bookmark.expanded});
    render();
  });
};

const handleAddBookmark = function() {
  $('#add-button').on('click', event => {
    store.adding = !store.adding;
    render();
  });
};

const handleCancelBookmark = function() {
  $('main').on('click', '.cancel', event => {
    store.adding = !store.adding;
    render();
  });
};

const handleSelectFilter = function() {
  $('#filter').on('change', event => {
    let filterValue = $('#filter').val();
    store.filter = filterValue;
    render();
  });
}

const bindEventListeners = function() {
  handleAddBookmark();
  handleExpandBookmark();
  handleShrinkBookmark();
  handleCloseError();
  handleCancelBookmark();
  handleSelectFilter();
};

//render will be exported when completed
export default {
  render,
  bindEventListeners
};