export function renderProfiles(profiles) {

    const fragment = document.createDocumentFragment();

    for (let profile of profiles) {
        const profileDiv = document.createElement('div');
        const userNameEl = document.createElement('h2');
        const userAvatarEl = document.createElement('img');

        userNameEl.textContent = profile.username;
        userAvatarEl.textContent = profile.avatar_url;

        profileDiv.append(userNameEl, userAvatarEl);
        fragment.append(profileDiv);
    }
    return fragment;
}