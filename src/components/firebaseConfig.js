import { initializeApp } from 'firebase/app'
import { getFirestore, collection } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import {getAuth} from 'firebase/auth'
import {useCollection} from "vuefire";
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
export const db = getFirestore(firebaseApp)


const storage = getStorage(firebaseApp)

// here we can export reusable database reference
export const auth = getAuth()
export const listeEnlevements = useCollection(collection(db, 'enlevements'))
export const listeCustomers = useCollection(collection(db, 'customers'))
export { storage  }
