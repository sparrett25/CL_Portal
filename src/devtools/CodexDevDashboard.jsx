import React, { useState } from 'react';
import LensVisualPreview from './LensVisualPreview';
import AffirmationLensPreview from './AffirmationLensPreview';
import LioraVoiceTester from './LioraVoiceTester';

const CodexDevDashboard = () => {
  const [activeTab, setActiveTab] = useState('lens');
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark bg-zinc-900 text-white' : 'bg-white text-zinc-800'}`}>
      <div className="p-6 max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">🧬 Codex Developer Dashboard</h1>
          <button
            onClick={toggleTheme}
            className="px-4 py-2 text-sm rounded-lg border shadow hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
          >
            Toggle {isDarkMode ? 'Light' : 'Dark'} Mode
          </button>
        </div>

        {/* Tabs */}
        <div className="flex space-x-4 mb-6 border-b border-zinc-300 dark:border-zinc-700">
          <button
            onClick={() => setActiveTab('lens')}
            className={`pb-2 text-sm font-medium border-b-2 ${
              activeTab === 'lens'
                ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                : 'border-transparent text-zinc-500'
            }`}
          >
            🔮 Lens Visuals
          </button>
          <button
            onClick={() => setActiveTab('affirmations')}
            className={`pb-2 text-sm font-medium border-b-2 ${
              activeTab === 'affirmations'
                ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                : 'border-transparent text-zinc-500'
            }`}
          >
            🗨️ Rephrased Affirmations
          </button>
          <button
            onClick={() => setActiveTab('voice')}
            className={`pb-2 text-sm font-medium border-b-2 ${
              activeTab === 'voice'
                ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                : 'border-transparent text-zinc-500'
            }`}
          >
            🗣️ Liora Voice Tester
          </button>
        </div>

        {/* Tab Content */}
        <div className="pt-2">
          {activeTab === 'lens' && <LensVisualPreview />}
          {activeTab === 'affirmations' && <AffirmationLensPreview />}
          {activeTab === 'voice' && <LioraVoiceTester />}
        </div>
      </div>
    </div>
  );
};

export default CodexDevDashboard;
