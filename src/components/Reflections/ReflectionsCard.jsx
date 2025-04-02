import React, { useState } from 'react';
import WhisperReflectionBlock from '@/components/Liora/WhisperReflectionBlock';
import FullscreenWhisperModal from './FullscreenWhisperModal';

const auraBorderMap = {
  light: 'border-yellow-300',
  neutral: 'border-blue-300',
  dark: 'border-purple-400',
};

const ReflectionCard = ({ entry, index, onTogglePin }) => {
  const [showWhisperInline, setShowWhisperInline] = useState(false);
  const [showFullscreen, setShowFullscreen] = useState(false);

  const borderClass = auraBorderMap[entry.energy] || 'border-zinc-300';

  return (
    <>
      <div
        className={`relative border-2 rounded-xl p-4 mb-4 bg-white dark:bg-zinc-800 shadow-sm transition-all ${borderClass}`}
      >
        {/* 📌 Pin Toggle */}
        <button
          onClick={() => onTogglePin(index)}
          className="absolute top-2 right-2 text-xl text-emerald-500"
          title="Pin/Unpin"
        >
          {entry.pinned ? '❤️' : '🤍'}
        </button>

        {/* Whisper Text */}
        <p className="italic text-sm text-zinc-700 dark:text-zinc-200 leading-relaxed">
          {entry.text.length > 160 ? entry.text.slice(0, 160) + '…' : entry.text}
        </p>

        {/* Metadata */}
        <div className="mt-3 text-xs text-zinc-500 dark:text-zinc-400 flex justify-between">
          <span className="capitalize">{entry.lens} • {entry.energy}</span>
          <span>{new Date(entry.timestamp).toLocaleDateString()}</span>
        </div>

        {/* Actions */}
        <div className="mt-4 flex justify-center gap-4 text-sm">
          <button
            onClick={() => setShowWhisperInline((prev) => !prev)}
            className="text-indigo-600 hover:underline"
          >
            {showWhisperInline ? 'Hide Whisper' : '🔁 Whisper Again'}
          </button>
          <button
            onClick={() => setShowFullscreen(true)}
            className="text-indigo-500 hover:underline"
          >
            🧘 Expand
          </button>
        </div>

        {/* Inline Whisper Block */}
        {showWhisperInline && (
          <div className="mt-4">
            <WhisperReflectionBlock
              text={entry.text}
              lens={entry.lens}
              speed="slow"
              sound={
                entry.energy === 'light'
                  ? 'light-glow'
                  : entry.energy === 'dark'
                  ? 'depth-breath'
                  : 'veil-breath'
              }
            />
          </div>
        )}
      </div>

      {/* Fullscreen Whisper Modal */}
      <FullscreenWhisperModal
        isOpen={showFullscreen}
        onClose={() => setShowFullscreen(false)}
        entry={entry}
      />
    </>
  );
};

export default ReflectionCard;
