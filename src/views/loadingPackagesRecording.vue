
<script setup>
import {useCollection, useFirestore} from "vuefire";
import { ref } from 'vue';
import {getFirestore, collection, addDoc, doc, deleteDoc} from 'firebase/firestore';
import {format} from "date-fns";
import frLocale from "date-fns/locale/fr";
import {toast} from "vue3-toastify";
import "vue3-toastify/dist/index.css";
const db = useFirestore()
console.log(db)
const Liste = useCollection(collection(db, 'chargements'))

const chargement = ref({
  contenaire: '',
  date: '',
  packagesTable : []

})
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

async function submitForm() {
  const db = getFirestore();
  const chargementCollection = collection(db, 'chargements')
  const data = {
    contenaire: chargement.value.contenaire,
    date: chargement.value.date,
    packagesTable : chargement.value.packagesTable
  }
  try {
    const docRef = await addDoc( chargementCollection , data);
    console.log('Document written with ID: ', docRef.id);
    //notification
    toast("Chargement ajouté", {
      "theme": "auto",
      "type": "success",
      "autoClose": 1000,
      "dangerouslyHTMLString": true
    })
    // Réinitialiser les valeurs des champs après l'enregistrement
    chargement.value.contenaire = '';
    chargement.value.date = '';
  } catch (e) {
    console.error('Error adding document: ', e);
  }

};
async function deleteLoad(id) {
  const DocRef = doc(db, 'chargements', id)
  await deleteDoc(DocRef)
  toast("Chargement supprimé", {
    "theme": "auto",
    "type": "error",
    "autoClose": 1000,
    "dangerouslyHTMLString": true
  })
}


</script>

<template>
  <div>
    <!-- Interface utilisateur pour afficher les chargements en cours -->
    <div class="text-black">
      <div class="flex flex-row justify-around items-center m-8">
        <h2>Enregistrer un nouveau chargement </h2>
        <button class="btn btn-primary"  onclick="modal.showModal()"> nouveau </button>
      </div>

      <!-- Modal -->
      <dialog id="modal" class="modal">
        <div class="modal-box bg-white">


          <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">

            <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form class="space-y-6" @submit.prevent="submitForm">
                <div>
                  <label for="date" class="block text-sm font-medium leading-6 text-gray-900">Date de chargement</label>
                  <div class="mt-2">
                    <input id="date" v-model="chargement.date" type="datetime-local" autocomplete="date" required="" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                  </div>
                </div>

                <div>
                  <div class="flex items-center justify-between">
                    <label for="contenaire" class="block text-sm font-medium leading-6 text-gray-900">contenaire</label>
                    <div class="text-sm">
                    </div>
                  </div>
                  <div class="mt-2">
                    <input id="contenaire" v-model="chargement.contenaire" type="text" autocomplete="current-password" required="" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                  </div>
                </div>

                <div>
                  <button type="submit" class="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"> Enregistrer </button>
                </div>
              </form>
            </div>
          </div>


          <div class="modal-action">
            <form method="dialog">
              <!-- if there is a button in form, it will close the modal -->
              <button class="btn">Fermer</button>
            </form>
          </div>
        </div>
      </dialog>

      <div class="overflow-x-auto">
        <table class="table text-black">
          <!-- head -->
          <thead>
          <tr class="bg-black text-white">
            <th>Date</th>
            <th>Contenaire</th>
            <th>ajouter des colis </th>
            <th></th>
          </tr>
          </thead>
          <tbody>
          <!-- row 1 -->
          <tr v-for="chargement in Liste" :key="chargement.id" >
            <td> {{ formatDateTime(chargement.date) }}</td>
            <td> {{chargement.contenaire}}</td>
            <td >  <router-link :to="'/chargementsDetails/' + chargement.id" >
              <svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 ">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </router-link>
            </td>
            <td>
              <svg @click="deleteLoad(chargement.id)" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
              </svg>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>




    <!-- Formulaire pour ajouter de nouveaux chargements -->

  </div>
</template>


<style scoped>

</style>