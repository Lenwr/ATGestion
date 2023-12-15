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


  console.log(liste.value)


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
  telephoneExpediteur: liste.telephone,
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
    // Obtenez l'URL de téléchargement de l'image
    const imageUrl = await getDownloadURL(imageRef)
    // Créez un document dans Firestore avec les données du formulaire
    const Data = {
      expediteur: customer.value.expediteur,
      statut: customer.value.statut,
      imageUrl: imageUrl, // Stockez l'URL de l'image dans Firestore
      telephoneExpediteur: customer.value.telephoneExpediteur,
      destinataire: customer.value.destinataire,
      telephoneDestinataire: customer.value.telephoneDestinataire,
      typeDeFret: customer.value.typeDeFret,
      destination: customer.value.destination,
      nombreDeColis: customer.value.nombreDeColis,
      description: customer.value.description,
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
    await router.push({ path: '/soumission' })
  } catch (error) {
    console.error("Erreur lors de l'envoi du formulaire :", error)
  }
}
</script>

<template>
  <div class="flex flex-col items-center">
    <span
      class="bg-primary my-5 px-10 rounded-md shadow-2xl text-[2em] text-white"
    >
      Enlèvements
    </span>
    <p v-for="item in liste" :key="item"></p>
    <span
      class="bg-primary my-5 px-10 rounded-md shadow-2xl text-[2em] text-white"
      onclick="send.showModal()"
    >
      Nouvel Envoi
    </span>

    <div class="flex flex-col w-full">
      <div
        v-for="(item, i) in listeColis"
        :key="i"
        class="bg-[#EFFAED] px-6 text-[1em] h-[5em] w-full text-black flex items-center justify-center"
      >
        <span class="text-black px-4">
          Enlevement du {{ formatDateTime(item.date) }}
        </span>
        <router-link :to="'/liste/' + item.id">
          <button class="btn outline-secondary">voir</button>
        </router-link>
      </div>
    </div>
  </div>

  <dialog id="send" class="modal">
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
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
        </div>

        <div>
          <label
            for="expediteur"
            class="block text-sm font-medium leading-6 text-gray-900"
          >
            Expéditeur
          </label>
          <div class="mt-2">
            <input
              id="expediteur"
              name="expediteur"
              v-model="customer.expediteur"
              class="block h-[3em] w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-4"
            />
          </div>
        </div>

        <!-- <div class="telephoneExpediteur">
          <label
            for="telephoneExpediteur"
            class="block text-sm font-medium leading-6 text-gray-900"
          >
            Telephone Expediteur
          </label>
          <div class="mt-2">
            <input
              type="tel"
              id="telephoneExpediteur"
              name="telephoneExpediteur"
              v-model="customer.telephoneExpediteur"
              class="block h-[3em] w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-4"
            />
          </div>
        </div> -->

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
          <div class="mt-2">
            <input
              id="description"
              name="description"
              v-model="customer.description"
              type="text"
              class="block h-[3em] w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-4"
            />
          </div>
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
              <option>Adèle</option>
              <option>Ibrahim</option>
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
