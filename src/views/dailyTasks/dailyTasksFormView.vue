<script setup>
import { ref } from 'vue';
import {useDailyTasksStore} from '../../stores/dailyTasks'

const todo = ref('')
const store = useDailyTasksStore()
function addItemAndClear(item){
    if(item.length === 0){
        return
    }
    store.addTodo(item)
    todo.value = ''
}

</script>

<template>
   
<form @submit.prevent="addItemAndClear(todo)" >
    <input type="text" class="input input-bordered  bg-white max-w-xs mx-2" v-model="todo" >
    <button class="btn btn-success">Ajouter</button>
</form>
</template>
<style>
</style>