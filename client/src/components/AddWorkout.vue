<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { type ActivityData, getActivity } from "@/model/products";
import { getUsers, type UserRoot } from '@/model/users';

const newWorkout = ref<ActivityData | null>(null);
const products = ref([] as ActivityData[]);
const users = ref([] as UserRoot[]);

// Fetch activity data and user data on component mount
onMounted(async () => {
    products.value = await getActivity(); // Fetch activity data and assign to products
});

onMounted(async () => {
    users.value = await getUsers(); // Fetch user data and assign to users
});

// Function to add a new activity
function addWorkout() {
    newWorkout.value = {
        email: '',
        location: '',
        distance: 0,
        duration: 0,
        date: '',
        comment: '',
        image: '',
    }
}

// Function to save the new activity
function saveWorkout(){
    if (newWorkout.value) {
        products.value.unshift(newWorkout.value); // Add new activity to the beginning of the list
        newWorkout.value = null;
    }
}
</script>
<template>
        <!-- Add Activity button -->
        <button class="button is-medium is-fullwidth is-primary is-info" @click="addWorkout">Add Workout</button>
        <!-- Add Activity modal -->
        <div v-if="newWorkout" class="modal is-active">
            <div class="modal-background"></div>
            <div class="modal-card">
                <header class="modal-card-head">
                    <h1 class="modal-card-title">Add Workout</h1>
                    <button class="delete" aria-label="close" @click="newWorkout=null"></button>
                </header>
                <section class="modal-card-body">
                    <!-- Form to add new activity -->
                    <form @submit.prevent="saveWorkout">
                        <div class="field">
                            <label class="label">Email</label>
                            <div class="control">
                                <input class="input" type="email" placeholder="Enter your email" v-model="newWorkout.email">
                            </div>
                        </div>
                        <div class="field">
                            <label class="label">Location</label>
                            <div class="control">
                                <input class="input" type="text" placeholder="Enter the location" v-model="newWorkout.location">
                            </div>
                        </div>
                        <div class="field">
                            <label class="label">Distance</label>
                            <div class="control">
                                <input class="input" type="text" placeholder="Enter the distance in miles" v-model="newWorkout.distance">
                            </div>
                        </div>
                        <!-- Input fields for activity details -->
                        <div class="field">
                            <label class="label">Duration</label>
                            <div class="control">
                                <input class="input" type="text" placeholder="Enter the duration in minutes" v-model="newWorkout.duration">
                            </div>
                        </div>
                        <div class="field">
                            <label class="label">Date</label>
                            <div class="control">
                                <input class="input" type="date" placeholder="Enter the date" v-model="newWorkout.date">
                            </div>
                        </div>
                        <div class="field">
                            <label class="label">Description</label>
                            <div class="control">
                                <input class="input" type="type" placeholder="Add a comment" v-model="newWorkout.comment">
                            </div>
                        </div>
                        <div class="field">
                            <label class="label">Image</label>
                            <div class="control">
                                <input class="input" type="text" placeholder="Enter the image URL" v-model="newWorkout.image">
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
</template>
<style scoped>

</style>