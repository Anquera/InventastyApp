import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore, collection, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAKupPOS4lyXogqEBfcJuJtJ8gxvYyNVys",
    authDomain: "inventastyfirebase.firebaseapp.com",
    projectId: "inventastyfirebase",
    storageBucket: "inventastyfirebase.firebasestorage.app",
    messagingSenderId: "108828346599",
    appId: "1:108828346599:web:d607298448b4f6006f3a42",
    measurementId: "G-CS4M051CEY"
};

// Initialize Firebase (this should be done once)
const app = initializeApp(firebaseConfig);

// Enable persistent auth state
const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

// Initialize Firestore
const db = getFirestore(app);

// Exporting Firebase services to use across your app
export { app, auth, db, collection, getDocs, addDoc, deleteDoc, doc };
