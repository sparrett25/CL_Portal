import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';  // Your CSS file
import App from './App';  // Main App component
import { UserSyncProvider } from './context/UserSyncContext';  // Ensure context provider is used

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <UserSyncProvider>
      <App />
    </UserSyncProvider>
  </React.StrictMode>
);
