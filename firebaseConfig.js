// Import the functions you need from the SDKs you need
import {initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { collection, getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB6H5b688-CzvV18EFRdEH9OY_-VHBsuuk",
  authDomain: "fir-chat-e2673.firebaseapp.com",
  projectId: "fir-chat-e2673",
  storageBucket: "fir-chat-e2673.appspot.com",
  messagingSenderId: "560390708250",
  appId: "1:560390708250:web:d27aab49355543b051c5a3",
  measurementId: "G-KREDVXV0TV"
};  

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app,{persistence: getReactNativePersistence(AsyncStorage)})
export const db = getFirestore(app)

export const userRef = collection(db, "users")
export const roomRef = collection(db, "rooms")