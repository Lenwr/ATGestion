<script setup>
import {ref, computed, reactive, onMounted} from 'vue';
import {toast} from "vue3-toastify";
import {storeToRefs} from "pinia";
import {useBoxeStore} from "../stores/modules/boxes.js";


// Données
const search = ref('');
const currentPage = ref(1);
const itemsPerPage = 8;

const boxeStore = useBoxeStore()
onMounted(async () => {
  await boxeStore.fetchBoxes();
});



const { boxes, loading, error } = storeToRefs(boxeStore);
const editingId = ref(null);
// Formulaire réactif
const formBoxe = ref({
  boxe: '',
  dimensions: '',
  price: '',
  location: '',
  status: 'Disponible',
});

//Crud
const createBox = async () => {
  try {
    await boxeStore.createBoxes(formBoxe.value);
    formBoxe.value = {
      boxe: '',
      dimensions: '',
      price: '',
      status: 'disponible',}
    toast("Nouveau boxe ajouté", {
      "theme": "auto",
      "type": "error",
      "autoClose": 1000,
      "dangerouslyHTMLString": true
    })

  } catch (e) {
    console.error('Erreur lors de la création:', e);
  }
};


const handleUpdateBox = async () => {
  // Vérifier que tous les champs sont remplis
  if (!formBoxe.value.boxe || !formBoxe.value.dimensions ||
      !formBoxe.value.price || !formBoxe.value.location) {
    alert('Veuillez remplir tous les champs');
    return;
  }

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
    await boxeStore.updateBoxes(editingId.value, updates);

    // Réinitialiser le formulaire et l'ID d'édition
    resetForm();
  } catch (err) {
    console.error('Erreur lors de la mise à jour de la boîte:', err);
    // Gérer l'erreur (afficher un message à l'utilisateur, etc.)
  }
};
// Fonction pour préparer l'édition
const startEditing = (box) => {
  editingId.value = box.id;
  formBoxe.value = {
    boxe: box.boxe,
    dimensions: box.dimensions,
    price: box.price,
    location: box.location,
    status: box.status || 'Disponible'
  };
};





// Méthodes
const getStatusClass = (status) => {
  return {
    disponible: 'bg-green-500',
    occupé: 'bg-blue-500',
    maintenance: 'bg-orange-500',
  }[status] || 'bg-gray-500';
};

// Filtrage des boxes
const filteredBoxes = computed(() => {
  const searchLower = search.value.toLowerCase();
  return boxes.value.filter((box) => {
    return (
        box.boxe.toLowerCase().includes(searchLower) ||
        box.status.toLowerCase().includes(searchLower)
    );
  });
});

// Pagination
const totalPages = computed(() => Math.ceil(filteredBoxes.value.length / itemsPerPage));
const paginatedBoxes = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return filteredBoxes.value.slice(start, start + itemsPerPage);
});

const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++;
};
const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--;
};

// Actions
const openAddBoxModal = () => {
  alert('Formulaire pour ajouter un box.');
};
const editBox = (box) => {
  alert(`Modifier le box : ${box.number}`);
};
const deleteBox = async (id) => {
  if (confirm('Êtes-vous sûr de vouloir supprimer cet Client ?')) {
    try {
      await boxeStore.deleteBoxe(id);
      toast("Boxe supprimé", {
        "theme": "auto",
        "type": "error",
        "autoClose": 1000,
        "dangerouslyHTMLString": true
      })
    } catch (e) {
      console.error('Erreur lors de la suppression:', e);
    }
  }
};
const resetForm = () => {
  formBoxe.value.boxe = '';
  formBoxe.value.dimensions = '';
  formBoxe.value.price = "";
  formBoxe.value.status = 'disponible';
};
</script>




