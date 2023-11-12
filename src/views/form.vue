<script setup>
import { async } from '@firebase/util';
import {getFirestore, collection, addDoc} from 'firebase/firestore';
import {getStorage, ref as storageRef, uploadBytes, getDownloadURL} from 'firebase/storage';
import {ref} from "vue";
import Return from "../components/return.vue";
import router from "../router/index.js";

// export default {
//   components: {Return},
//   data() {
//     return {
//       formData: {
//         expediteur: ref(''),
//         statut: ref(''),
//         telephoneExpediteur: ref(''),
//         destinataire: ref(''),
//         telephoneDestinataire: ref(''),
//         typeDeFret: ref(''),
//         destination: ref(''),
//         nombreDeColis: ref(''),
//         description: ref(''),
//         personneEnCharge: ref(''),
//         prix: ref(''),
//         modeDePaiement: ref(''),
//         resteAPayer: ref(''),
//         date: ref(''),
//         image: null,
//       },
//     };
//   },

//   methods: {
//     handleFileChange(event) {
//       this.formData.image = event.target.files[0];
//     },
//     async submitForm() {
//       try {
//         // Obtenez les instances de Firestore et de Storage depuis la configuration Firebase
//         const db = getFirestore();
//         const enlevementsCollection = collection(db, 'enlevements');
//         const storage = getStorage();

//         // Téléchargez l'image vers Firebase Storage
//         const imageRef = storageRef(storage, `enlevements_images/${Date.now()}_${this.formData.image.name}`);
//         await uploadBytes(imageRef, this.formData.image);

//         // Obtenez l'URL de téléchargement de l'image
//         const imageUrl = await getDownloadURL(imageRef);

//         // Créez un document dans Firestore avec les données du formulaire
//         const Data = {
//           expediteur: expediteur.value,
//           statut: statut.value,
//           imageUrl: imageUrl, // Stockez l'URL de l'image dans Firestore
//           telephoneExpediteur: telephoneExpediteur.value,
//           destinataire: destinataire.value,
//           telephoneDestinataire: telephoneDestinataire.value,
//           typeDeFret: typeDeFret.value,
//           destination: destination.value,
//           nombreDeColis: nombreDeColis.value,
//           description: description.value,
//           personneEnCharge: personneEnCharge.value,
//           prix: prix.value,
//           modeDePaiement: modeDePaiement.value,
//           resteAPayer: resteAPayer.value,
//           date: date.value,
//           deliveryStatus: "En attente"
//         };
//         console.log(Data)
//         const newDocumentRef = await addDoc(enlevementsCollection, Data);
//         console.log('Document ajouté avec ID :', newDocumentRef.id);
//         await router.push({path: '/soumission'})
//       } catch (error) {
//         console.error('Erreur lors de l\'envoi du formulaire :', error);
//       }
//     },
//   },
// };

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
        resteAPayer:'',
        date: '',
        image: null,
})

const db = getFirestore();
    const enlevementsCollection = collection(db, 'enlevements');
    const storage = getStorage();


const handleFileChange = (event) => {
  customer.image = event.target.files[0];
};

async function submitForm(){
  try {
    // Téléchargez l'image vers Firebase Storage
    const imageRef = storageRef(storage, `enlevements_images/${Date.now()}_${customer.image}`);
    await uploadBytes(imageRef, customer.image);
    // Obtenez l'URL de téléchargement de l'image
    const imageUrl = await getDownloadURL(imageRef);
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
      deliveryStatus: "En attente"
    };

    console.log(Data);
    const newDocumentRef = await addDoc(enlevementsCollection, Data);
    console.log('Document ajouté avec ID :', newDocumentRef.id);
    await router.push({ path: '/soumission' });
  } catch (error) {
    console.error('Erreur lors de l\'envoi du formulaire :', error);
  }
};

</script>


