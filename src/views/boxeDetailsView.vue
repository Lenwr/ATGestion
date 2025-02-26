
<script setup>
import {computed, ref, watch} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import {storeToRefs} from "pinia";
import {useBoxeStore} from "../stores/modules/boxes.js";
import {doc} from "firebase/firestore";
import {useDocument} from "vuefire";
const route = useRoute()
import {db} from "../components/firebaseConfig.js";


const boxeStore = useBoxeStore()
const { boxes, loading, error } = storeToRefs(boxeStore);

const boxId = ref(route.params.id)
console.log(boxId.value)
const targetBox = computed(() => {
  return boxes.value.find((box) => box.id === boxId.value);
});
 const box = targetBox.value
const editingId = ref(null);
// Formulaire réactif
const formBoxe = ref({
  boxe: '',
  dimensions: '',
  price: '',
  location: '',
  status: 'Disponible',
});



const router = useRouter()

const editBox = () => {
  router.push({
    name: 'box-edit',
    params: { id:box.id }
  })
}

const resetForm = () => {
  formBoxe.value.boxe = '';
  formBoxe.value.dimensions = '';
  formBoxe.value.price = "";
  formBoxe.value.status = 'disponible';
};

const docRef = doc(db, 'boxes', boxId.value)
const boxeSource = useDocument(docRef)

watch(boxeSource, (boxeSource) => {
  formBoxe.value = {
    ...boxeSource,
  }
})
const handleUpdateBox = async () => {
  // Vérifier que tous les champs sont remplis
  try {
    // Préparer les données à mettre à jour
    const updates = {
      boxe: formBoxe.value.boxe,
      dimensions: formBoxe.value.dimensions,
      price: formBoxe.value.price,
      location: formBoxe.value.location,
      status: formBoxe.value.status
    };

    // Appeler la méthode de mise à jour du store
    await boxeStore.updateBoxes(boxId.value, updates);

    // Réinitialiser le formulaire et l'ID d'édition
    resetForm();
  } catch (err) {
    console.error('Erreur lors de la mise à jour de la boîte:', err);
    // Gérer l'erreur (afficher un message à l'utilisateur, etc.)
  }
};
const getStatusClass = computed(() => {
  switch(box.status) {
    case 'disponible': return 'status-available'
    case 'réservé': return 'status-reserved'
    case 'indisponible': return 'status-unavailable'
    default: return 'status-default'
  }
})

const getPreviewColor = () => {
  const colors = {
    'disponible': '#10B981',  // Vert
    'réservé': '#F59E0B',     // Jaune
    'indisponible': '#EF4444' // Rouge
  }
  return colors[box.status] || '#6B7280' // Gris par défaut
}

const getLightShadowColor = () => {
  const colors = {
    'disponible': '#6EE7B7',
    'réservé': '#FCD34D',
    'indisponible': '#FCA5A5'
  }
  return colors[box.status] || '#D1D5DB'
}
</script>


<template>
  <div class="box-details-container text-black ">
    <div class="details-wrapper flex flex-col p-8">
      <!-- Détails de la boîte -->
      <div class="bg-white shadow-lg rounded-lg p-6">
        <div class="flex items-center justify-between border-b pb-4 mb-4">
          <h2 class="text-xl font-semibold text-gray-800">Détails du Boxe</h2>
          <button
              onclick="my_modal_update.showModal()" class="text-gray-500 hover:text-blue-500">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
            </svg>
          </button>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div class="flex items-center space-x-4">
            <div class="p-2 bg-gray-100 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
              </svg>
            </div>
            <div>
              <span class="text-sm font-medium text-gray-500">Nom de la Boîte</span>
              <p class="text-lg font-semibold text-gray-800">{{ box.boxe }}</p>
            </div>
          </div>

          <div class="flex items-center space-x-4">
            <div class="p-2 bg-gray-100 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                <line x1="2" y1="20" x2="22" y2="20" />
              </svg>
            </div>
            <div>
              <span class="text-sm font-medium text-gray-500">Dimensions</span>
              <p class="text-lg font-semibold text-gray-800">{{ box.dimensions }}</p>
            </div>
          </div>

          <div class="flex items-center space-x-4">
            <div class="p-2 bg-gray-100 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
                <line x1="7" y1="7" x2="7.01" y2="7" />
              </svg>
            </div>
            <div>
              <span class="text-sm font-medium text-gray-500">Prix</span>
              <p class="text-lg font-semibold text-gray-800">{{ box.price }} €</p>
            </div>
          </div>

          <div class="flex items-center space-x-4">
            <div class="p-2 bg-gray-100 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </div>
            <div>
              <span class="text-sm font-medium text-gray-500">Localisation</span>
              <p class="text-lg font-semibold text-gray-800">{{ box.location }}</p>
            </div>
          </div>
        </div>

        <div class="mt-6">
          <div :class="['inline-block px-4 py-2 rounded-full text-lg font-semibold  ', getStatusClass]">
            {{ box.status }}
          </div>
        </div>
      </div>


      <!-- Rental -->


      <div class="flex w-10 bg-primary flex-row ">
        <div class="w-[30%] bg-primary rounded shadow-2xl">
        </div>
        <div class="w-[60%] rounded shadow-2xl">
        </div>
      </div>
      <!-- RentalForm -->
      <!-- Rental historique -->

    </div>
  </div>



  <dialog id="my_modal_update" class="modal modal-bottom sm:modal-middle">
    <div class="modal-box bg-white text-black">
      <h3 class="text-lg text-black font-bold">Mettre à jour</h3>

      <form @submit.prevent="handleUpdateBox" class="bg-white p-6 space-y-4">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <label>Nom</label>
          <input
              v-model="formBoxe.boxe"
              :placeholder=box.boxe
              class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <label>Dimensions</label>
          <input
              v-model="formBoxe.dimensions"
              :placeholder=box.dimensions
              class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <label>Prix</label>
          <input
              v-model="formBoxe.price"
              type="number"
              :placeholder=box.price
              class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <label>Status</label>
          <select
              v-model="formBoxe.status"
              class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              :placeholder=box.status
          >
            <option value="disponible">disponible</option>
            <option value="réservé">réservé</option>
            <option value="indisponible">indisponible</option>
          </select>
        </div>



        <div class="flex items-center space-x-4">
          <button
              type="submit"
              class="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
           Ajouter
          </button>
        </div>
      </form>

      <div class="modal-action mt-6">
        <form method="dialog" class="flex justify-end">
          <button
              class="px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 focus:ring-2 focus:ring-gray-200 focus:outline-none"
          >
            Fermer
          </button>
        </form>
      </div>

    </div>
  </dialog>

</template>



