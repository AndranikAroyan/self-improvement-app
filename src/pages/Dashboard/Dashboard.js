import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header/Header';
import HabitTracker from '../../components/HabitTracker/HabitTracker';
import GoalTracker from '../../components/GoalTracker/GoalTracker';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <Header />
      <h2 className="dashboard-heading">Dashboard</h2>

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