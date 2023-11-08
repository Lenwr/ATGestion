import { initializeApp } from 'firebase/app'
import { getFirestore, collection } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import {getAuth} from 'firebase/auth'
// ... other firebase imports

export const firebaseApp = initializeApp({
    apiKey: "AIzaSyAD3_lBREn2mj9hdNVG_oXmWAXpylFzI3o",
    authDomain: "aarontravelgestion.firebaseapp.com",
    projectId: "aarontravelgestion",
    storageBucket: "aarontravelgestion.appspot.com",
    messagingSenderId: "251921548029",
    appId: "1:251921548029:web:936a9dc35f715ae401f494",
    measurementId: "G-99L11P6DYT"
})

// used for the firestore refs
const db = getFirestore(firebaseApp)


const storage = getStorage(firebaseApp)

// here we can export reusable database references
export const eventsRef = collection(db, 'enlevements')
export const auth = getAuth()

export { storage }