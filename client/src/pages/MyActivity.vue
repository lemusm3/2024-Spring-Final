<script setup lang="ts">
    import { getCurrentUser } from '@/model/currentUser';
    import { ref, onMounted } from 'vue';
    import { type ActivityData, getActivity } from "@/model/products";
    import AddWorkout from '@/components/AddWorkout.vue';

    const Activities = ref([] as ActivityData[]);

    onMounted(async () => {
        Activities.value = await getActivity();
    });
</script>
<template>
    <!-- Display message if user is not logged in -->
    <section class="hero" v-if="getCurrentUser() ==''" style="background-color:honeydew;">
        <div class="hero-body"></div>
        <div class="hero-body">
            <h1 class="title">
                Login
            </h1>
            <h1 class="subtitle">
                Please Login!
            </h1>
        </div>
    </section>

    <!-- Display user activity when logged in -->
    <section class="hero" v-if="getCurrentUser() !==''">
        <div class="hero-body">
            <h1 class="title has-text-left">
                My Activity
            </h1>
            <div>
        <div class="columns is-centered">
            <div class="column is-half">
                <!-- Adding activity -->
                <AddWorkout></AddWorkout>
            </div>
        </div>
    </div>
            <!-- Loop through activities and display user-specific ones -->
            <div v-for="activity in Activities" :key="activity.email" class="card">
                <div v-if="activity.email == getCurrentUser()">
                    <div class="card-content">
                        <h4 class="subtitle is-4">{{ activity.email }}</h4>
                        <br>
                        <img :src="activity.image" alt="activity image" class="size">
                        <h1 class="subtitles">{{ activity.comment }} {{ activity.location }}</h1>
                        <h1 class="subtitles"> Distance: {{ activity.distance }} Miles in {{ activity.duration }} Minutes</h1>
                        <h1 class="subtitles"> Date: {{ activity.date }}</h1>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<style scoped>
    .size {
        width: 25%;
        margin: -100px 30px 30px 30px; 
        float: right;
    }
    .userName {
        font-weight: bold;
        color:black;
        font-size: 30px;
    }
    .card {
        margin-top: 20px;
    }
    .subtitles {
        font-size: 20px;
        color:black;
        margin: 10px;
    }
    .delete {
        margin-left: auto;
    }
    .hoverable-icons {
        margin: 5px;
    }
    .fas {
        margin: 5px;
        cursor: pointer;
        color: #00d1b2;
    }
    .userInfo {
        font-size: 30px;
        color:black;
        margin: 10px;
    }
    .h1 {
        font-size: 50px;
        color:black;
        margin: 10px;
    }
    .column {
        border: none;
        box-shadow: none;
    }
</style>