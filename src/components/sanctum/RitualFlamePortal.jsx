import React, { useState } from "react";

export default function RitualFlamePortal() {
  const [isLit, setIsLit] = useState(false);

  return (
    <div className="mt-6 flex flex-col items-center space-y-2">
      <button
        onClick={() => setIsLit(true)}
        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-full text-white font-bold shadow-lg"
      >
        {isLit ? "🔥 Flame Lit" : "Light the Flame"}
      </button>
      {isLit && (
        <p className="text-sm text-indigo-300 italic max-w-sm text-center">
          “You are the fire remembering its source.”
        </p>
      )}
    </div>
  );
}
