import React, { useState } from 'react';

const HabitTracker = () => {
    const [habits, setHabits] = useState([
        { id: 1, name: 'Meditation', completed: false },
        { id: 2, name: 'Exercise', completed: false },
        { id: 3, name: 'Reading', completed: false },
    ]);

    const toggleHabit = (id) => {
        setHabits(habits.map(habit =>
            habit.id === id ? { ...habit, completed: !habit.completed } : habit
        ));
    };

    const addHabit = (name) => {
        const newHabit = {
            id: habits.length + 1,
            name,
            completed: false,
        };
        setHabits([...habits, newHabit]);
    };

    return (
        <div>
            <h2>Habit Tracker</h2>
            <ul>
                {habits.map(habit => (
                    <li key={habit.id}>
                        <label>
                            <input
                                type="checkbox"
                                checked={habit.completed}
                                onChange={() => toggleHabit(habit.id)}
                            />
                            {habit.name}
                        </label>
                    </li>
                ))}
            </ul>
            <button onClick={() => addHabit('New Habit')}>Add Habit</button>
        </div>
    );
};

export default HabitTracker;