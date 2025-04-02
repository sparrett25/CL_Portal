import React from 'react';
import { useUserContext } from '@/context/UserContext';
import beliefLensVisuals from '@/data/belief_lens_visuals';

const SignatureSummaryScreen = () => {
  const { userProfile } = useUserContext();

  const lensKey = userProfile?.belief_lens || 'codex_lumina';
  const lensInfo = beliefLensVisuals[lensKey];

  const getEnergyAuraClass = (energy) => {
    switch (energy) {
      case 'Light':
        return 'from-yellow-300 via-white to-pink-200';
      case 'Dark':
        return 'from-purple-900 via-black to-indigo-800';
      case 'Neutral':
        return 'from-emerald-400 via-slate-800 to-cyan-300';
      default:
        return 'from-gray-700 to-gray-900';
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 pt-20 pb-12 text-white bg-gradient-to-br from-slate-950 via-black to-slate-900">
      <div className="max-w-2xl w-full text-center">
        <h2 className="text-3xl font-bold mb-6 tracking-wide">Your Codex Signature</h2>

        <div
          className={`rounded-xl border border-white/10 bg-gradient-to-br ${getEnergyAuraClass(
            lensInfo?.energyAlignment || 'Neutral'
          )} p-6 shadow-xl transition-all duration-500`}
        >
          <h3 className="text-xl font-semibold mb-2">{lensInfo?.title}</h3>
          <p className="text-sm text-slate-200">{lensInfo?.description}</p>

          <div className="mt-6">
            <img
              src={lensInfo?.preview}
              alt={lensKey}
              className="w-40 h-40 mx-auto rounded-full border border-white/10 shadow-lg"
            />
          </div>
        </div>

        <div className="mt-8">
          <p className="text-xs text-slate-400">
            This signature may evolve as your journey unfolds.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignatureSummaryScreen;
