import React from 'react';
import LibraryEntryMultiFlavor from './LibraryEntryMultiFlavor';

export default function LibraryView() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-indigo-950 to-purple-950 text-white p-8">
      <h1 className="text-4xl font-bold text-lime-300 mb-8 text-center">📚 Codex Lumina Library</h1>

      <LibraryEntryMultiFlavor />
    </div>
  );
}
