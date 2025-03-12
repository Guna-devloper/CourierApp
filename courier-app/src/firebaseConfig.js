// src/firebase.js

// Import the functions you need from the SDKs
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDjrhwbfmum1tuSc8mu5J1KaPfWJ65IBRI",
  authDomain: "courierapp-com.firebaseapp.com",
  projectId: "courierapp-com",
  storageBucket: "courierapp-com.appspot.com", // Fixed incorrect storage bucket URL
  messagingSenderId: "17484110797",
  appId: "1:17484110797:web:284041df2faa6ebed1c284",
  measurementId: "G-7ETHPB0J6M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const analytics = getAnalytics(app);

export { auth, db, analytics };
