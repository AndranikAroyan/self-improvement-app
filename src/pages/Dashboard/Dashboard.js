// src/pages/Dashboard/Dashboard.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header/Header';
import HabitTracker from '../../components/HabitTracker/HabitTracker';
import GoalTracker from '../../components/GoalTracker/GoalTracker';
import CalendarSection from '../../components/CalendarSection/CalendarSection'; // Import the new component
import './Dashboard.css';
import '../../components/CalendarSection/CalendarSection.css'; // Import the newly created CSS file
import groqClient from '../../groq'; // Import your Groq client

const Dashboard = () => {
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [noteInput, setNoteInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [habits, setHabits] = useState([]);

  useEffect(() => {
    const query = '*[_type == "habit"]'; // Example query to get habits
    groqClient
      .fetch(query)
      .then((response) => {
        setHabits(response); // Set the fetched habits into state
      })
      .catch((error) => {
        console.error('Error fetching habits:', error);
      });
  }, []);

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  const handleTileClick = (date) => {
    setSelectedDate(date);
    setNoteInput(notes[date.toDateString()] || '');
  };

  const handleAddNote = () => {
    if (selectedDate) {
      setNotes((prevNotes) => ({
        ...prevNotes,
        [selectedDate.toDateString()]: noteInput,
      }));
      setSelectedDate(null);
      setNoteInput('');
    }
  };

  const handleSendMessage = async () => {
    if (userInput.trim()) {
      setIsLoading(true);
      setMessages((prev) => [...prev, { sender: 'user', text: userInput }]);

      try {
        const params = {
          messages: [
            { role: 'system', content: 'You are a helpful assistant.' },
            { role: 'user', content: userInput },
          ],
          model: 'llama3-8b-8192', // Specify the model you want to use
        };

        const chatCompletion = await groqClient.chat.completions.create(params);

        const aiResponse = chatCompletion.choices[0]?.message?.content || "Sorry, I couldn't generate a response.";
        setMessages((prev) => [...prev, { sender: 'ai', text: aiResponse }]);
      } catch (error) {
        console.error("Error:", error);
        setMessages((prev) => [
          ...prev,
          { sender: 'ai', text: "Sorry, something went wrong!" },
        ]);
      }

      setIsLoading(false);
      setUserInput('');
    }
  };

  return (
    <div className="dashboard-container">
      <Header />
      <h2 className="dashboard-heading">Dashboard</h2>

      {/* Use CalendarSection component here */}
      <CalendarSection
        date={date}
        notes={notes}
        onDateChange={handleDateChange}
        onTileClick={handleTileClick}
        selectedDate={selectedDate}
        noteInput={noteInput}
        setNoteInput={setNoteInput}
        handleAddNote={handleAddNote}
      />

      {/* Chat Interface Section */}
      <div className="dashboard-chat-section">
        <div className="chat-messages">
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.sender}`}>
              {msg.text}
            </div>
          ))}
          {isLoading && <div className="message ai">Thinking...</div>}
        </div>

        <div className="chat-input">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Type a message..."
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
      </div>

      {/* Habit Tracker Section */}
      <div className="habit-tracker">
        <h3>Your Habits</h3>
        <HabitTracker habits={habits} /> {/* Pass the fetched habits to the HabitTracker component */}
      </div>

      {/* Goal Tracker Section */}
      <div className="goal-tracker">
        <h3>Your Goals</h3>
        <GoalTracker /> {/* Use the GoalTracker component */}
      </div>

      {/* Link to Journaling Page */}
      <Link to="/journaling" className="dashboard-link">
        Go to Journaling
      </Link>
    </div>
  );
};

export default Dashboard;
