import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../../firebase'; // Import Firebase auth and Firestore
import { doc, getDoc, setDoc } from 'firebase/firestore'; // Firestore functions
import './Profile.css';

const Profile = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [userDetails, setUserDetails] = useState({
    firstName: '',
    lastName: '',
    weight: '',
    height: '',
    age: '',
  });
  const [isFirstTime, setIsFirstTime] = useState(false); // Track first-time setup

  // Fetch user profile data on component mount
  useEffect(() => {
    const fetchProfile = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDoc = await getDoc(doc(db, 'users', user.uid)); // Fetch user document
        if (userDoc.exists()) {
          setUserDetails(userDoc.data()); // Set profile data
        } else {
          setIsFirstTime(true); // First-time setup
        }
      }
    };
    fetchProfile();
  }, []);

  const handleGoBack = () => {
    navigate(-1); // Go back to the previous page
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    const user = auth.currentUser;
    if (user) {
      await setDoc(doc(db, 'users', user.uid), userDetails); // Save profile data to Firestore
      setIsEditing(false);
      setIsFirstTime(false); // Mark first-time setup as complete
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  return (
    <div className="profile-container">
      <h2>Profile</h2>

      {/* First-Time Setup or Edit Form */}
      {(isFirstTime || isEditing) ? (
        <div className="edit-form">
          <input
            type="text"
            name="firstName"
            value={userDetails.firstName}
            onChange={handleChange}
            placeholder="First Name"
            className="profile-input"
          />
          <input
            type="text"
            name="lastName"
            value={userDetails.lastName}
            onChange={handleChange}
            placeholder="Last Name"
            className="profile-input"
          />
          <input
            type="number"
            name="weight"
            value={userDetails.weight}
            onChange={handleChange}
            placeholder="Weight (kg)"
            className="profile-input"
          />
          <input
            type="number"
            name="height"
            value={userDetails.height}
            onChange={handleChange}
            placeholder="Height (cm)"
            className="profile-input"
          />
          <input
            type="number"
            name="age"
            value={userDetails.age}
            onChange={handleChange}
            placeholder="Age"
            className="profile-input"
          />
          <button className="save-button" onClick={handleSave}>
            {isFirstTime ? 'Save Profile' : 'Save Changes'}
          </button>
        </div>
      ) : (
        <>
          {/* Display Profile Information */}
          <div className="user-details">
            <p>First Name: {userDetails.firstName}</p>
            <p>Last Name: {userDetails.lastName}</p>
            <p>Weight: {userDetails.weight} kg</p>
            <p>Height: {userDetails.height} cm</p>
            <p>Age: {userDetails.age}</p>
          </div>
          <button className="edit-button" onClick={handleEdit}>Edit Profile</button>
        </>
      )}

      {/* Back Button */}
      <button className="back-button" onClick={handleGoBack}>Go Back</button>
    </div>
  );
};

export default Profile;