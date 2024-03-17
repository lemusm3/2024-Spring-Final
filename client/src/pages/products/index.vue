<script setup lang="ts">
    import UserList from "@/components/UserList.vue";
    import AddUser from '@/components/AddUser.vue';
</script>
<template>
    <!-- Navigation breadcrumbs -->
    <nav class="breadcrumb" aria-label="breadcrumbs">
        <ul>
            <li><a href="#">My Exercise</a></li>
            <li><a href="#">Admin</a></li>
            <li class="is-active"><a href="#" aria-current="page">Users</a></li>
        </ul>
    </nav>
    <!-- Add a new user -->
    <AddUser></AddUser>

    <!-- Display user list -->
    <UserList></UserList>
</template>
<style scoped>

</style>