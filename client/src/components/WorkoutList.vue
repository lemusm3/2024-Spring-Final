<script setup lang="ts">
    import { ref, onMounted } from 'vue'; 
    import { type ActivityData, getActivity } from "@/model/products"; 
    import { getUsers, type User } from '@/model/users';

    const products = ref([] as ActivityData[]); 
    const users = ref([] as User[]);

    // Function to remove a card from the product list
    function removeCard(product: ActivityData) {
        products.value = products.value.filter(p => p !== product);
    }

    // Function to fetch activity and user data on component mount
    async function fetchData() {
        products.value = await getActivity();
        users.value = await getUsers();
    }

    // Function to check if the email of a user matches the email of a product
    function isMatchingEmail(userEmail: string, productEmail: string): boolean {
        return userEmail === productEmail;
    }

    // Call fetchData function on component mount
    onMounted(fetchData);
</script>
<template>
    <div class="product-list">
        <!-- Loop through each product -->
        <div v-for="product in products" :key="product.email" class="card">
            <div class="card-content">
                <!-- Button to delete the card -->
                <button class="delete" @click="removeCard(product)">Delete</button>
                <div class="user-list">
                    <!-- Loop through each user -->
                    <div v-for="user in users" :key="user.email" class="card">
                        <!-- User info if email matches -->
                        <div class="userInfo" v-if="isMatchingEmail(user.email, product.email)">
                            <!-- Display user profile picture -->
                            <img :src="user.image" class="userPic" alt="Product image" v-if="isMatchingEmail(user.email, product.email)">
                            <!-- Display username -->
                            <span class="userName">{{ user.firstName }}</span>
                        </div>
                        <div class="userInfo" v-if="isMatchingEmail(user.email, product.email)">
                        </div>
                    </div>  
                    <!-- Display product image -->
                    <img :src="product.image" alt="Product image" class="size">
                    <!-- Display product comment and location -->
                    <h1 class="card-text">{{ product.comment }} {{ product.location }}</h1>
                    <!-- Display product distance and duration -->
                    <h1 class="card-text"> Distance: {{ product.distance }} Miles in {{ product.duration }} Minutes</h1>
                    <!-- Display product date -->
                    <h1 class="card-text"> Date: {{ product.date }}</h1>  
                    <!-- Display icons for reply, retweet and like -->
                    <div class="hoverable-icons">
                        <i class="fas fa-reply"></i>
                        <i class="fas fa-retweet"></i>
                        <i class="fas fa-heart"></i>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
    .card {
        margin-top: 20px; 
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Add box shadow to cards */
        transition: transform 0.3s ease-in-out; /* Add transition effect to cards */
    }

    .card:hover {
        transform: translateY(-5px); /* Move card up slightly on hover */
    }

    .card-text {
        font-size: 30px; 
        color: black; 
        margin: 10px;
    }

    .delete {
        margin-left: auto;
    }
    
    .hoverable-icons {
        margin: 5px; 
    }

    .fas { /* font awesome icons */
        margin: 5px;
        cursor: pointer; 
        color: #26198c;
    }

    .userInfo {
        font-size: 30px; 
        color: black;
    }

    .userName {
        font-weight: bold; 
        color: black; 
        font-size: 30px;
    }

    .userPic { /* Profile pic */
        height: 40px; 
    }

    .size { /* Prodcut image */
        width: 30%; 
        margin: 30px; 
        float: right; 
    }  
</style>