// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getFirestore, collection } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBLO_sh6Rl1wpqnOjuO-OOoB9ektXBVe1I",
  authDomain: "fnv-app-c7ee7.firebaseapp.com",
  projectId: "fnv-app-c7ee7",
  storageBucket: "fnv-app-c7ee7.firebasestorage.app",
  messagingSenderId: "468995880329",
  appId: "1:468995880329:web:9e625dccb8ec1a4dc85d58",
  measurementId: "G-QBLRQ9S46Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)
export const confCol = collection(db, 'confessions')