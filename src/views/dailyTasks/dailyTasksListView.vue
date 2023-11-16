<script setup>
import {useDailyTasksStore} from '../../stores/dailyTasks'
import { storeToRefs } from 'pinia';


const store = useDailyTasksStore()
const {todoList} = storeToRefs(store)
const {toggleCompleted , deleteTodo} = store
</script>

<template>
    <div  >
<div v-for="todo in todoList" :key="todo.id"  >
   <div class="flex ">
    <span :class="{completed: todo.completed }">{{ todo.item }}</span>
    <div class="">
    <span class="hover:cursor-pointer px-2" @click.stop="toggleCompleted(todo.id)">&#10004;</span>
    <span @click="deleteTodo(todo.id)">&#10060;</span>
</div>
   </div>
</div>
</div>
</template>
<style scoped>
.completed{
    text-decoration: line-through;
}
</style>