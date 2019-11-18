let bookmarks = {};
let adding = false;
let error = null;
let filter = 0;

const findById = function(id) {
  return bookmarks[id];
};

const addBookmark = function(newBookmark) {
  newBookmark.expanded = false;
  bookmarks[newBookmark.id] = newBookmark;
};

const findAndDelete = function(id) {
  delete bookmarks[id];
};

const findAndUpdate = function (id, newData) {
  const currentBookmark = findById(id);
  Object.assign(currentBookmark, newData);
};

const setError = function(error) {
  this.error = error;
};

export default {
  bookmarks,
  adding,
  error,
  filter,
  findById,
  addBookmark,
  findAndDelete,
  findAndUpdate,
  setError
}