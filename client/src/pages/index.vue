<script setup lang="ts">
    import { ref, onMounted } from 'vue';
    import { type ActivityData, getActivity } from '@/model/products';
    import { getCurrentUser } from '@/model/currentUser';

    let products = ref([] as ActivityData[]);
    let todayProducts = ref([] as ActivityData[]);
    let thisWeekProducts = ref([] as ActivityData[]);
    let totalDistanceToday = ref(0);
    let totalDurationToday = ref(0);
    let totalDistanceThisWeek = ref(0);
    let totalDurationThisWeek = ref(0);
    let totalDistanceAllTime = ref(0);
    let totalDurationAllTime = ref(0);

    // Fetch activity data on component mount
    onMounted(async () => {
        products.value = await getActivity();
        // Filter today's and this week's activity
        const today = new Date();
        const thisWeekStart = new Date();
        thisWeekStart.setDate(thisWeekStart.getDate() - thisWeekStart.getDay());
        todayProducts.value = products.value.filter(product => new Date(product.date).toDateString() === today.toDateString());
        thisWeekProducts.value = products.value.filter(product => new Date(product.date) >= thisWeekStart);
        // Calculate total distance and duration for today
        totalDistanceToday.value = todayProducts.value.reduce((acc, cur) => acc + cur.distance, 0);
        totalDurationToday.value = todayProducts.value.reduce((acc, cur) => acc + cur.duration, 0);
        // Calculate total distance and duration for this week
        totalDistanceThisWeek.value = thisWeekProducts.value.reduce((acc, cur) => acc + cur.distance, 0);
        totalDurationThisWeek.value = thisWeekProducts.value.reduce((acc, cur) => acc + cur.duration, 0);
        // Calculate total distance and duration for all time
        totalDistanceAllTime.value = products.value.reduce((acc, cur) => acc + cur.distance, 0);
        totalDurationAllTime.value = products.value.reduce((acc, cur) => acc + cur.duration, 0);
    });

    // Function to calculate average pace
    function averageTimeCalc(distance: number, duration: number) {
        return duration === 0 ? 0 : distance / (duration / 60);
    }
</script>
<template>
  <div class="Card">
    <div class="columns">
      <div class="column is-half is-offset-one-quarter">
        <!-- Today's activity card -->
        <div class="card">
          <div class="card-content">
            <h1 class="title">Today</h1>
            <h1 class="subtitle value"> Distance: {{ getCurrentUser() ? totalDistanceToday.toFixed(2) : '0.00' }} mi </h1>
            <h1 class="subtitle value">Duration: {{ getCurrentUser() ? totalDurationToday.toFixed(2) : '0.00' }}</h1>
            <h1 class="subtitle value">Avg Pace: {{ getCurrentUser() ? averageTimeCalc(totalDistanceToday, totalDurationToday).toFixed(2) : '0.00' }} mph</h1>
          </div>
        </div>

        <!-- This Week activity card -->
        <div class="card">
          <div class="card-content">
            <h1 class="title">This Week</h1>
            <h1 class="subtitle value"> Distance: {{ getCurrentUser() ? totalDistanceThisWeek.toFixed(2) : '0.00' }} mi </h1>
            <h1 class="subtitle value">Duration: {{ getCurrentUser() ? totalDurationThisWeek.toFixed(2) : '0.00' }}</h1>
            <h1 class="subtitle value">Avg Pace: {{ getCurrentUser() ? averageTimeCalc(totalDistanceThisWeek, totalDurationThisWeek).toFixed(2) : '0.00' }} mph</h1>
          </div>
        </div>

        <!-- All Time activity card -->
        <div class="card">
          <div class="card-content">
            <h1 class="title">All Time</h1>
            <h1 class="subtitle value"> Distance: {{ getCurrentUser() ? totalDistanceAllTime.toFixed(2) : '0.00' }} mi </h1>
            <h1 class="subtitle value">Duration: {{ getCurrentUser() ? totalDurationAllTime.toFixed(2) : '0.00' }}</h1>
            <h1 class="subtitle value">Avg Pace: {{ getCurrentUser() ? averageTimeCalc(totalDistanceAllTime, totalDurationAllTime).toFixed(2) : '0.00' }} mph</h1>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>

</style>