<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { ref, computed, onMounted } from 'vue';
import { setCurrentUser, getCurrentUser } from '@/model/currentUser';
import { type UserRoot, getUsers } from '@/model/users';
import UserPic from './UserPic.vue';

const products = ref([] as UserRoot[]);
const isActive = ref(false);
const isAdmin = ref(false);
const showLoginDropdown = ref(false);

function toggleLoginDropdown() {
  showLoginDropdown.value = !showLoginDropdown.value;
}

// Fetch data on component mount
onMounted(async () => {
    products.value = await getUsers();
});

function toggleMenu() {
    isActive.value = !isActive.value;
}

function closeMenu() {
  isActive.value = false;
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
        <!-- Navbar toggle icon -->
<a role="button" @click="toggleMenu" :class="{ 'is-active': isActive }" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>
    <div :class="{ 'is-active': isActive }" id="navbarBasicExample" class="navbar-menu m-auto">
        <div class="navbar-start">
            <!-- Navigation links -->
            <RouterLink to="/MyActivity" class="navbar-item m-auto" @click.native="closeMenu">
                <span class="icon-text">
                    <span class="icon">
                        <i class="fas fa-running"></i>
                    </span>
                    <span>My Activity</span>
                </span>
            </RouterLink>

            <RouterLink to="/Statistics" class="navbar-item" @click.native="closeMenu">
                <span class="icon-text">
                    <span class="icon">
                        <i class="fas fa-chart-line"></i>
                    </span>
                    <span>Statistics</span>
                </span>
            </RouterLink>

            <RouterLink to="/FriendsActivity" class="navbar-item" @click.native="closeMenu">
                <span class="icon-text">
                    <span class="icon">
                        <i class="fas fa-users"></i>
                    </span>
                    <span>Friends Activity</span>
                </span>
            </RouterLink>

            <div class="navbar-item m-auto has-dropdown is-hoverable">
                <span class="icon-text">
                <span class="icon">
                <i class="fas fa-crown"></i>
                    </span>
                <span class="navbar-link">Admin</span>
                </span>
                <div class="navbar-dropdown" v-if="isAdmin">
                    <RouterLink to="/products" class="navbar-item" @click.native="closeMenu">Users</RouterLink>
                </div>
            </div>
        </div>
        <!-- Sign Up Link -->
        <RouterLink to="/SignUp" class="navbar-item" @click.native="closeMenu">
                <span class="icon-text">
                    <span class="icon">
                        <i class="fas fa-user-plus"></i>
                    </span>
                    <span>Sign Up</span>
                </span>
            </RouterLink>
        <!-- Logout/Login Dropdown -->
        <div class="navbar-item has-dropdown is-hoverable button is-light margin">
            <a class v-if="getCurrentUser()">
                <a class="navbar-item" @click="setCurrentUser(''); isAdmin=false;">Logout</a>
            </a>
            <a class="navbar-link button is-light" v-else @click="toggleLoginDropdown">
                Login
                <div v-show="showLoginDropdown" class="navbar-dropdown">
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
<div class="navbar-end">
            <div class="navbar-item">
                <div class="buttons">
                        <UserPic></UserPic>
                        <strong class="user-email">{{ getCurrentUser() }}</strong>
                </div>
            </div>
        </div>
</template>
<style scoped>

.navbar-link::after {
        border-color: black;
    }

.router-link-active {
    border-bottom: 2px solid #b900d1;
}

.signup:hover {
    background-color: rgb(42, 181, 160);

}

.grey:hover {
    background-color: rgb(240, 238, 238);
}

.margin {
    margin: 25px;
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