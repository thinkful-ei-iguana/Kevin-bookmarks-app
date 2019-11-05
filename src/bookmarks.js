import store from './store';
import api from './api';

//generate element to put in html
const generateBookmarkElement = {
    //if(store.bookmarks.rating >= selected rating)
};

//render bookmarks
const render = function() {
    let bookmarks = [store.bookmarks];
    //if rating >= selected rating
    const bookmarkString = 
}

const handleAddBookmark = function() {
    const blankAddForm = `
        <form action="add-new">
            <label for="title">Site name</label>
            <input type="text" name="title" id="title" placeholder="example site" required>
            <label for="url">Site url</label>
            <input type="text" name="url" id="url" placeholder="http://example.com/" required>
            <label for="rating">Rating</label>
            <input type="radio" name="rating" value="1" id="rating" required>1
            <input type="radio" name="rating" value="2" id="rating" required>2
            <input type="radio" name="rating" value="3" id="rating" required>3
            <input type="radio" name="rating" value="4" id="rating" required>4
            <input type="radio" name="rating" value="5" id="rating" required>5
            <label for="description"></label>
            <input type="text" name="description" placeholder="add a description (optional)">
        </form>
        <button class="cancel">Cancel</button>
        <button class="create">Create</button>`
    $('#add-button').on('click', event => {
        event.preventDefault();
        $('main').html(blankAddForm);
    });
}

const bindEventListners = function() {
    handleAddBookmark();
}

//render will be exported when completed
export default {
    bindEventListners
}