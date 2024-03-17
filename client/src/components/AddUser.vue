<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getUsers, type UserRoot } from '@/model/users';

const users = ref([] as UserRoot[]);
const newUser = ref<UserRoot | null>(null);

// Fetch data on component mount
onMounted(async () => {
    users.value = await getUsers();
});

// Function to add a new user
function addUser() {
    newUser.value = {
        firstName: '',
        lastName: '',
        email: '',
        handle:'',
        admin: false,
        image: '',
    };
}

// Function to save the new user
function saveUser(){
    if (newUser.value) {
        users.value.unshift(newUser.value);
        newUser.value = null;
    }
}
</script>
<template>
    <div>
        <!-- Add User button -->
        <button class="button is-medium is-normal is-primary" @click="addUser">Add User</button>
        <!-- Add User modal -->
        <div v-if="newUser" class="modal is-active">
            <div class="modal-background"></div>
            <div class="modal-card">
                <header class="modal-card-head">
                    <h1 class="modal-card-title">Add User</h1>
                    <button class="delete" aria-label="close" @click="newUser=null"></button>
                </header>
                <section class="modal-card-body">
                    <!-- Form to add new user -->
                    <form @submit.prevent="saveUser">
                        <!-- Input fields for user details -->
                        <div class="field">
                            <label class="label">Email</label>
                            <div class="control">
                                <input class="input" type="email" placeholder="Enter your email" v-model="newUser.email">
                            </div>
                        </div>
                        <div class="field">
                            <label class="label">First Name</label>
                            <div class="control">
                                <input class="input" type="text" placeholder="Enter First Name" v-model="newUser.firstName">
                            </div>
                        </div>
                        <div class="field">
                            <label class="label">Last Name</label>
                            <div class="control">
                                <input class="input" type="text" placeholder="Enter Last Name" v-model="newUser.lastName">
                            </div>
                        </div>
                        <div class="field">
                            <label class="label">Admin?</label>
                            <div class="control">
                                <input class="input" type="text" placeholder="True if Admin" v-model="newUser.admin">
                            </div>
                        </div>
                        <div class="field">
                            <label class="label">Handle</label>
                            <div class="control">
                                <input class="input" type="text" placeholder="Username" v-model="newUser.handle">
                            </div>
                        </div>
                        <div class="field">
                            <div class="control">
                                <input class="button is-primary" type="submit" value="Save">
                            </div>
                        </div>
                    </form>
                </section>
            </div>
        </div>
    </div>
</template>
<style scoped>
   
</style>
