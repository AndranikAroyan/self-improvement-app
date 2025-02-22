import React from 'react';
import { createRoot } from 'react-dom/client'; // Import createRoot from react-dom/client
import App from './App';
import { AuthProvider } from './AuthContext';

// Get the root element
const container = document.getElementById('root');
const root = createRoot(container); // Create a root

// Render the app
root.render(
    <React.StrictMode>
        <AuthProvider>
            <App />
        </AuthProvider>
    </React.StrictMode>
);