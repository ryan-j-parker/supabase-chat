import { getUserProfile, updateProfile, checkAuth, client, SUPABASE_URL } from '../fetch-utils.js';

const profileForm = document.getElementById('profile-form');
const profileNameInput = document.querySelector('[name=user_name]');
// const avatarInput = document.querySelector('[name=avatar]');
const preview = document.getElementById('preview');


const avatarInput = document.querySelector('input[type=file]');
// const preview = document.querySelector('img');

// fileInput.addEventListener('change', () => {
//     const [file] = fileInput.files;
//     preview.src = URL.createObjectURL(file);
// });

const user = checkAuth();

profileForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const data = new FormData(profileForm);

    const profileUpdate = {
        username: data.get('user_name'),
    };

    const imageFile = data.get('avatar');

    if (imageFile.size) {
        const imageName = `${user.id}/${imageFile.name}`;

        const url = await uploadImage(imageName, imageFile);
        profileUpdate.avatar_url = url;
    }

    let profile = {
        username: data.get('user_name'),
        avatar_url: data.get('avatar'),
    };


    await updateProfile(profile);

    profileForm.reset();
    displayUserProfile();
});

async function uploadImage(imageName, imageFile) {

    const bucket = client.storage.from('avatars');

    const { data, error } = await bucket.upload(imageName, imageFile, {

        cacheControl: '3600',

        upsert: true,
    });

    if (error) {
        
        return null;
    }

    const url = `${SUPABASE_URL}/storage/v1/object/public/${data.Key}`;

    return url;
}

avatarInput.addEventListener('change', () => {
    const file = avatarInput.files[0];
    preview.src = URL.createObjectURL(file);
});

async function displayUserProfile() {
    const profile = await getUserProfile(user.id);

    if (profile) {
        profileNameInput.value = profile.username;
        // avatarInput.value = profile.avatar_url;
        if (profile.avatar_url) {
            preview.src = profile.avatar_url;
        }
    }
    
}

displayUserProfile();