// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "hobby-finder-15e57.firebaseapp.com",
  projectId: "hobby-finder-15e57",
  storageBucket: "hobby-finder-15e57.appspot.com",
  messagingSenderId: "392057186171",
  appId: "1:392057186171:web:5673c0fd771567a56fffde",
  measurementId: "G-4VV43RMNN6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };