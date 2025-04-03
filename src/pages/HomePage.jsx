// src/pages/HomePage.jsx
import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { UserContext } from '../context/UserContext';
import LioraWelcome from '../components/LioraWelcome';
import SidebarDrawer from '../components/SidebarDrawer';

const HomePage = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [pulse, setPulse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    if (!user) return;

    const fetchProfile = async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error || !data) {
        console.error('Failed to load profile:', error);
        return;
      }

      setProfile(data);
    };

    const fetchPulse = async () => {
      setPulse({
        affirmation: 'I return to center and breathe into possibility.',
        ritual: '3-minute breath ritual with hands on heart.',
        breath: 'Box Breathing (4-4-4-4)',
      });
    };

    fetchProfile();
    fetchPulse();
    setLoading(false);
  }, [user]);

  useEffect(() => {
    if (profile) {
      const isComplete =
        profile.nickname && profile.archetype && profile.energy && profile.phase;
      if (!isComplete) {
        navigate('/onboarding');
      }
    }
  }, [profile]);

  if (loading || !profile) return <div className="p-6 text-white">Loading your Codex...</div>;

  return (
    <div className="min-h-screen bg-black text-white px-6 py-10 relative">

      <button
        onClick={() => setDrawerOpen(true)}
        className="fixed top-5 right-5 z-40 bg-white/10 text-white px-3 py-2 rounded-lg hover:bg-white/20"
      >
        ☰ My Codex
      </button>

      <SidebarDrawer
        open={drawerOpen}
        profile={profile}
        onClose={() => setDrawerOpen(false)}
      />

      <LioraWelcome
        nickname={profile.nickname}
        energy={profile.energy}
      />

      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-wide mb-4">
          Welcome, {profile.nickname || 'Seeker'} ✨
        </h1>
        <p className="text-lg text-gray-300">
          Your current alignment is:
        </p>
        <div className="mt-2 text-xl font-medium">
          {profile.energy} Energy · {profile.archetype} · {profile.phase}
        </div>
      </div>

      <div className="mt-10 bg-white/5 rounded-2xl p-6 shadow-xl space-y-4 border border-white/10">
        <h2 className="text-2xl font-semibold text-lime-200">
          🌕 Lumina Pulse: Today’s Alignment
        </h2>
        <p><strong>Affirmation:</strong> {pulse.affirmation}</p>
        <p><strong>Ritual:</strong> {pulse.ritual}</p>
        <p><strong>Breath:</strong> {pulse.breath}</p>
      </div>
    </div>
  );
};

export default HomePage;
