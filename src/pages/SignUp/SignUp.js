import React, { useState } from 'react';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import './SignUp.css';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await sendEmailVerification(userCredential.user);
      setMessage('Verification email sent! Please check your inbox.');
    } catch (error) {
      setError(error.message);
    }
  };

  const handleGoBack = () => {
    navigate('/'); // Redirect to Home page
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        <h2 className="signup-title">Sign Up</h2>
        {error && <p className="signup-error">{error}</p>}
        {message && <p className="signup-message">{message}</p>}
        <form className="signup-form" onSubmit={handleSubmit}>
          <input
            className="signup-input"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="signup-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="signup-button" type="submit">Sign Up</button>
        </form>
        <p className="signup-text">
          Already have an account? <a className="signup-link" href="/login">Login</a>
        </p>
        <button className="signup-go-back" onClick={handleGoBack}>Go to Home</button>
      </div>
    </div>
  );
};

export default SignUp;
