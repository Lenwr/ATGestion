<script setup>
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list'
import interactionPlugin from '@fullcalendar/interaction'
import {computed, reactive, ref, watch} from "vue";
import FullCalendar from "@fullcalendar/vue3";
import {useCollection, useFirestore} from "vuefire";
import {getFirestore, collection, addDoc, doc, deleteDoc} from 'firebase/firestore';
import "vue3-toastify/dist/index.css";
import Export from "../components/export.vue";
import {toast} from "vue3-toastify";

const id = ref(10)
const db = useFirestore()
const datas = useCollection(collection(db, 'events'))
const showModal = ref(false);
let idItem = ref()
const database = getFirestore()
//send data planing to firebase

let title = ref('')
let start = ref('')
let end = ref('')
let allDay = ref('')

let newDatas = ref()
newDatas = computed(() => {
  return datas.value.map((doc) => {
    //const formattedEnd = display(doc.end);
    return {
      id: doc.id,
      title: doc.title,
      start: doc.start,
    };
  });
});

console.log(newDatas.value)

let todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today
let timeDisplay = todayStr + 'T12:00:00'
console.log(timeDisplay)


async function sup() {
  const DocRef = doc(database, 'events', idItem.value)
  await deleteDoc(DocRef)
      .then(() => {
        toast("Chargement supprimé", {
          "theme": "auto",
          "type": "danger",
          "autoClose": 1000,
          "dangerouslyHTMLString": true
        })
      })
}

const handleClick = (item) => {
  return new Promise((resolve, reject) => {
    resolve(item)
    idItem.value = item
  })
      .then(() => {
        const client = computed(() => {
          return newDatas.value.find((detail) => detail.id === item)
        })

        my_modal_1.showModal()
      })

}
let passTitleInput
const handleDate = (selectInfo) => {
  new Promise((resolve, reject)=>{
    my_modal_3.showModal()
    passTitleInput = selectInfo
  })
}
const passTitle = async ()=>{
  {
    const eventCollection = collection(db, 'events');
    const data = {
      title: title.value,
      start: passTitleInput.startStr,
      allDay: true,
    };
    const newDocumentRef = await addDoc(eventCollection, data);
    console.log('Document ajouté avec ID :', newDocumentRef.id);
    title.value = ''
    start.value = ''
    toast("Chargement enrégistré", {
      "theme": "auto",
      "type": "success",
      "autoClose": 1000,
      "dangerouslyHTMLString": true
    })
  }
}


// Fonction pour formater la date
const formatTimestamp = (firebaseTimestamp) => {
  const timestampInSeconds = firebaseTimestamp.seconds * 1000; // Convertir en millisecondes
  const date = new Date(timestampInSeconds);

  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');

  return `${year}-${month}-${day}`;
};

const display = (item) => {
  let todayStr = item.replace(/T.*$/, '') // YYYY-MM-DD of today
  //console.log(todayStr)
  return todayStr
}

const options = reactive({
  plugins: [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin],
  initialView: 'dayGridMonth',
  headerToolbar: {
    left: 'prev,next today',
    center: 'title',
    right: 'dayGridMonth,dayGridWeek,listDay'
  },
  editable: true,
  selectable: true,
  initialEvents: [],
  eventsSet: [],
  select: handleDate,
  eventClick: (arg) => {
    const id = arg.event.id
    handleClick(id)

  },
  events: newDatas,
  eventAdd: (arg) => {

  },
});

/**
 watch(datas, (oldDatas , newDatas) => {
  if (newDatas) {
    options.events = datas.value.map((doc) => {
      const formattedStart = display(doc.start);
     //const formattedEnd = display(doc.end);
      return {
        id : doc.id,
        title:doc.title ,
        start: formattedStart,
        end:formattedStart
      };
    });
  }
});
 **/


</script>


<template>
  <div class="pt-8 pb-[20%] bg px-1  flex flex-col">
    <div class="w-[90%] mx-[5%]  ">
      <FullCalendar
          class='text-black  h-[50%]
mobile:text-[0.5em]'
          :options='options'
      >
      </FullCalendar>
    </div>
    <!--   <div class="flex justify-center ">
         <div class="collapse w-[80%]  my-8  bg-primary mb-[30%]">
     <input type="checkbox" class="peer" />
     <div class="     collapse-title bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content">
      Ajouter un chargement
     </div>
     <div class=" pt-4 collapse-content bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content">

           <form class="space-y-6" @submit.prevent="submitForm">

 <div class="date mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
   <div class="sm:col-span-3">
     <label for="start" class="block text-sm font-medium leading-6 text-gray-900">Date</label>
     <div class="mt-2">
       <input type="datetime-local" name="start" v-model="start" id="date" autocomplete="given-name"
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
     </div>
   </div>
 </div>

 <div class="title" >
   <label for="title" class="block text-sm font-medium leading-6 text-gray-900">Nom</label>
   <div class="mt-2">
     <input type="text" id="title" name="title" v-model="title"
            class="block h-[3em] w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-4"
            placeholder="nom"/>
   </div>
 </div>
 <div>
   <button type="submit"
           class="flex h-[3em] w-full justify-center rounded-md bg-primary px-3 py-1.5 mb-[2em] text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
     Enregistrer
   </button>
 </div>
 <div>
 </div>
 </form>

     </div>

   </div>
       </div> -->
    <!-- Open the modal using ID.showModal() method -->
    <dialog id="my_modal_1" class="modal ">
      <div class="modal-box justify-center ">
        <h3 class="font-bold text-lg">Attention!</h3>
        <p class="py-4">Voulez vous supprimer ce chargement ? </p>
        <div>
        </div>
        <div class="modal-action flex justify-center ">
          <form method="dialog">
            <!-- if there is a button in form, it will close the modal -->
            <div class="flex justify-around">
              <button class="btn hover:btn-error w-[50%] mx-4" @click="sup">oui</button>
              <button class="btn hover:btn-success mx-4  w-[50%] ">Non</button>
            </div>

          </form>
        </div>
      </div>
    </dialog>

  </div>
  <!-- You can open the modal using ID.showModal() method -->


  <dialog id="my_modal_3" class="modal">
    <div class="modal-box">
      <form method="dialog">
        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
      </form>
      <h3 class="font-bold text-lg"></h3>
      <p class="py-4">Nom de l'évenement </p>
      <form  method="dialog">
      <input type="text" v-model="title" placeholder="" class="input input-bordered w-[60%] max-w-xs" />
        <button class="btn mx-3" @click="passTitle" > Enregistrer </button>
      </form>
    </div>
  </dialog>

</template>
