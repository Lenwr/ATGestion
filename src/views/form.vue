<script setup>
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import { getFirestore, collection, addDoc } from 'firebase/firestore'
import {
  getStorage,
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from 'firebase/storage'
import { ref } from 'vue'
import Return from '../components/return.vue'
import router from '../router/index.js'
import SelectCustomersView from './selectCustomersView.vue'

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
})

const db = getFirestore()
const enlevementsCollection = collection(db, 'enlevements')
const storage = getStorage()

const handleFileChange = (event) => {
  customer.image = event.target.files[0]
}

async function submitForm() {
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
      colis:  colisList.value,
      personneEnCharge: customer.value.personneEnCharge,
      prix: customer.value.prix,
      modeDePaiement: customer.value.modeDePaiement,
      resteAPayer: customer.value.resteAPayer,
      date: customer.value.date,
      deliveryStatus: 'En attente',
    }

    console.log(Data)
    const newDocumentRef = await addDoc(enlevementsCollection, Data)
    console.log('Document ajouté avec ID :', newDocumentRef.id)
    //await router.push({path: '/soumission'})
     customer.value.expediteur = '' ,
     customer.value.statut = '' ,
         imageUrl, // Stockez l'URL de l'image dans Firestore
      customer.value.telephoneExpediteur = '' ,
         customer.value.destinataire = '' ,
         customer.value.telephoneDestinataire = '' ,
         customer.value.typeDeFret = '' ,
         customer.value.destination = '' ,
         customer.value.nombreDeColis = '' ,
         customer.value.colisList = [] ,
         customer.value.personneEnCharge = '' ,
         customer.value.prix = '' ,
         customer.value.modeDePaiement = '' ,
         customer.value.resteAPayer = '' ,
         customer.value.date = '' ,
         customer.value.image = null ,
         customer.value.deliveryStatus ='En attente',
    await console.log('formulaire envoyé ')
    toast("Formulaire envoyé", {
      "theme": "auto",
      "type": "success",
      "autoClose":1000,
      "dangerouslyHTMLString": true
    })
  } catch (error) {
    console.error("Erreur lors de l'envoi du formulaire :", error)
  }
}

//update deliveryStatus
async function submitEnlevement(id) {
  const DocRef = doc(database, 'customers', id)
  const change = document.getElementById('sel')
  await updateDoc(DocRef, {
    deliveryStatus: change.value,
  })

  // watch(change , (odlValue, newValue) =>{
  // })
}



const colisList = ref([{ nom: '' }]);

const ajouterColis = () => {
  colisList.value.push({ nom: ''});
  console.log(colisList.value);
};
</script>

<template>
  <!-- <return route="" /> -->
  <div
    class="bg-white flex h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8"
  >
    <SelectCustomersView />
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img
        class="mx-auto h-[10em] w-auto"
        src="/images/people.png"
        alt="aaron-travel"
      />
      <h2
        class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"
      >
        Enregistrer des Colis
      </h2>
    </div>
    <div>
     <!--<SelectCustomersView />-->
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" @submit.prevent="submitForm">
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
                required
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
              placeholder="Nom et prénoms"
            />
          </div>
        </div>

        <div class="telephoneExpediteur">
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
              placeholder="Telephone"
            />
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
              placeholder="Nom et prénoms"
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
              placeholder="Telephone"
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
              placeholder="Vous avez combien de colis ?"
            />
          </div>
        </div>

        <div>
          <label
            for="Colis"
            class="block text-sm font-medium leading-6 text-gray-900"
          >
            Description du Colis
          </label>
          <div class="mt-2">
         <!--   <input
              id="description"
              name="description"
              v-model="customer.description"
              type="text"
              class="block h-[3em] w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-4"
              placeholder="Cartons , Frigo . . . . "
            /> -->
          </div>

          <div class="text-black m-4" v-for="(colis, index) in colisList" :key="index">
            <h3 class="m-1">Colis {{ index + 1 }}</h3>
            <input type="text" v-model="colis.nom"  class="block h-[3em] w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-4"
                   placeholder="Cartons , Frigo . . . . "
            >
            <!-- Ajoutez d'autres champs pour le colis ici si nécessaire -->

            <hr>
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
              required
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
              placeholder="Prix total"
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
              <option>Virement</option>
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
              placeholder="Prix total"
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
    </div>
  </div>
</template>

<style scoped></style>
