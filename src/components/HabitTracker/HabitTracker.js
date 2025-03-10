import React, { useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import ProgressBar from '../ProgressBar/ProgressBar';
import './HabitTracker.css';

const HabitTracker = () => {
  const [habits, setHabits] = useState([]);
  const [newHabit, setNewHabit] = useState('');

  const toggleHabit = (id) => {
    setHabits(habits.map(habit =>
      habit.id === id ? { ...habit, completed: !habit.completed } : habit
    ));
  };

  const addHabit = () => {
    if (newHabit.trim()) {
      const newHabitObj = {
        id: habits.length + 1,
        name: newHabit,
        completed: false,
      };
      setHabits([...habits, newHabitObj]);
      setNewHabit('');
    }
  };

  const deleteHabit = (id) => {
    setHabits(habits.filter(habit => habit.id !== id));
  };

  const completedHabits = habits.filter(habit => habit.completed).length;
  const totalHabits = habits.length;

  return (
    <div className="habit-tracker">
      <h2 className="habit-tracker-title">Habit Tracker</h2>
      <div className="add-habit">
        <input
          type="text"
          value={newHabit}
          onChange={(e) => setNewHabit(e.target.value)}
          placeholder="Enter a new habit"
          className="habit-input"
        />
        <button className="add-habit-button" onClick={addHabit}>Add Habit</button>
      </div>
      <ul className="habit-list">
        {habits.map(habit => (
          <li key={habit.id} className="habit-item">
            <label className="habit-label">
              <input
                type="checkbox"
                checked={habit.completed}
                onChange={() => toggleHabit(habit.id)}
                className="habit-checkbox"
              />
              <span className={habit.completed ? 'habit-name completed' : 'habit-name'}>
                {habit.name}
              </span>
            </label>
            <FaTrash className="delete-icon" onClick={() => deleteHabit(habit.id)} />
          </li>
        ))}
      </ul>
      {totalHabits > 0 && (
        <ProgressBar completed={completedHabits} total={totalHabits} label="Habits" />
      )}
    </div>
  );
};

export default HabitTracker;