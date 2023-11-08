import {onUnmounted, ref} from "vue";
import {useCollection, useFirestore} from "vuefire";
import {addDoc, collection} from "firebase/firestore";
const db = useFirestore()
const datas = useCollection(collection(db, 'events'))




export default function useEvents() {

    const getEvents = []
    const setEvents = async () => {
        getEvents.value = datas.value
        console.log(getEvents.value)
    }
    const createEvent = async (event) => {
        const newEventRef = await addDoc(eventsCollection, event);
   };
    const updateEvent = (event , id)=>{
            mutateEvent(event , id)
    }
    const deleteEvent = (id)=>{
        destroy( id)
    }


    onUnmounted(setEvents)
    return {
        getEvents,
        setEvents,
        createEvent,
        updateEvent,
        deleteEvent
    }


}