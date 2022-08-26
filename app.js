// importing other stuff, utility functions for:
// working with supabase:
import { checkAuth, signOutUser, addComment, getAllComments, updateCommentsInRealtime } from './fetch-utils.js';
import { renderComments } from './render-utils.js';
// pure rendering (data --> DOM):

/*  "boiler plate" auth code */
// checking if we have a user! (will redirect to auth if not):
checkAuth();
// can optionally return the user:
// const user = checkAuth();

// sign out link:
const signOutLink = document.getElementById('sign-out-link');
signOutLink.addEventListener('click', signOutUser);
/* end "boiler plate auth code" */

// grab needed DOM elements on page:
const commentsContainer = document.getElementById('comments');
const commentForm = document.getElementById('comment-form');
// local state:

// // display functions:
async function displayComments() {
    const items = await getAllComments();
    commentsContainer.innerHTML = '';

    for (let item of items) {
        const renderedItems = renderComments(item);
        commentsContainer.append(renderedItems);
    }
}

updateCommentsInRealtime(displayComments);
displayComments();

// events:
commentForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(commentForm);

    const response = await addComment({
        text: formData.get('text'),
    });

    if (response.error) {
        console.log(response.error);
    } else {
        commentForm.reset();
        displayComments();
    }
});