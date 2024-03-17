<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { ref, onMounted } from 'vue';
import { setCurrentUser, getCurrentUser } from '@/model/currentUser';
import { type UserRoot, getUsers } from '@/model/users';
import UserPic from './UserPic.vue';

const products = ref([] as UserRoot[]);
const isActive = ref(false);
const isAdmin = ref(false);

// Fetch data on component mount
onMounted(async () => {
    products.value = await getUsers();
});

function toggleMenu() {
    isActive.value = !isActive.value;
}

</script>
<template>
<nav class="navbar is-primary m-auto" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
        <a class="navbar-item">
            <RouterLink to="/" class="navbar-item">
                <img src="../assets/vite.svg" width="28" height="28">
            </RouterLink>
        </a>
        <a role="button" @click="toggleMenu" :class="{ 'is-active': isActive }" class="navbar-burger m-auto" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
        </a>
    </div>
    <div :class="{ 'is-active': isActive }" id="navbarBasicExample" class="navbar-menu m-auto">
        <div class="navbar-start">
            <!-- Navigation links -->
            <RouterLink to="/MyActivity" class="navbar-item m-auto">
                <span class="icon-text">
                    <span class="icon">
                        <i class="fas fa-running"></i>
                    </span>
                    <span>My Activity</span>
                </span>
            </RouterLink>

            <RouterLink to="/Statistics" class="navbar-item">
                <span class="icon-text">
                    <span class="icon">
                        <i class="fas fa-chart-line"></i>
                    </span>
                    <span>Statistics</span>
                </span>
            </RouterLink>

            <RouterLink to="/FriendsActivity" class="navbar-item">
                <span class="icon-text">
                    <span class="icon">
                        <i class="fas fa-users"></i>
                    </span>
                    <span>Friends Activity</span>
                </span>
            </RouterLink>

            <RouterLink to="/Search" class="navbar-item">
                <span class="icon-text">
                    <span class="icon">
                        <i class="fas fa-search"></i>
                    </span>
                    <span>People Search</span>
                </span>
            </RouterLink>

            <div class="navbar-item has-dropdown is-hoverable">
                <a class="navbar-link">Admin</a>

                <div class="navbar-dropdown" v-if="isAdmin">
                    <RouterLink to="/products" class="navbar-item">Users</RouterLink>
                </div>
            </div>
        </div>

        <div class="navbar-end">
            <div class="navbar-item">
                <div class="buttons">
                    <a class="button is-primary">
                        <UserPic></UserPic>
                        <strong class="user-email">{{ getCurrentUser() }}</strong>
                    </a>
                </div>
            </div>
        </div>

        <!-- Sign Up Link -->
        <RouterLink to="/SignUp" class="navbar-item m-auto signup">
            <span style="color: white">Sign Up</span>
        </RouterLink>

        <!-- Logout/Login Dropdown -->
        <div class="navbar-item has-dropdown is-hoverable button is-light margin arrow">
            <a class v-if="getCurrentUser()">
                <a class="navbar-link" @click="setCurrentUser(''); isAdmin=false;">Logout</a>
            </a>
            <a class="navbar-link" v-else>
                Login
                <div class="navbar-dropdown">
                    <div class="navbar-item grey" v-for="user in products" :key="user.email" @click="setCurrentUser(user.email); isAdmin=user.admin">{{ user.firstName }} {{ user.lastName }}</div>
                </div>
            </a>
        </div>

        <!-- Twitter Button -->
        <h1 class="control">
            <a class="bd-tw-button button margin" data-social-network="Twitter" href="https://twitter.com">
                <span class="icon">
                    <i class="fab fa-twitter"></i>
                </span>
                <span>Tweet</span>
            </a>
        </h1>
    </div>
</nav>
</template>
<style scoped>

.navbar-link::after {
        border-color: black;
    }

.router-link-active {
    border-bottom: 2px solid #b900d1;
}

.arrow::after {
    border-color: black; 
}

.signup:hover {
    background-color: rgb(42, 181, 160);
}

.grey:hover {
    background-color: rgb(240, 238, 238);
}

.margin {
    margin: 7px;
}

.UserPic {
    margin-right: 10px;
}

.user-email {
        font-size: 0.8rem; 
        max-width: 100px; 
        overflow: hidden; 
        text-overflow: ellipsis;
        white-space: nowrap;
}
</style>