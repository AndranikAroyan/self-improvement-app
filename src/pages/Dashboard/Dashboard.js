import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../../firebase';
import Header from '../../components/Header/Header';
import CalendarSection from '../../components/CalendarSection/CalendarSection';
import HabitTracker from '../../components/HabitTracker/HabitTracker';
import GoalTracker from '../../components/GoalTracker/GoalTracker';
import groqClient from '../../groq';
import './Dashboard.css';

const Dashboard = () => {
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [noteInput, setNoteInput] = useState('');
  const [habits, setHabits] = useState([]);
  const user = auth.currentUser; // Check user authentication

  useEffect(() => {
    const query = '*[_type == "habit"]';
    groqClient
      .fetch(query)
      .then((response) => setHabits(response))
      .catch((error) => console.error('Error fetching habits:', error));
  }, []);

  const handleDateChange = (newDate) => setDate(newDate);
  const handleTileClick = (date) => {
    setSelectedDate(date);
    setNoteInput(notes[date.toDateString()] || '');
  };
  const handleAddNote = () => {
    if (selectedDate) {
      setNotes((prevNotes) => ({ ...prevNotes, [selectedDate.toDateString()]: noteInput }));
      setSelectedDate(null);
      setNoteInput('');
    }
  };

  return (
    <div className="dashboard-container">
      <Header />

      {/* Profile Section - Only show if logged in */}
      {user && (
        <div className="profile-section">
          <Link to="/profile" className="profile-link">View Your Profile</Link>
        </div>
      )}

      {/* Calendar Section */}
      <Link to="/calendar" className="calendar-section">
        <h2>View Your Calendar</h2>
        <span className="calendar-link">Go to Calendar</span>
      </Link>

      {/* Libraries and AI Chat Section */}
      <div className="library-ai-section">
        <Link to="/Libraries" className="library-link">
          View Your Libraries
        </Link>
      </div>

      {/* Habit Tracker Section */}
      <div className="habit-tracker">
        <h3>Your Habits</h3>
        <HabitTracker habits={habits} />
      </div>

      {/* Goal Tracker Section */}
      <div className="goal-tracker">
        <h3>Your Goals</h3>
        <GoalTracker />
      </div>
    </div>
  );
};

export default Dashboard;
