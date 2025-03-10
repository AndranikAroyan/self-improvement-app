import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home'; // Correct import path for Home
import Login from './pages/Login/Login'; // Correct import path for Login
import SignUp from './pages/SignUp/SignUp'; // Correct import path for SignUp
import Dashboard from './pages/Dashboard/Dashboard'; // Correct import path for Dashboard
import JournalingPage from './pages/JournalingPage/JournalingPage'; // Import JournalingPage
import { auth } from './firebase'; // Import Firebase Auth
import { onAuthStateChanged } from 'firebase/auth'; // Listener to check auth status
import Profile from './pages/Profile/Profile'; // Import the Profile component
import './App.css';

const App = () => {
  const [user, setUser] = useState(null); // To manage user state (null = not logged in)
  const [loading, setLoading] = useState(true); // To show loading screen until auth state is resolved

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Set user state
      setLoading(false); // Once auth state is checked, stop loading
    });

    return () => unsubscribe(); // Cleanup the listener when the component unmounts
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Show loading state while Firebase checks auth
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> {/* Home Page */}
        <Route path="/login" element={<Login />} /> {/* Login Page */}
        <Route path="/signup" element={<SignUp />} /> {/* SignUp Page */}
        <Route path="/profile" element={<Profile />} /> {/* Profile Page */}
        <Route path="/dashboard" element={<Dashboard />} /> {/* Dashboard Page */}
        <Route path="/journaling" element={<JournalingPage />} /> {/* New Journaling Page */}
      </Routes>
    </Router>
  );
};

export default App;
