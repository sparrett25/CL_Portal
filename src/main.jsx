import React from "react";
import ReactDOM from "react-dom/client";
import App from "@/App.jsx";  // Corrected import using @
import "@/index.css";  // Tailwind base
import "@/App.css";    // Your global styles and animations

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
