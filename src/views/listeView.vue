
<script setup>
import { useCollection, useFirestore } from 'vuefire'
import { collection } from 'firebase/firestore'
import { format } from 'date-fns'
import frLocale from 'date-fns/locale/fr'
import { computed, ref, watch } from 'vue'

const db = useFirestore()
console.log(db)
const Liste = useCollection(collection(db, 'enlevements'))
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

const isTabActive = (destination) => selectedDestination.value === destination

const selectedDestination = ref('')
const selectedStatuts = ref('')
const statuts = ['', 'Non Payé', 'Reste à payer', ' Payé']
const destinations = ['', 'BENIN', 'TOGO', 'CONGO', 'GABON', 'SENEGAL']

const filteredList = computed(() => {
  if (selectedDestination.value && selectedStatuts.value) {
    return Liste.value
      .filter(
        (liste) =>
          liste.destination === selectedDestination.value &&
          liste.statut === selectedStatuts.value,
      )
      .sort((a, b) => new Date(b.date) - new Date(a.date))
  } else if (selectedDestination.value) {
    return Liste.value
      .filter((liste) => liste.destination === selectedDestination.value)
      .sort((a, b) => new Date(b.date) - new Date(a.date))
  } else if (selectedStatuts.value) {
    return Liste.value
      .filter((liste) => liste.statut === selectedStatuts.value)
      .sort((a, b) => new Date(b.date) - new Date(a.date))
  } else {
    return Liste.value.sort((a, b) => new Date(b.date) - new Date(a.date))
  }
})

// barre de recherche
const query = ref('')
let searchList = filteredList
async function listFilter() {
  searchList = computed(() => {
    const lowerCaseQuery = query.value.toLowerCase().trim()
    return filteredList.value.filter(
      (item) =>
        item.expediteur &&
        item.expediteur.toLowerCase().includes(lowerCaseQuery),
    )
  })
}

</script>

<template>
  <div class="bg-white h-auto flex flex-col items-center">
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

    <div class="w-screen px-4 rounded-2xl">
      <ul role="list" class="divide-y divide-gray-100 bg-white mb-20">
        <router-link
          v-for="liste in searchList"
          :key="liste.id"
          :to="'/liste/' + liste.id"
        >
          <li class="flex mobile:flex-col justify-between gap-x-6 py-5">


            <div class="flex min-w-0 gap-x-4">
              <img
                class="mt-2 h-20 w-20 flex-none rounded bg-gray-50"
                :src="liste.imageUrl"
                alt=""
              />
              <div class="min-w-0 flex-auto">
                <p class="text-sm font-semibold leading-6 text-black">
                  Nom de l'expéditeur: {{ liste.expediteur }}
                </p>
                <p class="mt-1 truncate text-xs leading-3 text-gray-500">
                  Description : {{ liste.description }}
                </p>
                <p class="mt-1 truncate text-xs leading-5 text-gray-500">
                  Nombre de coli : {{ liste.nombreDeColis }}
                </p>
                <p
                  class="mt-1 truncate text-xs leading-5 text-gray-500"
                  v-if="liste.date"
                  ref="date"
                >
                  {{ formatDateTime(liste.date) }}
                </p>
              </div>
            </div>
            <div class="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
              <p class="textarea-lg leading-5 text-gray-500">
                {{ liste.destination }}
              </p>
              <p
                class="textarea-lg leading-5 border-2 text-black rounded-2xl"
                :class="{
                  'bg-error': liste.statut === 'Non Payé',
                  'bg-secondary': liste.statut === 'Reste à payer',
                  'bg-white': liste.statut === 'Payé',
                }"
              >
                {{ liste.statut }}
              </p>
            </div>
          </li>
        </router-link>
      </ul>
    </div>
  </div>
</template>

<style scoped></style>
