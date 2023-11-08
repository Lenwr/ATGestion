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
import {get, timestamp} from "@vueuse/core";
import {format} from "date-fns";
import frLocale from "date-fns/locale/fr";

const {getEvents , createEvent , setEvents , updateEvent , deleteEvent} =  useEvents()
const id = ref(10)
const db = useFirestore()
const datas = useCollection(collection(db, 'events'))
const showModal = ref(false);
//send data planing to firebase

    const title = ref('')
    const start= ref('')
    const end =ref('')
    const allDay = ref('')
   


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
    console.log(data)
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
  initialEvents: [],
  eventsSet:datas.value,
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
  events: [
  ],
  eventAdd: (arg) => {

  },
});

watch(getEvents , () =>{

})
watch(datas, () => {
  if (datas.value) {
    options.events = datas.value.map((doc) => {
      const formattedStart = display(doc.start);
      console.log(formattedStart)
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
<div class="flex flex-row justify-around items-center text-black py-4">
    <p> Ajouter un Chargement </p>
    <!-- The button to open modal -->
<a href="#my_modal_8" class="btn btn-primary mx-4 mobile:w-[20%]">ajouter</a>
<!-- Put this part before </body> tag -->
<div class="modal" id="my_modal_8">
    <div class="modal-box bg-white">
    <h3 class="font-bold text-lg">Hello!</h3>
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
    <div class="modal-action">
     <a href="#" class="btn">Fermer</a>
    </div>

  </div>
</div>
</div>



      <FullCalendar
          class='text-black
mobile:text-[0.5em]'
          :options='options'
      >
      </FullCalendar>
</div>


</template>
