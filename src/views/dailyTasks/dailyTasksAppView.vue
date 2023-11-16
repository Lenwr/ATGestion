<script  setup>
import DailyTasksListView from './dailyTasksListView.vue';
import DailyTasksFormView from './dailyTasksFormView.vue';


</script>

<template>

<div class="daily_task text-black flex flex-col items-center justify-center ">
    <h1 class="my-4"> Les taches à faire </h1>
    <DailyTasksFormView />
    <DailyTasksListView/>
</div>


</template>

<style>
</style>