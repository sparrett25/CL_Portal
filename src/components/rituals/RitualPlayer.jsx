import { useState } from "react";
import RitualPlayer from "./RitualPlayer";

export default function RitualPortal({ ritual, onClose }) {
  if (!ritual) return null;
  const [entered, setEntered] = useState(false);

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center px-6 py-12">
      {!entered ? (
        <div className="bg-zinc-900 rounded-xl shadow-xl border border-indigo-700 p-8 max-w-2xl w-full text-white text-center animate-fadeIn">
          <h2 className="text-xl font-bold text-indigo-300 mb-4 uppercase tracking-wide">
            {ritual.title}
          </h2>

          {ritual.image && (
            <img
              src={`/assets/rituals/cards/${ritual.filename}`}
              alt={ritual.title}
              className="w-full h-64 object-cover object-center rounded-md border border-indigo-500 mb-4"
            />
          )}

          <p className="text-indigo-200 italic mb-6 text-lg max-w-lg mx-auto">
            “{ritual.description}”
          </p>

          <button
            onClick={() => setEntered(true)}
            className="mt-2 px-6 py-2 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold transition"
          >
            Enter Ritual
          </button>
        </div>
      ) : (
        <div className='fixed inset-0 w-screen h-screen z-50'><RitualPlayer
            title={ritual.title}
            energy={ritual.energy || "Neutral"}
            onComplete={onClose}
          /></div>
      )}
    </div>
  );
}