<template>
  <div class="pb-[10%] px-6 pt-6 text-black ">
    <!-- Barre d'outils -->
    <div class="flex items-center justify-between mb-4 ">
      <input
          type="text"
          v-model="search"
          placeholder="Rechercher un box..."
          class="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          @input="filterBoxes"
      />
      <button
          class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          onclick="my_modal_5.showModal()"
      >
        Ajouter un box
      </button>
    </div>

    <!-- Tableau des boxes -->
    <div class="overflow-x-auto">
      <table class="w-full table-auto border-collapse border border-gray-300">
        <thead>
        <tr class="bg-gray-100">
          <th class="border border-gray-300 px-4 py-2 text-left">Boxe</th>
          <th class="border border-gray-300 px-4 py-2 text-left">Dimensions</th>
          <th class="border border-gray-300 px-4 py-2 text-left">Prix</th>
          <th class="border border-gray-300 px-4 py-2 text-left">État</th>
          <th class="border border-gray-300 px-4 py-2 text-left">Client</th>
          <th class="border border-gray-300 px-4 py-2 text-center">Actions</th>
        </tr>
        </thead>
        <tbody>
        <tr
            v-for="box in filteredBoxes"
            :key="box.id"
            class="hover:bg-gray-50"
        >
          <td class="border border-gray-300 px-4 py-2">{{ box.boxe }}</td>
          <td class="border border-gray-300 px-4 py-2">{{ box.dimensions }}</td>
          <td class="border border-gray-300 px-4 py-2">{{ box.price }}</td>
          <td class="border border-gray-300 px-4 py-2">
              <span
                  class="px-2 py-1 rounded text-white"
                  :class="getStatusClass(box.status)"
              >
                {{ box.status }}
              </span>
          </td>
          <td class="border border-gray-300 px-4 py-2">
            {{ box.client || 'N/A' }}
          </td>
          <td class="border border-gray-300 px-4 py-2 flex flex-row items-center justify-around">
            <router-link :to="'/boxes/' + box.id">
              <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="text-blue-500 hover:text-red-700 w-6"

              >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </router-link>
            <svg  @click="deleteBox(box.id)"  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="text-red-500 hover:text-red-700 w-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
            </svg>

          </td>
        </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div class="flex justify-end mt-4">
      <button
          class="bg-gray-200 px-3 py-1 mx-1 rounded-lg hover:bg-gray-300"
          @click="prevPage"
          :disabled="currentPage === 1"
      >
        Précédent
      </button>
      <button
          class="bg-gray-200 px-3 py-1 mx-1 rounded-lg hover:bg-gray-300"
          @click="nextPage"
          :disabled="currentPage === totalPages"
      >
        Suivant
      </button>
    </div>
  </div>



  <!-- formulaire d enregistrement boxe -->

  <dialog id="my_modal_5" class="modal modal-bottom sm:modal-middle">
    <div class="modal-box bg-white">
      <h3 class="text-lg font-bold"></h3>

        <div class="p-6 max-w-lg mx-auto bg-white ">
          <h2 class="text-2xl text-black font-bold mb-4">Ajouter un Box</h2>
          <form @submit.prevent="createBox" class="space-y-4">
            <!-- Numéro du box -->
            <div>
              <label class="block text-lg font-medium text-gray-700">Boxe</label>
              <input
                  v-model="formBoxe.boxe"
                  type="text"
                  placeholder="Ex: Boxe A"
                  class="mt-1 block w-full border-gray-300 border-2 rounded h-[2em] shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  required
              />
            </div>

            <!-- Dimensions -->
            <div>
              <label class="block text-lg font-medium text-black">Dimensions</label>
              <select
                  v-model="formBoxe.dimensions"
                  class="mt-1 block w-full text-black border-gray-300 border-2 rounded h-[2em] shadow-sm focus:ring-blue-500 focus:border-blue-500"

              >
                <option value="20 M²">20 M²</option>
                <option value="30 M²">30 M²</option>
                <option value="55 M²">55 M²</option>
              </select>
            </div>

            <!-- Prix -->
            <div>
              <label class="block  text-lg font-medium text-black">Prix (€/mois)</label>
              <input
                  v-model.number="formBoxe.price"
                  type="number"
                  min="0"
                  placeholder="Ex: 100"
                  class="mt-1 text block w-full border-gray-300 border-2 rounded h-[2em] shadow-sm focus:ring-blue-500 focus:border-blue-500"

              />
            </div>


            <!-- Statut -->
            <div>
              <label class="block text-lg font-medium text-gray-700">Statut</label>
              <select
                  v-model="formBoxe.status"
                  class="mt-1 block w-full border-gray-300 border-2 rounded h-[2em] shadow-sm focus:ring-blue-500 focus:border-blue-500"

              >
                <option value="disponible">disponible</option>
                <option value="occupé">Loué</option>
                <option value="maintenance">En maintenance</option>
              </select>
            </div>

            <!-- Boutons -->
            <div class="flex justify-end space-x-2">
              <button
                  type="button"
                  @click="resetForm"
                  class="px-4 py-2 bg-gray-200 text-black rounded-lg hover:bg-gray-300"
              >
                Réinitialiser
              </button>
              <button
                  type="submit"
                  class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Enregistrer
              </button>
            </div>
          </form>
        </div>
      <div class="modal-action">
        <form method="dialog">
          <!-- if there is a button in form, it will close the modal -->
          <button class="btn">Fermer</button>
        </form>
      </div>
    </div>
  </dialog>

  <dialog id="my_modal_update" class="modal modal-bottom sm:modal-middle">
    <div class="modal-box bg-white">
      <h3 class="text-lg text-black font-bold">Mettre à jour</h3>
      <form @submit.prevent="handleUpdateBox">
        <input v-model="formBoxe.boxe" placeholder="Nom de la boîte" />
        <input v-model="formBoxe.dimensions" placeholder="Dimensions" />
        <input v-model="formBoxe.price" type="number" placeholder="Prix" />
        <input v-model="formBoxe.location" placeholder="Emplacement" />

        <select v-model="formBoxe.status">
          <option value="Disponible">Disponible</option>
          <option value="Réservé">Réservé</option>
          <option value="Indisponible">Indisponible</option>
        </select>

        <button type="submit">
          {{ editingId ? 'Mettre à jour' : 'Ajouter' }}
        </button>
        <button type="button" @click="resetForm" v-if="editingId">Annuler</button>
      </form>
      <div class="modal-action">
        <form method="dialog">
          <!-- if there is a button in form, it will close the modal -->
          <button class="btn">Fermer</button>
        </form>
      </div>
    </div>
  </dialog>




</template>
