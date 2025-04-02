// Home.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleBegin = () => {
    navigate('/onboarding');
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-white to-zinc-100 text-center p-6">
      <h1 className="text-4xl sm:text-5xl font-bold mb-4">Welcome to Codex Lumina ✨</h1>
      <p className="text-lg text-zinc-600 max-w-xl mb-10">
        A sacred journey of self-discovery, alignment, and universal connection. Begin your luminous path.
      </p>
      <button
        className="px-6 py-3 bg-black text-white text-lg rounded-2xl shadow-lg hover:scale-105 transition"
        onClick={handleBegin}
      >
        Enter the Codex
      </button>
    </div>
  );
};

export default Home;
