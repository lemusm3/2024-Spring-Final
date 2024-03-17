<script setup lang="ts">
    import { ref, onMounted } from 'vue';
    import { type UserRoot, getUsers } from "@/model/users";
    import { getCurrentUser } from '@/model/currentUser';

    const products = ref([] as UserRoot[]);

    // Fetch data on component mount
    onMounted(async () => {
        products.value = await getUsers(); // Fetch user data and assign to products
    });
</script>
<template>
    <div>
        <div v-for="product in products" :key="product.email">
            <!-- Display product image if it belongs to the current user -->
            <div v-if="getCurrentUser() === product.email">
                <img :src="product.image" alt="Product image" class="small">  
            </div>
        </div>
    </div>
</template>
<style scoped>

</style>
