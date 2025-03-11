// Import the functions you need from the SDKs you need
import { getReactNativePersistence, initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB6H5b688-CzvV18EFRdEH9OY_-VHBsuuk",
  authDomain: "fir-chat-e2673.firebaseapp.com",
  projectId: "fir-chat-e2673",
  storageBucket: "fir-chat-e2673.firebasestorage.app",
  messagingSenderId: "560390708250",
  appId: "1:560390708250:web:d27aab49355543b051c5a3",
  measurementId: "G-KREDVXV0TV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const auth = initializeAuth(app,{persistence: getReactNativePersistence()})