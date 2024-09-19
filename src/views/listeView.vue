
<script setup>
import { useCollection, useFirestore } from 'vuefire'
import { collection } from 'firebase/firestore'
import { format } from 'date-fns'
import frLocale from 'date-fns/locale/fr'
import { computed, ref, watch } from 'vue'
import ListeDetailsView from "./listeDetailsView.vue";
import ListCard from "../components/listCard.vue";

const db = useFirestore()
console.log(db)
const Liste = useCollection(collection(db, 'enlevements'))

const isTabActive = (destination) => selectedDestination.value === destination

const selectedDestination = ref('')
const selectedStatuts = ref('')
const statuts = ['', 'Non Payé', 'Reste à payer', ' Payé']
const destinations = ['', 'BENIN', 'TOGO', 'CONGO', 'GABON', 'SENEGAL']

const filteredList = computed(() => {
  let filtered = Liste.value;

  // Apply filtering conditions
  if (selectedDestination.value) {
    filtered = filtered.filter((liste) => liste.destination === selectedDestination.value);
  }

  if (selectedStatuts.value) {
    filtered = filtered.filter((liste) => liste.statut === selectedStatuts.value);
  }

  // Sort the filtered list by date
  return filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
});

// barre de recherche
const query = ref('')
const searchList = computed(() => {
  const lowerCaseQuery = query.value.toLowerCase().trim();

  return filteredList.value.filter(item => {
    return (
        item.expediteur &&
        item.expediteur.toLowerCase().includes(lowerCaseQuery)
    );
  });
});

const formatDateTime = (dateTimeString) => {
  const date = new Date(dateTimeString)
  const options = {
    weekday: 'long', // Jour de la semaine (ex: "Mardi")
    day: 'numeric', // Jour du mois (ex: "9")
    month: 'long', // Mois (ex: "décembre")
    year: 'numeric', // Année (ex: "2023")
    hour: 'numeric', // Heure (ex: "20")
    minute: 'numeric', // Minute (ex: "13")
  }
  return format(date, "EEEE d MMMM yyyy à HH'h' mm", { locale: frLocale })
}

</script>

<template>
  <div class="bg-green-50 h-auto flex flex-col items-center">
    <!-- <return route="" /> -->
    <div class="my-2 w-[95%] shadow-2xl">
      <form class="">
        <div class="flex mb">
          <details class="dropdown country bg-white text-black">
            <summary
              class="hover:cursor-pointer flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-black bg-gray-100 border border-gray-300 rounded-s-lg `"
            >
              Pays
            </summary>
            <ul
              class="p-2 shadow menu dropdown-content z-[1] bg-white rounded-box w-52"
            >
              <li v-for="destination in destinations" :key="destination">
                <a @click="selectedDestination = destination">
                  {{ destination }}
                </a>
              </li>
            </ul>
          </details>
          <details class="dropdown status">
            <summary
              class="hover:cursor-pointer flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-black bg-gray-100 border border-gray-300 `"
            >
              status
            </summary>
            <ul
              class="p-2 shadow menu dropdown-content z-[1] bg-white text-black rounded-box w-52"
            >
              <li v-for="statut in statuts" :key="statut">
                <a @click="selectedStatuts = statut">{{ statut }}</a>
              </li>
            </ul>
          </details>
          <div class="relative w-full">
            <input
              type="search"
              id="location-search"
              class="block p-2.5 w-full z-20 text-sm text-gray-900 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:white focus:border-white bg-white"
              placeholder="Rechercher"
              v-model="query"
              @input="listFilter"
            />
          </div>
        </div>
      </form>
    </div>
    <div class="listColis">
      <ul role="list" class="md:grid grid-cols-3">
        <router-link
          v-for="liste in searchList"
          :key="liste.id"
          :to="'/liste/' + liste.id"
        >
          <li class=" ">
<list-card :image="liste.imageUrl" :date="liste.date ? formatDateTime(liste.date) :'Non dispo' " :nbre-colis="liste.nombreDeColis" :statut="liste.statut" :expediteur="liste.expediteur" :destinateur="liste.destinataire" :destination="liste.destination"/>
          </li>
        </router-link>
      </ul>
    </div>
  </div>
</template>

<style scoped></style>
