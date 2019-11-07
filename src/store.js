let bookmarks = [];
let adding = false;
let error = null;
let filter = 0;

const findById = function(id) {
  return this.bookmarks.find(currentBookmark => currentBookmark.id === id);
};

const addBookmark = function(newBookmark) {
  console.log('inside addBookmark: ');
  console.log(newBookmark);
  this.bookmarks.push(newBookmark);
};

const findAndDelete = function(id) {
  this.bookmarks = this.items.filter(currentBookmark => currentBookmark.id !== id);
};

const toggleExpand = function() {
  this.expanded = !this.expanded;
};

const findAndUpdate = function (id, newData) {
  const currentBookmark = this.findById(id);
  Object.assign(currentBookmark, newData);
};

const setError = function(error) {
  this.error = error;
};

//hook up add button

//hook up select field

export default {
  bookmarks,
  adding,
  error,
  filter,
  findById,
  addBookmark,
  findAndDelete,
  findAndUpdate,
  toggleExpand,
  setError
}