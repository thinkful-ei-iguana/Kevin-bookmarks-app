const BASE_URL = 'https://thinkful-list-api.herokuapp.com/kevin/';

//NEEDS ARGS
const apiFetch = function() {
  let error;
  return fetch()
    .then(res => {
      if(!res.ok) {
        error = {code: res.status};
        if(!res.headers.get('content-type').includes('json')) {
          return Promise.reject(error);
        }
      }
      return res.json();
    })
    .then(data => {
      if (error) {
        error.message = data.message;
        return Promise.reject(error);
      }
      return data;
    });
};

const getBookmarks = function() {
  return apiFetch(`${BASE_URL}/bookmarks`);
};

const createBookmark = function(title) {
  const newBookmark = JSON.stringify({title});
  return apiFetch(`${BASE_URL}/bookmarks`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: newBookmark
  });
};

const deleteBookmark = function(id) {
  return apiFetch(BASE_URL + '/bookmarks/' +id, {
    method: 'DELETE'
  });
};

export {
  getBookmarks,
  createBookmark,
  deleteBookmark
};