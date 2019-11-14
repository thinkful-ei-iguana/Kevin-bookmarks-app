import store from './store.js';
import api from './api.js';
import form from './form.js';

//for each bookmarks element generate element to put in html
const generateBookmarkList = function(bookmarks) {
  console.log(bookmarks.length);
  console.log(bookmarks[0]);
  console.log(bookmarks);
  const bookmarkItems = bookmarks.map(function(bookmark) {
    console.log(bookmark);
    let listTitle = bookmark.title;
    let listRating = bookmark.rating;
    let expandUrl = bookmark.url;
    let expandDescription = bookmark.desc;
    if (bookmark.expanded === false) {
      return `
        <li class="list-item" data-id="${bookmark.id}">
            <p class="${listTitle}">${listTitle}<span>Rating: ${listRating}</span></p>
            <button class="expand">Expand</button>
        </li>`; 
    } else {return `
            <li class="expanded-item" data-id="${bookmark.id}">
                <p class="${listTitle}">${listTitle}<span>Rating: ${listRating}</span> url: ${expandUrl}</p>
                <a href="${expandUrl}" class="button">Visit</a>
                <p>${expandDescription}</p>
                <button class="delete-bookmark">Delete</button>
                <button class="shrink">Shrink</button>
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

//check store.addBookmark for why its an array with length 0 but 2 things inside between here and the store.addBookmark fxn
const testFunction = function() {
  api.getBookmarks()
    .then((bookmarksData) => {
      bookmarksData.forEach((bookmark) => {
        store.addBookmark(bookmark);});
    });
};

//render bookmarks from api
const render = function() {
  testFunction();
  console.log(store.bookmarks);
  let bookmarks = store.bookmarks;
  if (store.filter > 0) {
    bookmarks = bookmarks.filter(bookmark => bookmark.rating >= store.filter);
  }
  console.log(bookmarks);
  let html;
  if (store.adding) {
    console.log('we are adding');
    html = `<form class="add-new">
      <label for="title">Site name</label>
      <input type="text" name="title" id="title" placeholder="example site" required>
      <label for="url">Site url</label>
      <input type="text" name="url" id="url" placeholder="http://example.com/" required>
      <label for="rating">Rating
      <input type="radio" name="rating" value="1" id="rating" required>1
      <input type="radio" name="rating" value="2" id="rating" required>2
      <input type="radio" name="rating" value="3" id="rating" required>3
      <input type="radio" name="rating" value="4" id="rating" required>4
      <input type="radio" name="rating" value="5" id="rating" required>5
      </label>
      <label for="desc"></label>
      <input class="description" type="text" name="desc" placeholder="add a description (optional)">
      <button class="cancel">Cancel</button>
      <input type="submit" class="create"></input>
    </form>`;
  }else{
    console.log('getting bookmarks')
    html = generateBookmarkList(bookmarks);}
  if (store.error) {
    renderError();
  }else $('main').html(html);
  //api.getBookmarks();
};

const getBookmarkIdFromElement = function(bookmark) {
  return $(bookmark).closest('li').data('id');
};

const handleExpandBookmark = function() {
  $('main').on('click', '.expand', event => {
    console.log(event.currentTarget);
    const id = getBookmarkIdFromElement(event.currentTarget);
    const bookmark = store.findById(id);
    //this is where we are getting a new error
    store.findAndUpdate(id, {expanded: !bookmark.expanded});
    render();
  });
};

const handleShrinkBookmark = function() {
  $('main').on('click', '.shrink', event => {
    const id = getBookmarkIdFromElement(event.currentTarget);
    const bookmark = store.findById(id);
    //because of the error on line 95 there is probably one here too
    store.findAndUpdate(id, {expanded: !bookmark.expanded});
    render();
  });
};

const handleAddBookmark = function() {
  $('#add-button').on('click', event => {
    $('#add-button').addClass('hidden');
    $('#add-label').addClass('hidden');
    store.adding = !store.adding;
    render();
  });
};

/* Preserving a working function
const handleCreateBookmark = function() {
  $('main').on('submit', '.add-new', (event => {
    event.preventDefault();
    console.log($('.add-new')[0]);
    let formElement = form.serializeJson($('.add-new')[0]);
    $('#add-button').removeClass('hidden');
    $('#add-label').removeClass('hidden');
    store.adding = !store.adding;
    //checking if object
    console.log(JSON.parse(formElement));
    store.addBookmark(JSON.parse(formElement));
    api.createBookmark(formElement);
    render();
  }));
};
*/

const handleCreateBookmark = function() {
  $('main').on('submit', '.add-new', (event => {
    event.preventDefault();
    console.log(form);
    let formElement = form.serializeJson($('.add-new')[0]);
    $('#add-button').removeClass('hidden');
    $('#add-label').removeClass('hidden');
    store.adding = !store.adding;
    //testing add key value pair on creation to fix button stuckness
    let expandTest = JSON.parse(formElement);
    expandTest.expanded = false;
    console.log(expandTest);
    //end test: it has the expanded property here
    store.addBookmark(expandTest);
    //The item now comes shrunk (good!) but the expand button does not work (bad!).  It also expands on a refresh
    api.createBookmark(formElement);
    render();
  }));
};

const handleCancelBookmark = function() {
  $('main').on('click', '.cancel', event => {
    event.preventDefault();
    $('#add-button').removeClass('hidden');
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
};

const handleDeleteBookmark = function() {
  $('main').on('click', '.delete-bookmark', event => {
    const id = getBookmarkIdFromElement(event.currentTarget);
    api.deleteBookmark(id)
      .then(() => {
        store.findAndDelete(id);
        render();
      })
      .catch((err) => {
        console.log(err);
        store.setError(err.message);
        renderError();
      });
  });
};

const bindEventListeners = function() {
  handleAddBookmark();
  handleExpandBookmark();
  handleShrinkBookmark();
  handleCloseError();
  handleCancelBookmark();
  handleSelectFilter();
  handleDeleteBookmark();
  handleCreateBookmark();
};

export default {
  render,
  bindEventListeners
};