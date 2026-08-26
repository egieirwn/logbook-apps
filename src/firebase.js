// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAz6WpoMwCK2mNzZwjJ8LE5JvN77F73QgY",
  authDomain: "logbook-apps.firebaseapp.com",
  projectId: "logbook-apps",
  storageBucket: "logbook-apps.firebasestorage.app",
  messagingSenderId: "711703839215",
  appId: "1:711703839215:web:2f8e84b3116b96519cb61a",
  measurementId: "G-KC1P53R5KN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);