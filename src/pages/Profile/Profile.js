import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import { auth, db } from '../../firebase'; // Correct import path for Firebase Auth and Firestore
import { doc, getDoc, setDoc } from 'firebase/firestore';
import './Profile.css'; // Import Profile-specific styles

const Profile = () => {
  const user = auth.currentUser; // Check if the user is logged in
  const [userDetails, setUserDetails] = useState({
    firstName: '',
    lastName: '',
    weight: '',
    height: '',
    age: '',
  });

  // Fetch user profile from Firestore
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (user) {
        const userRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(userRef);
        if (docSnap.exists()) {
          setUserDetails(docSnap.data());
        }
      }
    };

    fetchUserProfile();
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSaveProfile = async () => {
    if (user) {
      const userRef = doc(db, 'users', user.uid);
      await setDoc(userRef, userDetails, { merge: true });
      alert('Profile updated successfully!');
    }
  };

  return (
    <div className="profile-container">
      <h2>Edit Profile</h2>
      <div className="profile-form">
        <input
          type="text"
          name="firstName"
          value={userDetails.firstName}
          onChange={handleInputChange}
          placeholder="First Name"
        />
        <input
          type="text"
          name="lastName"
          value={userDetails.lastName}
          onChange={handleInputChange}
          placeholder="Last Name"
        />
        <input
          type="number"
          name="weight"
          value={userDetails.weight}
          onChange={handleInputChange}
          placeholder="Weight"
        />
        <input
          type="number"
          name="height"
          value={userDetails.height}
          onChange={handleInputChange}
          placeholder="Height"
        />
        <input
          type="number"
          name="age"
          value={userDetails.age}
          onChange={handleInputChange}
          placeholder="Age"
        />
        <button onClick={handleSaveProfile}>Save Changes</button>
        <Link to="/dashboard" className="go-back-button">Go Back</Link> {/* Link to Dashboard */}
      </div>
    </div>
  );
};

export default Profile;
