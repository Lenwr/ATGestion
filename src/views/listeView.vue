<script setup>
import {useCollection, useFirestore} from "vuefire";
import {collection} from "firebase/firestore";
import {format} from 'date-fns';
import frLocale from 'date-fns/locale/fr';
import {computed, ref} from "vue";
import Return from "../components/return.vue";

const db = useFirestore()
console.log(db)
const Liste = useCollection(collection(db, 'enlevements'))
const formatDateTime = (dateTimeString) => {
  const date = new Date(dateTimeString);
  const options = {
    weekday: 'long', // Jour de la semaine (ex: "Mardi")
    day: 'numeric',   // Jour du mois (ex: "9")
    month: 'long',    // Mois (ex: "décembre")
    year: 'numeric',  // Année (ex: "2023")
    hour: 'numeric',  // Heure (ex: "20")
    minute: 'numeric' // Minute (ex: "13")
  };
  return format(date, "EEEE d MMMM yyyy à HH'h' mm", {locale: frLocale});
}

const isTabActive = (destination) => selectedDestination.value === destination;

const selectedDestination = ref('');
const destinations = [
  '',
  'BENIN',
  'TOGO',
  'CONGO',
  'GABON',
    'SENEGAL'
];

const filteredClients = computed(() => {
  return selectedDestination.value
      ? Liste.value.filter(liste => liste.destination === selectedDestination.value)
      : Liste.value;
});

</script>

<template>
  <div class="bg-white h-auto">

    <return route=''/>


    <div class="tabs bg-neutral-100 w-screen tabs-boxed">
      <a v-for="destination in destinations" :key="destination"
         :class="{ 'tab text-black': true, 'bg-secondary': isTabActive(destination) }"
         @click="selectedDestination = destination">{{ destination }}</a>

    </div>
    <div class="w-screen px-4 ">
      <ul role="list" class="divide-y divide-gray-100 bg-white">
        <router-link v-for="liste in filteredClients" :key="liste.id" :to="'/liste/' + liste.id">
          <li class="flex mobile:flex-col bg-white justify-between gap-x-6 py-5">
            <div class="flex min-w-0 gap-x-4">
              <img class="mt-2 h-20 w-20 flex-none rounded bg-gray-50" :src="liste.imageUrl" alt=""/>
              <div class="min-w-0 flex-auto">
                <p class="text-sm font-semibold leading-6 text-gray-900">Nom de l'expéditeur: {{ liste.expediteur }}</p>
                <p class="mt-1 truncate text-xs leading-3 text-gray-500">Description : {{ liste.description }}</p>
                <p class="mt-1 truncate text-xs leading-5 text-gray-500">Nombre de coli : {{ liste.nombreDeColis }}</p>
                <p class="mt-1 truncate text-xs leading-5 text-gray-500" v-if="liste.date" ref="date">
                  {{ formatDateTime(liste.date) }}</p>
              </div>
            </div>
            <div class="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
              <p class="textarea-lg leading-5 text-gray-500">{{ liste.destination }}</p>
            </div>
          </li>
        </router-link>
      </ul>
    </div>
  </div>

</template>

<style scoped>

</style>