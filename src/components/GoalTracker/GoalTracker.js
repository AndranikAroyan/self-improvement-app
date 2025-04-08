import React, { useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import ProgressBar from '../ProgressBar/ProgressBar';
import './GoalTracker.css';

const GoalTracker = () => {
  const [goals, setGoals] = useState([]);
  const [newGoal, setNewGoal] = useState('');

  const addGoal = () => {
    if (newGoal.trim()) {
      const goal = {
        id: goals.length + 1,
        name: newGoal,
        completed: false,
      };
      setGoals([...goals, goal]);
      setNewGoal('');
    }
  };

  const toggleGoal = (id) => {
    setGoals(goals.map(goal =>
      goal.id === id ? { ...goal, completed: !goal.completed } : goal
    ));
  };

  const deleteGoal = (id) => {
    setGoals(goals.filter(goal => goal.id !== id));
  };

  const completedGoals = goals.filter(goal => goal.completed).length;
  const totalGoals = goals.length;

  return (
    <div className="goal-tracker">
      <h2 className="goal-tracker-title">Goal Tracker</h2>
      <div className="add-goal">
        <input
          type="text"
          value={newGoal}
          onChange={(e) => setNewGoal(e.target.value)}
          placeholder="Enter a new goal"
          className="goal-input"
        />
        <button className="add-goal-button" onClick={addGoal}>Add Goal</button>
      </div>
      <ul className="goal-list">
        {goals.map(goal => (
          <li key={goal.id} className="goal-item">
            <label className="goal-label">
              <input
                type="checkbox"
                checked={goal.completed}
                onChange={() => toggleGoal(goal.id)}
                className="goal-checkbox"
              />
              <span className={goal.completed ? 'goal-name completed' : 'goal-name'}>
                {goal.name}
              </span>
            </label>
            <FaTrash className="delete-icon" onClick={() => deleteGoal(goal.id)} />
          </li>
        ))}
      </ul>
      {totalGoals > 0 && (
        <ProgressBar completed={completedGoals} total={totalGoals} label="Goals" />
      )}
    </div>
  );
};

export default GoalTracker;