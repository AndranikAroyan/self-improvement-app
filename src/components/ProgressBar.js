import React from 'react';

const ProgressBar = ({ completed, total }) => {
    const percentage = (completed / total) * 100;

    return (
        <div style={{ width: '100%', backgroundColor: '#ddd', borderRadius: '5px' }}>
            <div
                style={{
                    width: `${percentage}%`,
                    backgroundColor: '#007bff',
                    height: '10px',
                    borderRadius: '5px',
                }}
            ></div>
            <p>{completed}/{total} completed</p>
        </div>
    );
};

export default ProgressBar;