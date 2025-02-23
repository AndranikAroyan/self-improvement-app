import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Default calendar styles
import Header from '../../components/Header/Header';
import HabitTracker from '../../components/HabitTracker/HabitTracker';
import GoalTracker from '../../components/GoalTracker/GoalTracker';
import Journaling from '../../components/Journaling/Journaling'; // Import Journaling component
import './Dashboard.css';

const Dashboard = () => {
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState({});
  const [selectedDate, setSelectedDate] = useState(null); // Track selected date for adding notes
  const [noteInput, setNoteInput] = useState(''); // Track note input
  const [streak, setStreak] = useState({ current: 0, longest: 0 });

  // Function to calculate streaks
  const calculateStreaks = (completedDates) => {
    let currentStreak = 0;
    let longestStreak = 0;
    let previousDate = null;

    // Sort dates in ascending order
    const sortedDates = Object.keys(completedDates).sort((a, b) => new Date(a) - new Date(b));

    sortedDates.forEach((date) => {
      const currentDate = new Date(date);
      if (previousDate && (currentDate - previousDate) / (1000 * 60 * 60 * 24) === 1) {
        currentStreak++;
      } else {
        currentStreak = 1; // Reset streak if not consecutive
      }

      if (currentStreak > longestStreak) {
        longestStreak = currentStreak;
      }

      previousDate = currentDate;
    });

    setStreak({ current: currentStreak, longest: longestStreak });
  };

  // Update streaks whenever notes change
  useEffect(() => {
    calculateStreaks(notes);
  }, [notes]);

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  const handleTileClick = (date) => {
    setSelectedDate(date); // Set the selected date
    setNoteInput(notes[date.toDateString()] || ''); // Populate note input with existing note
  };

  const handleAddNote = () => {
    if (selectedDate) {
      setNotes((prevNotes) => ({
        ...prevNotes,
        [selectedDate.toDateString()]: noteInput,
      }));
      setSelectedDate(null); // Close the note input
      setNoteInput(''); // Clear the input field
    }
  };

  return (
    <div className="dashboard-container">
      <Header />
      <h2 className="dashboard-heading">Dashboard</h2>

      {/* Streak Display */}
      <div className="dashboard-streak-display">
        <p>🔥 Current Streak: {streak.current} days | Longest Streak: {streak.longest} days 🔥</p>
      </div>

      {/* Calendar Section */}
      <div className="dashboard-calendar-section">
        <Calendar
          onChange={handleDateChange}
          value={date}
          className="dashboard-calendar"
          tileClassName={({ date, view }) =>
            view === 'month' && notes[date.toDateString()] ? 'dashboard-calendar-completed' : 'dashboard-calendar-incomplete'
          }
          tileContent={({ date, view }) =>
            view === 'month' && notes[date.toDateString()] ? (
              <div className="dashboard-calendar-note">📝</div>
            ) : null
          }
          onClickDay={handleTileClick} // Handle tile clicks
        />
        <div className="dashboard-calendar-legend">
          <p>Green = Crushed it! 🎉</p>
          <p>Gray = Meh, try again tomorrow 💪</p>
        </div>

        {/* Note Input */}
        {selectedDate && (
          <div className="dashboard-note-input">
            <textarea
              value={noteInput}
              onChange={(e) => setNoteInput(e.target.value)}
              placeholder="Add a note for this day..."
              className="dashboard-note-textarea"
            />
            <button onClick={handleAddNote} className="dashboard-note-button">
              Save Note
            </button>
          </div>
        )}
      </div>

      {/* Journaling Section */}
      <Journaling />

      {/* Habit Tracker */}
      <HabitTracker />

      {/* Goal Tracker */}
      <GoalTracker />

      {/* Link to Profile */}
      <Link to="/profile" className="dashboard-link">View Profile</Link>
    </div>
  );
};

export default Dashboard;