import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBDYP8Dfj3Qirfd8Tz2H874vtHiXaRloBc",
  authDomain: "storban-65d28.firebaseapp.com",
  databaseURL: "https://storban-65d28-default-rtdb.firebaseio.com",
  projectId: "storban-65d28",
  storageBucket: "storban-65d28.firebasestorage.app",
  messagingSenderId: "805408206012",
  appId: "1:805408206012:web:cee2f003a5b5753885f4b9",
  measurementId: "G-KB20YWM74R"
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Initialize and export Firestore Database
export const db = getFirestore(app);