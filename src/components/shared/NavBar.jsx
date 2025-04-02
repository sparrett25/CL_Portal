// NavBar.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function NavBar() {
  const [open, setOpen] = useState(false);

  const toggleMenu = () => setOpen(!open);

  return (
    <header className="mb-8">
      <div className="flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-lime-300">☀️ Codex Lumina</Link>
        <button
          className="md:hidden text-white text-2xl"
          onClick={toggleMenu}
          aria-label="Toggle navigation"
        >
          ☰
        </button>
      </div>

      <nav
        className={`mt-4 md:mt-0 md:flex md:space-x-6 text-lg font-medium transition-all ${
          open ? 'block' : 'hidden'
        } md:block`}
      >
        <Link to="/companion" className="block py-2 hover:text-lime-400">🧬 Companion</Link>
        <Link to="/journal" className="block py-2 hover:text-lime-400">📓 Journal</Link>
        <Link to="/rituals" className="block py-2 hover:text-lime-400">🔮 Rituals</Link>
        <Link to="/onboarding" className="block py-2 hover:text-lime-400">🌟 Onboarding</Link>
        <Link to="/library" className="block py-2 hover:text-lime-400">📚 Library</Link>
      </nav>
    </header>
  );
}
