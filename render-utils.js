export function renderComments(comment) {
    const ul = document.createElement('ul');
    const li = document.createElement('li');
    const avatar = document.createElement('img');
    const userName = document.createElement('span');
    
    userName.textContent = 'placeholder: ';
    avatar.src = './assets/avatar-placeholder-circle.png';

    li.textContent = comment.text;
    li.prepend(avatar, userName);

    ul.append(li);
    
    return ul;
}
