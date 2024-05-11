<script setup>

import {useCollection, useFirestore} from "vuefire";
import {addDoc, collection, doc, getFirestore, updateDoc} from "firebase/firestore";
import {useRoute} from 'vue-router'
import {computed, onMounted, reactive, ref, watch} from "vue";
import router from "../router/index.js";
import {StreamBarcodeReader} from 'vue-barcode-reader'
import {toast} from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import Export from "../components/export.vue";
import {isEqual} from "lodash";
import {format} from "date-fns";
import frLocale from "date-fns/locale/fr";

const route = useRoute()
const db = useFirestore()
const Liste = useCollection(collection(db, 'chargements'))
const enlevements = useCollection(collection(db, 'enlevements'))
const detailId = ref(route.params.id)
let display = ref(false)
const liste = computed(() => {
return Liste.value.find((detail) => detail.id === detailId.value)
})

const clientsFiltres = computed(() => {
  return enlevements.value.filter(client => liste.value.packagesTable.includes(client.id));
});

const chargement = ref({
  contenaire: '',
  date: '',
  packagesTable: []
})

const formatDateTime = (dateTimeString) => {
  const date = new Date(dateTimeString)

  return format(date, "EEEE d MMMM yyyy à HH'h' mm", { locale: frLocale })
}

const packageInfo = computed(() => {
  return Liste.value.find((detail) => detail.id === detailId.value)
})

//test

const onLoaded = () => {
  console.log('loaded')
}
const decodedText = ref('')

const docRef = doc(db, 'chargements', detailId.value)

async function updateChargement() {
  const data = {
    packagesTable: liste.packagesTable.concat(chargement.value.packagesTable)
  }
  const updateChargementDoc = await updateDoc(docRef, data)
}

async function onDecode(text) {
  const [expediteur, coli,date,id] = text.split(',');
  decodedText.value = text;

  const Package = ref({expediteur, coli,date,id});
  //
  if (!packageInfo.value.packagesTable.some(item => isEqual(item, Package.value))) {
    const data = {
      packagesTable: packageInfo.value.packagesTable.concat(Package.value)
    };
    const updateChargementDoc = await updateDoc(docRef, data);
    toast("Colis ajouté avec succès", {
      "theme": "auto",
      "type": "success",
      "autoClose": 2000,
      "dangerouslyHTMLString": true
    })
  } else {
    toast(`Le colis ${Package.value.coli} de ${Package.value.expediteur} est déjà présent dans le chargement.`, {
      "theme": "auto",
      "type": "success",
      "autoClose": 2000,
      "dangerouslyHTMLString": true
    })
  }
}

</script>

<template>

  <div class="text-black  flex flex-row justify-around items-center m-8">
    <h2>Enregistrement des colis </h2>
    <button class="btn" @click="display=!display" > {{!display?'Début':'Fermer'}} </button>

  </div>

  <dialog id="modal" class="modal">
    <div class="modal-box bg-white">


      <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">

        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form class="space-y-6" @submit.prevent="updateChargement">
            <div>
              <label for="id" class="block text-sm font-medium leading-6 text-gray-900">Id</label>
              <div class="mt-2">
                <input v-model="chargement.packagesTable" type="text" :placeholder="liste?.packagesTable"
                       autocomplete="date" required=""
                       class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
              </div>
            </div>
            <div>
              <button type="submit"
                      class="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                Enregistrer
              </button>
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


  <div class="flex justify-center bg-black" v-if="display">
    <StreamBarcodeReader
        @decode="onDecode"
        @loaded="onLoaded"
    ></StreamBarcodeReader>
  </div>


  <div class="flex my-[10%] flex-col w-screen">
    <div class="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
      <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
        <div class="overflow-hidden">
          <table class="min-w-full">
            <thead class="bg-white border-b">
            <tr>
              <th
                  scope="col"
                  class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Expéditeur
              </th>
              <th
                  scope="col"
                  class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                 Colis
              </th>
              <th
                  scope="col"
                  class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Date d'enlèvement
              </th>
            </tr>
            </thead>
            <tbody>
            <tr
                class="bg-gray-100 border-b"
                v-for="(item, i) in packageInfo.packagesTable"
                :key="i"
            >
              <td
                  class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"
              >
                {{ item.expediteur }}
              </td>
              <td
                  class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"
              >
                {{ item.coli }}
              </td>
              <td
                  class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"
              >
                {{formatDateTime(item.date )}}
              </td>

            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>

  <div class="flex justify-center py-5">

    <Export class="text-black  " :dataSend=packageInfo.packagesTable />
  </div>

  <div class="flex items-center justify-center "><img src="/images/chargements.jpg" alt=""
                                                      class="w-[80%] rounded-2xl shadow-2xl mb-[30%]  "/>
  </div>

</template>


<style scoped>

</style>