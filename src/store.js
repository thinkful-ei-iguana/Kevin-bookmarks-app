let bookmarks = [];
let adding = false;
let error = null;
let filter = 0;

const findById = function(id) {
  return this.bookmarks.find(currentBookmark => {
    console.log(currentBookmark);
    currentBookmark.id === id;});
};

const addBookmark = function(newBookmark) {
  this.bookmarks.push(newBookmark);
  console.log(Array.isArray(this.bookmarks));
};

const findAndDelete = function(id) {
  this.bookmarks = this.bookmarks.filter(currentBookmark => currentBookmark.id !== id);
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