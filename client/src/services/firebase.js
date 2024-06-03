// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAs9krDtgPkMOsQvlKWe42QYW5mw61VIww",
  authDomain: "pavithra-bookshop.firebaseapp.com",
  projectId: "pavithra-bookshop",
  storageBucket: "pavithra-bookshop.appspot.com",
  messagingSenderId: "1001746335626",
  appId: "1:1001746335626:web:8e808b3211b368fb7b2a73",
  measurementId: "G-MT4ZN233B3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
const analytics = getAnalytics(app);