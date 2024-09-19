<script setup>

import {format} from "date-fns";
import frLocale from "date-fns/locale/fr";

defineProps({
  image:String,
  date: String,
 nbreColis: String,
  statut: String ,
  expediteur: Number,
  destinateur: String,
  destination : String
})


</script>
<template>
  <div class="p-1 sm:p-1 text-black font-bold w-full">
    <div class="flex shadow-2xl sm:shadow rounded  flex-col bg-no-repeat bg-contain bg-right bg-[url('https://www.svgrepo.com/show/469769/shipping-box-left.svg')] ">
      <div class="up bg-white h-[4em] rounded-t p-2 flex flex-row justify-between opacity-90">
        <div class="flex flex-row ">
          <img class="w-[3em] rounded-full object-cover " :src="image" alt="">
          <div class="flex flex-col px-2">
            <p class="text-xs">{{date}}</p>
            <p>{{nbreColis}} Colis </p>
        </div>
       </div>
        <p :class="{
                  'text-error': statut === 'Non Payé',
                  'text-orange-800': statut === 'Reste à payer',
                  'text-green-500': statut === 'Payé',
                }" >{{ statut ? statut : "Non dispo" }}</p>
      </div>
      <div class="down bg-white rounded-b flex flex-row justify-around py-4 opacity-90">
        <div class="flex flex-col ">
          <p class="text-xs text-center"> de : France </p>
          <p class="text-center"> {{expediteur ? expediteur : "Non dispo"}}</p>
        </div>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 w-8 text-black">
            <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
          </svg>
        <div class="flex flex-col ">
          <p class="text-xs text-center">vers : {{destination ? destination : "Togo"}} </p>
          <p class="text-center"> {{destinateur ? destinateur : "Non dispo"}}</p>
        </div>
      </div>
    </div>
      </div>

</template>

<style scoped>


</style>
