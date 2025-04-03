// src/components/SidebarDrawer.jsx
import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';

const avatars = ['liora1', 'liora2', 'liora3']; // Add more as needed

const SidebarDrawer = ({ profile, open, onClose }) => {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState(profile?.nickname || '');

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  const handleNicknameUpdate = async () => {
    if (nickname && nickname !== profile.nickname) {
      await supabase.from('profiles').update({ nickname }).eq('id', profile.id);
    }
  };

  const handleAvatarSelect = async (avatar) => {
    await supabase.from('profiles').update({ avatar }).eq('id', profile.id);
    window.location.reload();
  };

  const handleThemeToggle = () => {
    const current = localStorage.getItem('theme') || 'dark';
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.classList.remove(current);
    document.documentElement.classList.add(next);
    localStorage.setItem('theme', next);
  };

  const containerClasses = open
    ? 'translate-x-0 opacity-100'
    : 'translate-x-full opacity-0';

  return (
    <div
      className={`fixed top-0 right-0 h-full w-80 bg-gray-900 shadow-xl z-50 transform transition-all duration-500 ease-in-out ${containerClasses} border-l border-indigo-500/20`}
    >
      <div className="absolute -left-10 top-10 w-8 h-8 animate-pulse bg-indigo-500 rounded-full blur-md"></div>

      <div className="p-6 flex flex-col h-full">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-white">My Codex</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white text-2xl">&times;</button>
        </div>

        <div className="mt-6 flex flex-col items-center">
          <div
            className="w-20 h-20 rounded-full bg-cover bg-center shadow-lg mb-4"
            style={{
              backgroundImage: `url(/avatars/${profile.avatar || 'liora1'}.png)`,
            }}
          ></div>

          <input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            onBlur={handleNicknameUpdate}
            className="w-full px-3 py-2 mt-2 rounded bg-white/10 text-white text-center outline-none focus:ring-2 focus:ring-lime-400"
          />
          <p className="text-sm text-gray-400 mt-1">
            {profile.archetype} · {profile.phase}
          </p>
        </div>

        <div className="mt-6">
          <label className="text-sm text-gray-300">Select Avatar</label>
          <div className="flex space-x-2 mt-2 overflow-x-auto">
            {avatars.map((avatar) => (
              <button
                key={avatar}
                onClick={() => handleAvatarSelect(avatar)}
                className={`w-12 h-12 rounded-full border-2 ${
                  profile.avatar === avatar ? 'border-lime-400' : 'border-white/10'
                }`}
                style={{ backgroundImage: `url(/avatars/${avatar}.png)`, backgroundSize: 'cover' }}
              />
            ))}
          </div>
        </div>

        <div className="mt-8 flex-1 space-y-3">
          <button className="w-full py-2 px-4 rounded-lg bg-teal-600 text-white hover:bg-teal-500">
            ✅ Mark Today’s Ritual as Complete
          </button>

          <button
            onClick={handleThemeToggle}
            className="w-full py-2 px-4 rounded-lg bg-blue-700 text-white hover:bg-blue-600"
          >
            🌓 Toggle Theme
          </button>
        </div>

        <div className="mt-auto">
          <button
            onClick={handleLogout}
            className="w-full py-2 px-4 rounded-lg bg-red-600 text-white hover:bg-red-500"
          >
            🔓 Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default SidebarDrawer;
