// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";           // Import getAuth
import { getFirestore } from "firebase/firestore";  // Import getFirestore

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBeBsAGGovPycuOLgLkYNJcbQfEKCcAQyU",
  authDomain: "self-improvement-v2.firebaseapp.com",
  projectId: "self-improvement-v2",
  storageBucket: "self-improvement-v2.firebasestorage.app",
  messagingSenderId: "950484322941",
  appId: "1:950484322941:web:653b7d7b991466a4393f14",
  measurementId: "G-24YK1E149L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
export const auth = getAuth(app);

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Analytics
const analytics = getAnalytics(app);
