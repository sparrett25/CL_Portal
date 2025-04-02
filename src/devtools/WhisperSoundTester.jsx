import React from 'react';
import { playWhisperSound } from '@/utils/soundPlayer';

const whisperSounds = [
  { file: 'veil-breath', label: 'Neutral (Veil Breath)' },
  { file: 'light-glow', label: 'Light (Glowing Breath)' },
  { file: 'depth-breath', label: 'Dark (Deep Harmonic)' },
];

const WhisperSoundTester = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-indigo-600">🎧 Whisper Sound Tester</h2>
      <p className="text-sm text-zinc-500 dark:text-zinc-400">Preview Codex whisper tones and sonic moodscapes</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {whisperSounds.map(({ file, label }) => (
          <button
            key={file}
            onClick={() => playWhisperSound(file)}
            className="p-4 bg-white dark:bg-zinc-800 rounded-lg shadow border hover:bg-zinc-50 dark:hover:bg-zinc-700 transition"
          >
            <span className="font-medium">{label}</span>
            <div className="text-xs text-zinc-400 mt-1">{file}.mp3</div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default WhisperSoundTester;
