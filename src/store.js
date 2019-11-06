const store = {
  bookmarks: [{
    id: 'x56w',
    title: 'Title 1',
    rating: 3,
    url: 'http://www.title1.com',
    description: 'lorem ipsum dolor sit',
    expanded: false
  },   {
    id: '6ffw',
    title: 'Title 2',
    rating: 5,
    url: 'http://www.title2.com',
    description: 'dolorum tempore deserunt',
    expanded: false
  } 
  ],
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
    expanded: true or false
} */

const addBookmark = function(title) {
  this.store.bookmarks.push(title);
};

export default {
  store
};