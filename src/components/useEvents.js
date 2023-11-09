import { onMounted, ref } from 'vue'
import { useCollection, useFirestore } from 'vuefire'
import { addDoc, collection } from 'firebase/firestore'
const db = useFirestore()
const datas = useCollection(collection(db, 'events'))
const display = (item) => {
  let todayStr = item.replace(/T.*$/, '') // YYYY-MM-DD of today
  //console.log(todayStr)
  return todayStr
}

export default function useEvents() {
  const getEvents = ref([])
  const setEvents = async () => {
  
  }

  const createEvent = async (event) => {
    const newEventRef = await addDoc(eventsCollection, event)
  }

  const updateEvent = (event, id) => {
    mutateEvent(event, id)
  }

  const deleteEvent = (id) => {
    destroy(id)
  }

  onMounted(setEvents)

  return {
    getEvents,
    setEvents,
    createEvent,
    updateEvent,
    deleteEvent,
  }
}
