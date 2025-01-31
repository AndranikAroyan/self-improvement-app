import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import HabitTracker from '../components/HabitTracker';
import GoalTracker from '../components/GoalTracker';
import ProgressBar from '../components/ProgressBar';

const Dashboard = () => {
    const [habits, setHabits] = React.useState([
        { id: 1, name: 'Meditation', completed: false },
        { id: 2, name: 'Exercise', completed: false },
        { id: 3, name: 'Reading', completed: false },
    ]);

    const [goals, setGoals] = React.useState([]);

    const completedHabits = habits.filter(habit => habit.completed).length;
    const completedGoals = goals.filter(goal => goal.completed).length;

    return (
        <div>
            <Header />
            <h2>Dashboard</h2>
            <Link to="/">
                <button style={{ marginBottom: '20px' }}>Back to Home</button>
            </Link>
            <ProgressBar completed={completedHabits} total={habits.length} />
            <HabitTracker habits={habits} setHabits={setHabits} />
            <ProgressBar completed={completedGoals} total={goals.length} />
            <GoalTracker goals={goals} setGoals={setGoals} />
        </div>
    );
};

export default Dashboard;