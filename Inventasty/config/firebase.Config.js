// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAKupPOS4lyXogqEBfcJuJtJ8gxvYyNVys",
    authDomain: "inventastyfirebase.firebaseapp.com",
    projectId: "inventastyfirebase",
    storageBucket: "inventastyfirebase.firebasestorage.app",
    messagingSenderId: "108828346599",
    appId: "1:108828346599:web:d607298448b4f6006f3a42",
    measurementId: "G-CS4M051CEY"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);