import { ref } from "vue";
import { type UserRoot } from '@/model/users';

const currentUser = ref('');

// Function to SET the current user's email
export function setCurrentUser(user: string) {
    currentUser.value = user;
}

// Function to GET the current user's email
export function getCurrentUser() {
    return currentUser.value;
}

// Function to check if the current user is an admin
export function isAdmin() {
    const isAdmin = ref(false);
    const currentUser = ref(getCurrentUser());
    const users: UserRoot[] = [];

    // Loop through each user in the users array
    for (const user of users) {
        if (user.email === currentUser.value && user.admin === true) {
            isAdmin.value = true;
            break;
        }
    }
    return isAdmin;
}