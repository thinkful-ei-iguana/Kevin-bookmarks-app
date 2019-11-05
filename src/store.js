const store = {
  bookmarks: [],
  adding: false,
  error: null,
  filter: 0
};

/*bookmarks should have {
    id: from CUID
    title: something
    url: http://www.something.com
    description: optional
    rating: 1-5
} */

const addBookmark = function(title) {
    this.store.bookmarks.push(title);
};

export {
    store
}