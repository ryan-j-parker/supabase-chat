const SUPABASE_URL = 'https://ycrjdcltdpujspwklmtr.supabase.co';
const SUPABASE_KEY =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InljcmpkY2x0ZHB1anNwd2tsbXRyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTk2NDA4ODAsImV4cCI6MTk3NTIxNjg4MH0.09-eHnBOrLeSZ5iozNMkme5G9W9_LfVD2GYU4ycn4eg';

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

/* Auth related functions */

export function getUser() {
    return client.auth.user();
}

export function checkAuth() {
    const user = getUser();
    // do we have a user?
    if (!user) {
        // path is different if we are at home page versus any other page
        const authUrl = location.pathname === '/' ? './auth/' : '../auth/';
        // include the current url as a "redirectUrl" search param so user can come
        // back to this page after they sign in...
        location.replace(`${authUrl}?redirectUrl=${encodeURIComponent(location)}`);
    }

    // return the user so can be used in the page if needed
    return user;
}

export async function signUpUser(email, password) {
    return await client.auth.signUp({
        email,
        password,
    });
}

export async function signInUser(email, password) {
    return await client.auth.signIn({
        email,
        password,
    });
}

export async function signOutUser() {
    return await client.auth.signOut();
}

/* Data functions */

/* Post Comments */
export async function addComment(comment) {
    const response = await client.from('comments').insert(comment).single();
    return checkError(response);
}

export async function getAllComments() {
    const response = await client.from('comments').select('*');
    return checkError(response);
}

export function updateCommentsInRealtime(handleInsert) {
    client
        .from('comments')
        .on('INSERT', handleInsert)
        .subscribe();
}

function checkError({ data, error }) {
    // eslint-disable-next-line no-console
    return error ? console.error(error) : data;
}