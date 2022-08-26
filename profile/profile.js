import { getProfile, updateProfile, checkAuth, uploadImage } from '../fetch-utils.js';

const profileForm = document.getElementById('profile-form');
const profileNameInput = document.querySelector('[name=user_name]');
const avatarInput = profileForm.querySelector('[name=avatar]');
const preview = document.getElementById('preview');
// const avatarInput = document.querySelector('input[type=file]');

const user = checkAuth();

// let profile = {
//     username: '',
//     avatar_url: '',
// };

profileForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const data = new FormData(profileForm);

    const profileUpdate = {
        username: data.get('user_name'),
        bio: data.get('bio'),
    };

    const imageFile = data.get('avatar');

    let url = '';

    if (imageFile.size) {
        const imageName = `${user.id}/${imageFile.name}`;

        url = await uploadImage(imageName, imageFile);
        profileUpdate.avatar_url = url;

    }

    let profile = {
        username: data.get('user_name'),
        avatar_url: data.get('avatar'),
    };
    
    await updateProfile(profile);

    preview.src = '';
    console.log(profile.username);
    profileForm.reset();
    preview.classList.add('hidden');
    displayProfile();
});

avatarInput.addEventListener('change', () => {
    const file = avatarInput.files[0];
    preview.src = URL.createObjectURL(file);
    preview.classList.remove('hidden');
    preview.classList.add('preview-viz');

});

async function displayProfile() {
    const profile = await getProfile(user.id);

    if (profile) {
        profileNameInput.value = profile.username;
        
        if (profile.avatar_url) {
            preview.src = profile.avatar_url;
        }
    }
    
}

displayProfile();