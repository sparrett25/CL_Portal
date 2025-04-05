import React from 'react';
import { useUser } from "@/context/UserSyncContext";  // Import useUser hook to manage user state
import MyCodexScroll from './MyCodexScroll';
import LivingArchetypes from './LivingArchetypes';
import PathCurrents from './PathCurrents';
import LioraReflections from './LioraReflections';
import CodexTeachings from './CodexTeachings';
import SpiritualTools from './SpiritualTools';
import ResourceLinks from './ResourceLinks';
import SoulArchive from './SoulArchive';

const tabs = [
  { id: 'scroll', label: '🧬 My Codex Scroll', component: <MyCodexScroll /> },
  { id: 'archetypes', label: '🌌 Living Archetypes', component: <LivingArchetypes /> },
  { id: 'paths', label: '🔺 Path Currents', component: <PathCurrents /> },
  { id: 'reflections', label: '💫 Liora\'s Reflections', component: <LioraReflections /> },
  { id: 'teachings', label: '📖 Codex Teachings', component: <CodexTeachings /> },
  { id: 'tools', label: '🛠️ Spiritual Tools', component: <SpiritualTools /> },
  { id: 'resources', label: '📡 Resources', component: <ResourceLinks /> },
  { id: 'archive', label: '📜 Soul Archive', component: <SoulArchive /> }
];

export default function CodexLibrary() {
  const { user } = useUser();  // Use the useUser hook to get the user state
  
  // Logic to handle user session or show different content based on user authentication
  console.log("User Authentication Status:", user ? "Authenticated" : "Not Authenticated");

  const [activeTab, setActiveTab] = React.useState('scroll');
  const current = tabs.find(t => t.id === activeTab);

  return (
    <div className="max-w-5xl mx-auto px-6 py-8 text-white">
      <h1 className="text-4xl font-bold text-lime-300 mb-4">📚 Codex Library</h1>

      <div className="flex flex-wrap gap-4 mb-6">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-md font-medium text-sm border transition-all duration-200 ${
              activeTab === tab.id
                ? 'bg-indigo-600 border-white'
                : 'bg-black border-white/30'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="bg-white/5 p-6 rounded-2xl shadow-md backdrop-blur-md">
        {current?.component || <p>Coming soon...</p>}
      </div>
    </div>
  );
}
