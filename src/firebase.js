// Import the functions you need from the Firebase SDK
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Import Firebase Authentication
import { getAnalytics } from "firebase/analytics"; // Optional: For analytics

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AlzasyDlltAMMBuuu7k_kfvDBsmrNSpmZhiynE",
    authDomain: "self-improvement-app-b9c9c.firebaseapp.com",
    projectId: "self-improvement-app-b9c9c",
    storageBucket: "self-improvement-app-b9c9c.firebasestorage.app",
    messagingSenderId: "396267904708",
    appId: "1:396267904708:web:9fd52deabcd4e0ffe73391",
    measurementId: "G-RW062YQJ5H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
export const auth = getAuth(app);

// Initialize Firebase Analytics (optional)
const analytics = getAnalytics(app);