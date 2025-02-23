import React from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../../firebase'; // Correct import path for Firebase Auth
import { signOut } from 'firebase/auth'; // For signing out
import './Header.css'; // Import Header-specific styles

const Header = () => {
  const user = auth.currentUser; // Check if the user is logged in

  const handleLogout = () => {
    signOut(auth); // Logout the user
  };

  return (
    <header className="header">
      <h1 className="header-title">Self-Improvement</h1>
      <nav className="header-nav">
        <Link to="/" className="header-link">Home</Link>
        {!user ? (
          <>
            <Link to="/login" className="header-link">Login</Link>
            <Link to="/signup" className="header-link">Sign Up</Link>
          </>
        ) : (
          <>
            <Link to="/dashboard" className="header-link">Dashboard</Link>
            <Link to="/profile" className="header-link">Profile</Link> {/* Add Profile link */}
            <button className="header-button" onClick={handleLogout}>Logout</button>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;