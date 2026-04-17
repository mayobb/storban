// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);