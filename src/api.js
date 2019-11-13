const BASE_URL = 'https://thinkful-list-api.herokuapp.com/kevin';

const apiFetch = function(...args) {
  let error;
  return fetch(...args)
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

const createBookmark = function(formData) {
  //this is logging correctly
  console.log(formData);
  return apiFetch(`${BASE_URL}/bookmarks`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: formData
  });
};

const updateBookmark = function(id, updateData) {
  const newData = JSON.stringify(updateData);
  return apiFetch(`${BASE_URL}/items/${id}`, {
    method: 'PATCH',
    headers: {'Content-Type': 'application/json'},
    body: newData
  });
}

const deleteBookmark = function(id) {
  return apiFetch(BASE_URL + '/bookmarks/' +id, {
    method: 'DELETE'
  });
};

export default {
  getBookmarks,
  createBookmark,
  deleteBookmark,
  updateBookmark
};