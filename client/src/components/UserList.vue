<script setup lang="ts">
    import { ref, onMounted } from 'vue';
    import { type User, getUsers } from "@/model/users";

    const products = ref([] as User[]);
    const selectedProduct = ref<User | null>(null);

    // Fetch data on component mount
    onMounted(async () => {
        products.value = await getUsers();
    });

    // Function to delete a product
    const deleteProduct = (product: User) => {
        const index = products.value.findIndex(p => p.email === product.email);
        if (index !== -1) {
            products.value.splice(index, 1); // Remove the product from the products array
        }
    };

    // Function to edit a product
    const editProduct = (product: User) => {
        selectedProduct.value = product; // Assign the selected product to selectedProduct
        console.log('Editing product:', product);
    };
</script>
<template>
    <div>
         <!-- Table to display products -->
        <table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
            <thead>
                <tr>
                    <th></th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Handle</th>
                    <th>Is Admin</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <!-- Loop through products to display each one -->
                <tr v-for="product in products" :key="product.email">
                    <td><img :src="product.image" alt="Product image" class="small"></td>
                    <td>{{ product.firstName }}</td>
                    <td>{{ product.lastName }}</td>
                    <td>{{ product.email }}</td>
                    <td>{{ product.handle }}</td>
                    <td>{{ product.admin }}</td>
                    <td>   
                        <!-- Edit and delete buttons -->                
                        <button class="button is-primary fas fa-edit" @click="editProduct(product)"></button>
                        <button class="button is-danger fas fa-trash" @click="deleteProduct(product)"></button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<style scoped>
    .card {
        flex-basis: 15rem;
        flex-grow: 1;
        margin: .5rem;
    }
    
    .product-list {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
    }

    .table {
        margin: 0 auto;
        margin-top: 10px;
        margin-bottom: 10px;
        width: 100%;
        max-width: 1200px;
    }

    .tr {
        margin: 50px;
    }

    .small {
        width: 50px;
        height: 50px;
    }
</style>