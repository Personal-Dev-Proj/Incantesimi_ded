// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBhk8OlplA4X1mdKlwcUsV-1SIk7CaaghM",
  authDomain: "dungeonsanddragons-777.firebaseapp.com",
  projectId: "dungeonsanddragons-777",
  storageBucket: "dungeonsanddragons-777.firebasestorage.app",
  messagingSenderId: "861264504435",
  appId: "1:861264504435:web:0505bd3d81b70027a62c06",
  measurementId: "G-LHBMQBGTDJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export {app, db, analytics}