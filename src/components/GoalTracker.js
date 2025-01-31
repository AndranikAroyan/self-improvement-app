import React, { useState } from 'react';

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

    return (
        <div>
            <h2>Goal Tracker</h2>
            <input
                type="text"
                value={newGoal}
                onChange={(e) => setNewGoal(e.target.value)}
                placeholder="Enter a new goal"
            />
            <button onClick={addGoal}>Add Goal</button>
            <ul>
                {goals.map(goal => (
                    <li key={goal.id}>
                        <label>
                            <input
                                type="checkbox"
                                checked={goal.completed}
                                onChange={() => toggleGoal(goal.id)}
                            />
                            {goal.name}
                        </label>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default GoalTracker;