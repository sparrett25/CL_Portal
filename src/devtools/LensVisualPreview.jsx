import React from 'react';
import { lensVisuals } from '@/config/belief_lens_visuals';

const LensVisualPreview = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {Object.entries(lensVisuals).map(([key, data]) => (
        <div
          key={key}
          className="bg-white dark:bg-zinc-800 rounded-xl p-4 shadow-md flex flex-col items-center justify-center text-center border border-zinc-200 dark:border-zinc-700 transition-all"
        >
          {/* Icon */}
          <div className="text-4xl opacity-80 mb-3">
            {data.icon || <span>—</span>}
          </div>

          {/* Lens Name */}
          <div className="text-md font-semibold capitalize mb-1">
            {key.replace('-', ' ')}
          </div>

          {/* Color Theme (if used) */}
          {data.color && (
            <div className={`text-sm mb-1 ${data.color}`}>
              {data.color}
            </div>
          )}

          {/* Description */}
          {data.description && (
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2">
              {data.description}
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

export default LensVisualPreview;