<template>
  <return route="" />
  <div class="bg-white  flex h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img class="mx-auto h-[10em] w-auto" src="/images/people.png" alt="aaron-travel"/>
      <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Enregistrer un
        client </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
     <form class="space-y-6"  @submit.prevent="submitForm"  >

        <div class="date mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div class="sm:col-span-3">
            <label for="date" class="block text-sm font-medium leading-6 text-gray-900">Date</label>
            <div class="mt-2">
              <input type="datetime-local" name="date" v-model="customer.date" id="date" autocomplete="given-name"
                     class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
            </div>
          </div>
        </div>

        <div>
          <label for="expediteur" class="block text-sm font-medium leading-6 text-gray-900">Expéditeur</label>
          <div class="mt-2">
            <input id="expediteur" name="expediteur" v-model="customer.expediteur"
                   class="block h-[3em] w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-4"
                   placeholder="Nom et prénoms"/>
          </div>
        </div>

        <div class="telephoneExpediteur">
          <label for="telephoneExpediteur" class="block text-sm font-medium leading-6 text-gray-900">Telephone
            Expediteur</label>
          <div class="mt-2">
            <input type="tel" id="telephoneExpediteur" name="telephoneExpediteur" v-model="customer.telephoneExpediteur"
                   class="block h-[3em] w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-4"
                   placeholder="Telephone"/>
          </div>
        </div>

        <div>
          <label for="destinataire" class="block text-sm font-medium leading-6 text-gray-900">Destinataire</label>
          <div class="mt-2">
            <input id="destinataire" name="destinataire" v-model="customer.destinataire"
                   class="block h-[3em] w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-4"
                   placeholder="Nom et prénoms"/>
          </div>
        </div>

        <div class="telephoneDestinataire">
          <label for="telephoneDestinataire" class="block text-sm font-medium leading-6 text-gray-900">Telephone
            Destinataire</label>
          <div class="mt-2">
            <input type="tel" id="telephoneDestinataire" name="telephoneDestinataire" v-model="customer.telephoneDestinataire"
                   class="block h-[3em] w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-4"
                   placeholder="Telephone"/>
          </div>
        </div>

        <div class="typeDeFret">
          <label for="typeDeFret" class="block text-sm font-medium leading-6 text-gray-900">Type de Fret</label>
          <div class="mt-2">
            <select id="typeDeFret" name="typeDeFret" v-model="customer.typeDeFret" autocomplete="typeDeFret"
                    class="block h-[3em] w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
              <option> Maritime</option>
              <option> Aérien</option>
            </select>
          </div>
        </div>

        <div class="destination">
          <label for="destination" class="block text-sm font-medium leading-6 text-gray-900">Destination</label>
          <div class="mt-2">
            <select id="destination" name="destination" v-model="customer.destination" autocomplete="destination"
                    class="block h-[3em] w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
              <option> TOGO</option>
              <option> BENIN</option>
              <option> SENEGAL</option>
            </select>
          </div>
        </div>

        <div class="nombreDeColis">
          <label for="nombreDeColis" class="block text-sm font-medium leading-6 text-gray-900">Nombre de Colis</label>
          <div class="mt-2">
            <input type="text" id="nombreDeColis" name="nombreDeColis" v-model="customer.nombreDeColis"
                   class="block h-[3em] w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-4"
                   placeholder="Vous avez combien de colis ?"/>
          </div>
        </div>

        <div>
          <label for="description" class="block text-sm font-medium leading-6 text-gray-900">Description du
            Colis</label>
          <div class="mt-2">
            <input id="description" name="description" v-model="customer.description" type="text"
                   class=" block h-[3em] w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-4"
                   placeholder="Cartons , Frigo . . . . "/>
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium leading-6 text-gray-900" for="image">Photos du coli</label>
          <div class="mt-2">
            <input type="file" id="image" @change="handleFileChange" accept="image/*" 
                   class="block bg-white file-input max-w-xs w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
          </div>
        </div>


        <div class="personneEnCharge">
          <label for="personneEnCharge" class="block text-sm font-medium leading-6 text-gray-900">Personne en charge de
            l'enlèvement</label>
          <div class="mt-2">
            <select id="personneEnCharge" name="personneEnCharge" v-model="customer.personneEnCharge"
                    autocomplete="personneEnCharge"
                    class="block h-[3em] w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
              <option> Adèle</option>
              <option> Ibrahim</option>
              <option> Mathieu</option>
              <option> Autres</option>
            </select>
          </div>
        </div>

        <div class="statut">
          <label for="statut" class="block text-sm font-medium leading-6 text-gray-900">Paiement Statut</label>
          <div class="mt-2">
            <select id="statut" name="statut" v-model="customer.statut" autocomplete="statut"
                    class="block h-[3em] w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
              <option> Non Payé</option>
              <option> Reste à payer</option>
              <option> Payé</option>
            </select>
          </div>
        </div>


        <div class="prix">
          <label for="prix" class="block text-sm font-medium leading-6 text-gray-900">Prix</label>
          <div class="mt-2">
            <input type="text" id="prix" name="prix" v-model="customer.prix"
                   class="block h-[3em] w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-4"
                   placeholder="Prix total"/>
          </div>
        </div>
        <div class="modeDePaiement">
          <label for="modeDePaiement" class="block text-sm font-medium leading-6 text-gray-900">Mode de Paiement</label>
          <div class="mt-2">
            <select id="modeDePaiement" name="modeDePaiement" v-model="customer.modeDePaiement" autocomplete="modeDePaiement"
                    class="block h-[3em] w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
              <option> Chèque</option>
              <option> Espèces</option>
              <option> CB</option>
            </select>
          </div>
        </div>


        <div class="resteAPayer">
          <label for="prix" class="block text-sm font-medium leading-6 text-gray-900"> Reste à Payer</label>
          <div class="mt-2">
            <input v-model="customer.resteAPayer" type="text" id="resteAPayer" name="resteAPayer" 
                   class="block h-[3em] w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-4"
                   placeholder="Prix total"/>
          </div>
        </div>


        <div>
          <button   type="submit"
                  class="flex h-[3em] w-full justify-center rounded-md bg-primary px-3 py-1.5 mb-[2em] text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            Enregistrer
          </button>
        </div>
      </form>


    </div>
  </div>
</template>


<style scoped>

</style>