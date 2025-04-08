import React from 'react';
import './ProgressBar.css';

const ProgressBar = ({ completed, total, label }) => {
  // If total is 0, show a message or hide the progress bar
  if (total === 0) {
    return null; // Hide the progress bar instead of showing an error
  }

  const percentage = (completed / total) * 100;

  return (
    <div className="progress-bar-container">
      <div className="progress-bar">
        <div
          className="progress-bar-fill"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <p className="progress-bar-label">
        {label}: {completed}/{total} completed
      </p>
    </div>
  );
};

export default ProgressBar;