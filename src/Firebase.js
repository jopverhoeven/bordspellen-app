// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBlVamFvsTS4R2XYQ8Ygbsyv93YWdNsCVg",
  authDomain: "localhost",
  projectId: "scoreboard-games",
  storageBucket: "scoreboard-games.appspot.com",
  messagingSenderId: "522550849697",
  appId: "1:522550849697:web:29bdc0d8859a9fe89480e0"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);