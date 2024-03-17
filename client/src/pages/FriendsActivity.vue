<script setup lang="ts">
    import WorkoutList from '@/components/WorkoutList.vue';
    import AddWorkout from '@/components/AddWorkout.vue';
</script>
<template>
    <div>
        <h1 class="title has-text-left">Friends Activity</h1>
        <div class="columns is-centered">
            <div class="column is-half">
                <!-- Adding activity -->
                <AddWorkout></AddWorkout>
                <!-- Display activity list -->
                <WorkoutList></WorkoutList>
            </div>
        </div>
    </div>
</template>
<style scoped>
.column {
        border: none;
        box-shadow: none;
    }
</style>