export function renderComments(comment) {
    const ul = document.createElement('ul');
    const li = document.createElement('li');

    li.textContent = comment.text;

    ul.append(li);
    
    return ul;
}
