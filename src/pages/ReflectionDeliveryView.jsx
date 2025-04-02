import React from 'react';
import { WhisperReveal } from '@/components/animated/WhisperReveal';
import { useToneContext } from '@/context/ToneContext';
import { useUserContext } from '@/context/UserContext';
import { format } from 'date-fns';

const ReflectionDeliveryView = ({ reflection, onDownload }) => {
  const { userProfile } = useUserContext();
  const { currentTone } = useToneContext();

  const formattedDate = format(new Date(), 'MMMM d, yyyy');

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-8 text-white">
      <div className="mb-6 text-center">
        <h1 className="text-4xl font-bold tracking-wide mb-2">Your Reflection</h1>
        <p className="text-sm text-white/60">{formattedDate}</p>
      </div>

      <div className="bg-white/10 rounded-lg p-6 backdrop-blur border border-white/10 shadow-md">
        <WhisperReveal tone={currentTone} text={reflection.whisper} />

        <div className="mt-6">
          <p className="text-lg font-semibold mb-2">Affirmation</p>
          <p className="text-white/90">{reflection.affirmation}</p>
        </div>

        {reflection.ritual && (
          <div className="mt-6">
            <p className="text-lg font-semibold mb-2">Ritual Prompt</p>
            <p className="text-white/90">{reflection.ritual}</p>
          </div>
        )}

        {reflection.breath && (
          <div className="mt-6">
            <p className="text-lg font-semibold mb-2">Breath Cue</p>
            <p className="text-white/90">{reflection.breath}</p>
          </div>
        )}

        <div className="mt-8 flex justify-end">
          <button
            onClick={onDownload}
            className="px-4 py-2 rounded bg-lime-500 hover:bg-lime-600 text-black font-medium"
          >
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReflectionDeliveryView;
