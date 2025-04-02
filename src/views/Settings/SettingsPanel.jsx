import React, { useState } from 'react';
import { useUserContext } from '@/context/UserContext';
import ResetRitualModal from '@/components/Modals/ResetRitualModal';
import { Sparkles } from 'lucide-react';
import { lensVisuals } from '@/config/belief_lens_visuals';

const SettingsPanel = () => {
  const [showResetModal, setShowResetModal] = useState(false);
  const { userProfile } = useUserContext();

  const lens = userProfile?.belief_lens || 'default';
  const energy = userProfile?.energy_alignment || 'neutral';
  const phase = userProfile?.phase || '—';
  const visual = lensVisuals[lens];

  // Aura ring styles by energy
  const energyAuraClass = {
    light: 'ring-2 ring-yellow-300 shadow-yellow-200',
    neutral: 'ring-2 ring-blue-300 shadow-blue-100',
    dark: 'ring-2 ring-purple-500 shadow-purple-300',
  }[energy] || '';

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold text-center text-indigo-700">
        Codex Settings
      </h1>

      {/* 🧬 Signature Block with Aura + Glyph */}
      <div
        className={`relative bg-zinc-100 dark:bg-zinc-800 rounded-xl p-4 shadow-md transition-all ${energyAuraClass}`}
      >
        {/* Belief Lens Glyph Overlay */}
        {visual?.icon && (
          <div className="absolute right-4 top-2 opacity-10 text-6xl pointer-events-none">
            {visual.icon}
          </div>
        )}

        <h2 className="text-lg font-semibold mb-2 text-zinc-700 dark:text-zinc-200">
          Your Current Signature
        </h2>
        <ul className="text-sm text-zinc-600 dark:text-zinc-300 space-y-1">
          <li><strong>Belief Lens:</strong> {lens}</li>
          <li><strong>Energy Alignment:</strong> {energy}</li>
          <li><strong>Phase:</strong> {phase}</li>
        </ul>
      </div>

      {/* 🌀 Reset Ritual */}
      <div className="border-t pt-6 mt-6">
        <div className="flex items-center space-x-3 mb-2">
          <Sparkles className="text-indigo-500 animate-pulse" size={20} />
          <h2 className="text-lg font-semibold text-red-600">Reset Your Journey</h2>
        </div>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
          Re-enter the Codex through a ritual of renewal. You may choose to preserve your personal insights, or begin again completely.
        </p>

        <button
          onClick={() => setShowResetModal(true)}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
        >
          Reset Your Journey
        </button>
      </div>

      {showResetModal && (
        <ResetRitualModal onClose={() => setShowResetModal(false)} />
      )}
    </div>
  );
};

export default SettingsPanel;
