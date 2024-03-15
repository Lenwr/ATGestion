<script setup>
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list'
import interactionPlugin from '@fullcalendar/interaction'
import {reactive, ref, watch} from "vue";
import FullCalendar from "@fullcalendar/vue3";
import useEvents from "../components/useEvents.js";
import {useCollection, useFirestore } from "vuefire";
import {getFirestore, collection, addDoc} from 'firebase/firestore';

const {getEvents , createEvent , setEvents , updateEvent , deleteEvent} =  useEvents()
const id = ref(10)
const db = useFirestore()
const datas = useCollection(collection(db, 'events'))
const showModal = ref(false);
//send data planing to firebase

    let title = ref('')
    let start= ref('')
    let end =ref('')
    let allDay = ref('')
   


const submitForm = async () => {
  try {

    const db = getFirestore();
    const eventCollection = collection(db, 'events');
  
    const data = {
      title: title.value,
      start: start.value,
      allDay: true,
    };
    
    const newDocumentRef = await addDoc(eventCollection, data);
    console.log('Document ajouté avec ID :', newDocumentRef.id);
      title = ref('')
      start= ref('')
      end =ref('')
      allDay = ref('')
      alert("Déchargement enrégistré")
    
  } catch (error) {
    console.error('Erreur lors de l\'envoi du formulaire :', error);
  }
};

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
  plugins: [dayGridPlugin , timeGridPlugin , listPlugin , interactionPlugin] ,
  initialView :  'dayGridMonth' ,
  headerToolbar : {
    left : 'prev,next today',
    center : 'title',
    right: 'dayGridMonth,dayGridWeek,listDay'
  },
  editable : true ,
  selectable : true ,
  initialEvents:[],
  eventsSet:[],
  select: (arg) => {
   const cal = arg.view.calendar
    cal.unselect()
    cal.select({
       title : prompt('Please enter a new title for your event'),
    })
    cal.addEvent({

    })
  },
  eventClick: (arg)=> {
    console.log(arg)
  },
  events: [],
  eventAdd: (arg) => {

  },
});

// watch(getEvents , () =>{
//        options.events = datas.value.map((doc) => {
//       const formattedStart = display(doc.start)
//       //const formattedEnd = display(doc.end);
//       return {
//         id: doc.id,
//         title: doc.title,
//         start: formattedStart,
//         end: formattedStart,
//       }
//     })
//      //  console.log(options.events)
// })
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


</script>





<template>
<div class="pt-8 pb-[20%] bg px-1 flex flex-col">
      <FullCalendar
          class='text-black
mobile:text-[0.5em]'
          :options='options'
      >
      </FullCalendar>
      <div class="flex justify-center ">
        <div class="collapse w-[80%]  my-8  bg-primary mb-[30%]">
    <input type="checkbox" class="peer" />
    <div class="     collapse-title bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content">
     Ajouter un chargement
    </div>
    <div class=" pt-4 collapse-content bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content"> 
        <p>
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
        </p>
    </div>

  </div>
      </div>
  
</div>

</template>
