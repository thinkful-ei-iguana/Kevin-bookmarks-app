import store from './store.js';
import api from './api.js';
import form from './form.js';

const generateBookmarkList = function(bookmarks) {
  const bookmarkItems = bookmarks.map(function(bookmark) {
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

const render = function() {
  let bookmarks = Object.values(store.bookmarks);
  if (store.filter > 0) {
    bookmarks = bookmarks.filter(bookmark => bookmark.rating >= store.filter);
  }
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
    html = generateBookmarkList(bookmarks);}
  if (store.error) {
    renderError();
  }else $('main').html(html);
};

const getBookmarkIdFromElement = function(bookmark) {
  return $(bookmark).closest('li').data('id');
};

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
    $('#add-button').addClass('hidden');
    $('#add-label').addClass('hidden');
    store.adding = !store.adding;
    render();
  });
};

const handleCreateBookmark = function() {
  $('main').on('submit', '.add-new', (event => {
    event.preventDefault();
    let formElement = form.serializeJson($('.add-new')[0]);
    $('#add-button').removeClass('hidden');
    $('#add-label').removeClass('hidden');
    store.adding = !store.adding;
    let expandTest = JSON.parse(formElement);
    expandTest.expanded = false;
    api.createBookmark(formElement)
      .then(store.addBookmark)
      .then(render)
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