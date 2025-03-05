<script setup>
import { useCollection, useFirestore } from 'vuefire'
import { collection, addDoc } from 'firebase/firestore'
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { format } from 'date-fns'
import frLocale from 'date-fns/locale/fr'
import router from '../router/index.js'
import {
  getStorage,
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from 'firebase/storage'
import {toast} from "vue3-toastify";

const route = useRoute()
const db = useFirestore()
const Liste = useCollection(collection(db, 'customers'))
const ListeColis = useCollection(collection(db, 'enlevements'))
const enlevementsCollection = collection(db, 'enlevements')
const detailId = ref(route.params.id)
const myId = detailId.value
let liste = ref('')

liste = computed(() => {
  return Liste.value.find((detail) => detail.id === detailId.value)
})



const listeColis = computed(() => {
  return ListeColis.value.filter((detail) => detail.customerId === myId)
})

const formatDateTime = (dateTimeString) => {
  const date = new Date(dateTimeString)

  return format(date, "EEEE d MMMM yyyy à HH'h' mm", { locale: frLocale })
}

const customer = ref({
  expediteur: '',
  statut: '',
  telephoneExpediteur: '',
  destinataire: '',
  telephoneDestinataire: '',
  typeDeFret: '',
  destination: '',
  nombreDeColis: '',
  description: '',
  personneEnCharge: '',
  prix: '',
  modeDePaiement: '',
  resteAPayer: '',
  date: '',
  image: null,
  customerId: myId,
})

const storage = getStorage()

const handleFileChange = (event) => {
  customer.image = event.target.files[0]
}

async function send() {
  try {
    // Téléchargez l'image vers Firebase Storage
    const imageRef = storageRef(
      storage,
      `enlevements_images/${Date.now()}_${customer.image}`,
    )
    await uploadBytes(imageRef, customer.image)
    //URL de téléchargement de l'image
    const imageUrl = await getDownloadURL(imageRef)

    const Data = {
      expediteur: liste.value.nom,
      statut: customer.value.statut,
      imageUrl: imageUrl,
      telephoneExpediteur: liste.value.telephone,
      destinataire: customer.value.destinataire,
      telephoneDestinataire: customer.value.telephoneDestinataire,
      typeDeFret: customer.value.typeDeFret,
      destination: customer.value.destination,
      nombreDeColis: customer.value.nombreDeColis,
      colis:  colisList.value,
      personneEnCharge: customer.value.personneEnCharge,
      prix: customer.value.prix,
      modeDePaiement: customer.value.modeDePaiement,
      resteAPayer: customer.value.resteAPayer,
      date: customer.value.date,
      deliveryStatus: 'En attente',
      customerId: customer.value.customerId,
    }

    console.log(Data)
    const newDocumentRef = await addDoc(enlevementsCollection, Data)
    console.log('Document ajouté avec ID :', newDocumentRef.id)
    liste.value.nom = '',
        customer.value.statut = '',
        liste.value.telephone = '',
        customer.value.destinataire = '',
        customer.value.telephoneDestinataire = '',
        customer.value.typeDeFret = '',
        customer.value.destination = '',
        customer.value.nombreDeColis = '',
        customer.value.description = '',
        customer.value.personneEnCharge = '',
        customer.value.prix = '',
        customer.value.modeDePaiement = '',
        customer.value.resteAPayer = '',
        customer.value.date = '',
        customer.value.colisList = [] ,
        customer.value.customerId = '',
        await toast("Formulaire envoyé", {
          "theme": "auto",
          "type": "success",
          "autoClose": 1000,
          "dangerouslyHTMLString": true
        })
  } catch (error) {
    console.error("Erreur lors de l'envoi du formulaire :", error)
  }
}

const colisList = ref([{ nom: '' }]);
const ajouterColis = () => {
  colisList.value.push({ nom: ''});
  console.log(colisList.value);
};
</script>

<template>
  <div class="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
    <!-- Titre principal -->
    <span
        class="bg-indigo-600 text-white my-6 px-12 py-3 rounded-lg shadow-lg text-2xl font-semibold"
    >
    Enlèvements
  </span>

    <!-- Bouton d'ajout -->
    <span
        class="flex items-center bg-green-500 text-white px-6 py-2 my-6 rounded-full shadow-lg text-lg font-medium hover:bg-green-600 transition duration-300 cursor-pointer"
        onclick="formModal.showModal()"
    >
    Nouvel Envoi
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-6 h-6 ml-2"
    >
      <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  </span>

    <!-- Liste des enlèvements -->
    <div class="flex flex-col w-full space-y-4 pb-20">
      <div
          v-for="(item, i) in listeColis"
          :key="i"
          class="bg-white border border-gray-200 px-6 py-4 rounded-lg shadow-sm flex justify-between items-center hover:shadow-md transition duration-300"
      >
      <span class="text-gray-700 font-medium">
        Enlèvement du {{ formatDateTime(item.date) }}
      </span>
        <router-link :to="'/liste/' + item.id">
          <button
              class="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition duration-300"
          >
            Voir
          </button>
        </router-link>
      </div>
    </div>
  </div>


  <dialog id="formModal" class="modal modal-bottom sm:modal-middle">
    <div class="modal-box h-[60%] bg-white text-black">
      <form class="space-y-6" @submit.prevent="send">
        <div class="date mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div class="sm:col-span-3">
            <label
              for="date"
              class="block text-sm font-medium leading-6 text-gray-900"
            >
              Date
            </label>
            <div class="mt-2">
              <input
                type="datetime-local"
                name="date"
                v-model="customer.date"
                id="date"
                autocomplete="given-name"
                required
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
        </div>


        <div>
          <label
            for="destinataire"
            class="block text-sm font-medium leading-6 text-gray-900"
          >
            Destinataire
          </label>
          <div class="mt-2">
            <input
              id="destinataire"
              name="destinataire"
              v-model="customer.destinataire"
              class="block h-[3em] w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-4"
            />
          </div>
        </div>

        <div class="telephoneDestinataire">
          <label
            for="telephoneDestinataire"
            class="block text-sm font-medium leading-6 text-gray-900"
          >
            Telephone Destinataire
          </label>
          <div class="mt-2">
            <input
              type="tel"
              id="telephoneDestinataire"
              name="telephoneDestinataire"
              v-model="customer.telephoneDestinataire"
              class="block h-[3em] w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-4"
            />
          </div>
        </div>

        <div class="typeDeFret">
          <label
            for="typeDeFret"
            class="block text-sm font-medium leading-6 text-gray-900"
          >
            Type de Fret
          </label>
          <div class="mt-2">
            <select
              id="typeDeFret"
              name="typeDeFret"
              v-model="customer.typeDeFret"
              autocomplete="typeDeFret"
              class="block h-[3em] w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
            >
              <option>Maritime</option>
              <option>Aérien</option>
            </select>
          </div>
        </div>

        <div class="destination">
          <label
            for="destination"
            class="block text-sm font-medium leading-6 text-gray-900"
          >
            Destination
          </label>
          <div class="mt-2">
            <select
              id="destination"
              name="destination"
              v-model="customer.destination"
              autocomplete="destination"
              class="block h-[3em] w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
            >
              <option>TOGO</option>
              <option>BENIN</option>
              <option>SENEGAL</option>
              <option>ABIDJAN</option>
              <option>CONGO</option>
            </select>
          </div>
        </div>

        <div class="nombreDeColis">
          <label
            for="nombreDeColis"
            class="block text-sm font-medium leading-6 text-gray-900"
          >
            Nombre de Colis
          </label>
          <div class="mt-2">
            <input
              type="text"
              id="nombreDeColis"
              name="nombreDeColis"
              v-model="customer.nombreDeColis"
              class="block h-[3em] w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-4"
            />
          </div>
        </div>

        <div>
          <label
            for="description"
            class="block text-sm font-medium leading-6 text-gray-900"
          >
            Description du Colis
          </label>
          <div class="text-black m-4" v-for="(colis, index) in colisList" :key="index">
            <h3 class="m-1">Colis {{ index + 1 }}</h3>
            <input type="text" v-model="colis.nom"  class="block h-[3em] w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-4"
                   placeholder="Cartons , Frigo . . . . "
            >
          </div>
          <button class=" btn btn-accent" type="button" @click="ajouterColis">Ajouter</button>
        </div>

        <div>
          <label
            class="block text-sm font-medium leading-6 text-gray-900"
            for="image"
          >
            Photos du coli
          </label>
          <div class="mt-2">
            <input
              type="file"
              id="image"
              @change="handleFileChange"
              accept="image/*"
              class="block bg-white file-input max-w-xs w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div class="personneEnCharge">
          <label
            for="personneEnCharge"
            class="block text-sm font-medium leading-6 text-gray-900"
          >
            Personne en charge de l'enlèvement
          </label>
          <div class="mt-2">
            <select
              id="personneEnCharge"
              name="personneEnCharge"
              v-model="customer.personneEnCharge"
              autocomplete="personneEnCharge"
              class="block h-[3em] w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
            >
            <option>Jules</option>
              <option>Abou</option>
              <option>Said</option>
              <option>Mathieu</option>
              <option>Autres</option>
            </select>
          </div>
        </div>

        <div class="statut">
          <label
            for="statut"
            class="block text-sm font-medium leading-6 text-gray-900"
          >
            Paiement Statut
          </label>
          <div class="mt-2">
            <select
              id="statut"
              name="statut"
              v-model="customer.statut"
              autocomplete="statut"
              class="block h-[3em] w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
            >
              <option>Non Payé</option>
              <option>Reste à payer</option>
              <option>Payé</option>
            </select>
          </div>
        </div>

        <div class="prix">
          <label
            for="prix"
            class="block text-sm font-medium leading-6 text-gray-900"
          >
            Prix
          </label>
          <div class="mt-2">
            <input
              type="text"
              id="prix"
              name="prix"
              v-model="customer.prix"
              class="block h-[3em] w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-4"
            />
          </div>
        </div>
        <div class="modeDePaiement">
          <label
            for="modeDePaiement"
            class="block text-sm font-medium leading-6 text-gray-900"
          >
            Mode de Paiement
          </label>
          <div class="mt-2">
            <select
              id="modeDePaiement"
              name="modeDePaiement"
              v-model="customer.modeDePaiement"
              autocomplete="modeDePaiement"
              class="block h-[3em] w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
            >
              <option>Chèque</option>
              <option>Espèces</option>
              <option>CB</option>
            </select>
          </div>
        </div>

        <div class="resteAPayer">
          <label
            for="prix"
            class="block text-sm font-medium leading-6 text-gray-900"
          >
            Reste à Payer
          </label>
          <div class="mt-2">
            <input
              v-model="customer.resteAPayer"
              type="text"
              id="resteAPayer"
              name="resteAPayer"
              class="block h-[3em] w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-4"
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
          <button class="btn btn-error text-white">Fermer</button>
        </form>
      </div>
    </div>
  </dialog>
</template>
