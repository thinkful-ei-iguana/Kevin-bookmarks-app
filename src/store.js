let bookmarks = [{
  id: 'x56w',
  title: 'Title 1',
  rating: 3,
  url: 'http://www.title1.com',
  description: 'lorem ipsum dolor sit',
  expanded: false
},
{
  id: '6ffw',
  title: 'Title 2',
  rating: 5,
  url: 'http://www.title2.com',
  description: 'dolorum tempore deserunt',
  expanded: false
},
{
  id: '5t89',
  title: 'Title 3',
  rating: 1,
  url: 'http://www.title3.com',
  description: 'ipso facto expecto patronum',
  expanded: false
} 
];
let adding = false;
let error = null;
let filter = 0;

/*bookmarks should have {
    id: from api
    title: something
    url: http://www.something.com
    description: optional
    rating: 1-5
    expanded: true or false
} */

const findById = function(id) {
  return this.bookmarks.find(currentBookmark => currentBookmark.id === id);
};

const addBookmark = function(newBookmark) {
  this.store.bookmarks.push(newBookmark);
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