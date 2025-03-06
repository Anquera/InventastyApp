import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
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

// Initialize Firebase services
export const app = initializeApp(firebaseConfig);

// Enable persistent auth state
const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export { auth };