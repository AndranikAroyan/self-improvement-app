import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header'; // Correct import path for Header
import Footer from '../../components/Footer/Footer'; // Correct import path for Footer
import './Home.css';

const Home = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleGetStarted = () => {
    navigate('/login'); // Redirect to the Login page
  };

  return (
    <div className="home-container">
      <Header />
      <main className="home-main">
        {/* Hero Section with Background Image */}
        <section className="hero-section">
          <div className="hero-content">
            <h1>Welcome to Self-Improvement</h1>
            <p>Start your journey to a better you today!</p>
            <button className="cta-button" onClick={handleGetStarted}>
              Get Started
            </button>
          </div>
        </section>

        {/* Self-Improvement Text Section */}
        <section className="self-improvement-text">
          <h2>Why Self-Improvement?</h2>
          <p>
            Self-improvement is the key to unlocking your full potential. Whether it's building new habits,
            achieving your goals, or discovering new ways to grow, we're here to guide you every step of the way.
          </p>
        </section>

        {/* Track Habits and Discover Goals Section */}
        <div className="habits-goals-container">
          {/* Track Habits Section */}
          <section className="track-habits-section">
            <h2>Track Your Habits</h2>
            <p>Monitor your daily habits and stay accountable to achieve lasting personal growth.</p>
          </section>

          {/* Discover Goals Section */}
          <section className="discover-goals-section">
            <h2>Discover New Goals</h2>
            <p>Explore a variety of useful habits tailored to enhance your self-improvement journey.</p>
          </section>
        </div>

        {/* Offer Section */}
        <section className="offer-section">
          <h2>What We Offer</h2>
          <p>
            At Self-Improvement, we empower you with cutting-edge tools and resources designed to transform your life. 
            From habit-tracking dashboards to personalized goal-setting frameworks, we provide everything you need to 
            stay focused, motivated, and on track. Our platform adapts to your unique journey, helping you celebrate 
            small wins and achieve big dreams.
          </p>
        </section>

        {/* About Us Section */}
        <section className="about-contact-section">
          <div className="about-us">
            <h2>About Us</h2>
            <p>
              We are a team dedicated to helping individuals achieve their full potential through self-improvement
              and personal growth.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Home;