import React from 'react';

const LoadingSigil = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white dark:bg-zinc-900">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-16 h-16 border-4 border-indigo-300 dark:border-indigo-600 rounded-full animate-spin border-t-transparent"></div>
        <span className="text-indigo-600 dark:text-indigo-400 font-semibold text-lg animate-pulse">
          Awakening Codex...
        </span>
      </div>
    </div>
  );
};

export default LoadingSigil;
