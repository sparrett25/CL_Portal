// index.js or index.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // ← this is essential for Tailwind
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './context/UserContext'; // make sure this path matches your structure

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>  {/* <--- wrap App here */}
        <App />
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);
