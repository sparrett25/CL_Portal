import React from 'react';
import SidebarDrawer from '../components/SidebarDrawer';
import CompanionPanel from '../components/CompanionPanel';
import JournalTab from '../components/journal/JournalTab';
import RitualSpotlight from '../components/RitualSpotlight';
import { useUser } from '../context/UserContext';

export default function HomePage() {
  const { user, profile } = useUser();

  if (!user) {
    return (
      <div className="h-screen flex items-center justify-center bg-black text-white">
        <p>Loading your Codex...</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-black via-zinc-900 to-gray-900 text-white">
      {/* 🌙 Sidebar with Avatar + Logout */}
      <SidebarDrawer />

      {/* 🔮 Main Portal Content */}
      <main className="flex-1 overflow-y-auto p-6 space-y-8">
        <section>
          <h1 className="text-3xl font-bold fade-in-up">
            Welcome back, {profile?.nickname || 'Luminary'} ✨
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Phase: <span className="text-purple-400">{profile?.phase}</span> | Energy: <span className="text-blue-300">{profile?.energy}</span>
          </p>
        </section>

        {/* 🧬 Companion AI Guidance */}
        <CompanionPanel />

        {/* 🔥 Daily Ritual Feature */}
        <RitualSpotlight />

        {/* 📓 Journal Portal */}
        <JournalTab />
      </main>
    </div>
  );
}
