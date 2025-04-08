import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../../firebase';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import './Header.css';

const Header = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    signOut(auth);
  };

  return (
    <header className="header">
      <h1 className="header-title">Self-Improvement</h1>
      <nav className="header-nav">
        {!user && <Link to="/" className="header-link">Home</Link>}
        {!user ? (
          <>
            <Link to="/login" className="header-link">Login</Link>
            <Link to="/signup" className="header-link">Sign Up</Link>
          </>
        ) : (
          <button className="header-button" onClick={handleLogout}>Logout</button>
        )}
      </nav>
    </header>
  );
};

export default Header;
