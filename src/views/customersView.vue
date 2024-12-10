<script setup>
import { doc, deleteDoc} from 'firebase/firestore'
import {computed, onMounted, ref} from 'vue'
import {toast} from "vue3-toastify";
import {listeCustomers} from "../components/firebaseConfig.js";
import {useCustomersStore} from "../stores/modules/customers.js";
import {storeToRefs} from "pinia";

//pinia
onMounted(async () => {
  await customersStore.fetchCustomers();
});

const customersStore = useCustomersStore()
const { customers, loading, error } = storeToRefs(customersStore);
const editingId = ref(null);
const customer = ref({
  nom: '',
  prenom: '',
  adresse: '',
  codePostal: '',
  telephone: '',
  envois: [{expediteur: '', colis: ''}],
})

const createCustomers = async () => {
  try {
    await customersStore.createCutomers(customer.value);
    customer.value = {   nom: '',
      prenom: '',
      adresse: '',
      codePostal: '',
      telephone: '',
      envois: [{expediteur: '', colis: ''}] };
    toast("Client supprimé", {
      "theme": "auto",
      "type": "error",
      "autoClose": 1000,
      "dangerouslyHTMLString": true
    })

  } catch (e) {
    console.error('Erreur lors de la création:', e);
  }
};

const deleteCustomers = async (id) => {
  if (confirm('Êtes-vous sûr de vouloir supprimer cet Client ?')) {
    try {
      await customersStore.deleteCustomer(id);
      toast("Client supprimé", {
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





//test gildas
const query = ref('')
let filteredList = listeCustomers
async function listFilter() {
  filteredList = computed(() => {
    const lowerCaseQuery = query.value.toLowerCase().trim()
    return customers.value.filter(
      (item) => item.nom && item.nom.toLowerCase().includes(lowerCaseQuery),
    )
  })
}

</script>

<template>
  <!-- component -->
  <div>
    <!-- <return route="" /> -->
    <div class="flex flex-row bg-primary items-center justify-center px-2 py-4">
      <p class="text-black px-4">Rechercher</p>
      <input
        v-model="query"
        @input="listFilter"
        type="text"
        placeholder="nom du client "
        class="input input-bordered input-primary w-full max-w-xs bg-white"
      />
        <span class="w-6 mx-4 text-black cursor-pointer  hover:w-8 duration-500" onclick="formModal.showModal()">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
</svg>
        </span>
    </div>
    <dialog id="formModal" class="modal modal-bottom sm:modal-middle">
      <div class="modal-box bg-white text-black">
        <h1 class="text-center my-3">
          Ajouter un nouveau client
        </h1>
        <form class="space-y-6" @submit.prevent="createCustomers">
          <div>
            <label
                for="nom"
                class="block text-sm font-medium leading-6 text-gray-900"
            >
             Nom
            </label>
            <div class="mt-2">
              <input
                  id="nom"
                  name="nom"
                  v-model="customer.nom"
                  class="block h-[3em] w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-4"
                  placeholder="Nom"
              />
            </div>
          </div>

          <div>
            <label
                for="prenom"
                class="block text-sm font-medium leading-6 text-gray-900"
            >
              Prenoms
            </label>
            <div class="mt-2">
              <input
                  id="prenom"
                  name="prenom"
                  v-model="customer.prenom"
                  class="block h-[3em] w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-4"
                  placeholder="Prenoms"
              />
            </div>
          </div>

          <div class="adresse">
            <label
                for="adresse"
                class="block text-sm font-medium leading-6 text-gray-900"
            >
              adresse
            </label>
            <div class="mt-2">
              <input
                  type="text"
                  id="adresse"
                  name="adresse"
                  v-model="customer.adresse"
                  class="block h-[3em] w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-4"
                  placeholder="adresse"
              />
            </div>
          </div>
          <div class="">
            <label
                for="codePostal"
                class="block text-sm font-medium leading-6 text-gray-900"
            >
              Code Postal
            </label>
            <div class="mt-2">
              <input
                  type="text"
                  id="codePostal"
                  name="codePostal"
                  v-model="customer.codePostal"
                  class="block h-[3em] w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-4"
                  placeholder="95500 , 91000 , ...... "
              />
            </div>
          </div>

          <div class="telephone">
            <label
                for="telephone"
                class="block text-sm font-medium leading-6 text-gray-900"
            >
              Telephone
            </label>
            <div class="mt-2">
              <input
                  type="tel"
                  id="telephone"
                  name="telephone"
                  v-model="customer.telephone"
                  class="block h-[3em] w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-4"
                  placeholder="Telephone"
              />
            </div>
          </div>

          <div>
            <button
                type="submit"
                class="flex h-[3em] w-full justify-center rounded-md bg-primary px-3 py-1.5 mb-[2em] text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Enregistrer
            </button>
          </div>
        </form>
        <div class="modal-action">
          <form method="dialog">
            <!-- if there is a button in form, it will close the modal -->
            <button class="w-8">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </dialog>
  </div>


  <!-- Formulaire -->



  <div v-if="loading">Chargement...</div>
  <div v-else class="flex flex-col w-screen">
    <div class="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
      <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
        <div class="overflow-hidden">
          <table class="min-w-full">
            <thead class="bg-white border-b">
              <tr>
                <th
                  scope="col"
                  class="text-sm items-center font-medium text-gray-900 px-6 py-4 text-left"
                >
                  nom
                </th>
                <th
                  scope="col"
                  class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                >
                  prenoms
                </th>
                <th
                  scope="col"
                  class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                >
                  adresse
                </th>
                <th
                  scope="col"
                  class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                >
                  code postal
                </th>
                <th
                  scope="col"
                  class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                >
                  telephone
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                class="bg-gray-100 border-b"
                v-for="(item, i) in filteredList"
                :key="i"
              >
                <td
                  class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"
                >
                  {{ item.nom }}
                </td>
                <td
                  class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"
                >
                  {{ item.prenom }}
                </td>
                <td
                  class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"
                >
                  {{ item.adresse }}
                </td>
                <td
                  class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"
                >
                  {{ item.codePostal }}
                </td>
                <td
                  class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"
                >
                  {{ item.telephone }}
                </td>

                <td
                  class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"
                >
                  <router-link :to="'/customersDetails/' + item.id">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-6 h-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </router-link>
                </td>
                <td class="text-black">
                  <svg   @click="deleteCustomers(item.id)" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                  </svg>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>

</template>

<style scoped>
.text-primary {
  color: #021d49;
}
</style>
