import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';

const energyOptions = ['Light', 'Neutral', 'Dark'];

const archetypes = [
  'Seer', 'Alchemist', 'Nurturer', 'Visionary',
  'Mystic', 'Warrior', 'Sage', 'Oracle',
  'Rebel', 'Lover', 'Guardian', 'Wanderer'
];

export default function SignatureStep() {
  const { setUserProfile } = useUser();
  const navigate = useNavigate(); // 👈 Initialize navigation

  const [energy, setEnergy] = useState('');
  const [archetype, setArchetype] = useState('');

  const handleSubmit = () => {
    if (energy && archetype) {
      setUserProfile({ energy, archetype });

      // Small delay for subtle transition
      setTimeout(() => {
        navigate('/companion');
      }, 800); // Optional delay for glow animation or confirmation sound
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white/5 p-6 rounded-2xl shadow-md backdrop-blur-md text-white">
      <h1 className="text-3xl font-bold text-lime-300 mb-6">🌌 Your Codex Signature</h1>

      <div className="mb-6">
        <label className="block text-white/80 mb-2 font-medium">⚡ Choose Your Energy Alignment:</label>
        <div className="flex space-x-4">
          {energyOptions.map((option) => (
            <button
              key={option}
              onClick={() => setEnergy(option)}
              className={`px-4 py-2 rounded-lg border ${
                energy === option ? 'bg-violet-600' : 'bg-black border-white/30'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-white/80 mb-2 font-medium">🧬 Choose Your Archetype:</label>
        <select
          value={archetype}
          onChange={(e) => setArchetype(e.target.value)}
          className="w-full p-2 bg-black border border-white/30 text-white rounded-md"
        >
          <option value="">-- Select Archetype --</option>
          {archetypes.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>

      <button
        onClick={handleSubmit}
        disabled={!energy || !archetype}
        className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2 rounded-lg disabled:opacity-30"
      >
        I’m Ready
      </button>
    </div>
  );
}
