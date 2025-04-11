import { useEffect, useState } from "react";
import { getLioraToneResponse } from "./ToneResponseLogic";

export default function LioraCompanion({ currentTone = "neutral" }) {
  const [response, setResponse] = useState(getLioraToneResponse(currentTone));

  useEffect(() => {
    setResponse(getLioraToneResponse(currentTone));
  }, [currentTone]);

  return (
    <div className="p-6 rounded-2xl bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 shadow-xl text-white max-w-xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <div className={`w-14 h-14 rounded-full bg-${toneGlow(currentTone)} shadow-md`} />
        <div>
          <h2 className="text-xl font-semibold">Liora's Reflection</h2>
          <p className="text-sm text-zinc-400">Based on your current tone: <strong>{currentTone}</strong></p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="font-medium text-indigo-400">Affirmation</h3>
          <p className="text-lg">{response.affirmation}</p>
        </div>

        <div>
          <h3 className="font-medium text-indigo-400">Ritual Prompt</h3>
          <p className="text-md">{response.ritual}</p>
        </div>

        <div className="italic text-indigo-300 border-l-4 border-indigo-500 pl-4">
          “{response.whisper}”
        </div>
      </div>
    </div>
  );
}

function toneGlow(tone) {
  switch (tone) {
    case "hopeful":
      return "green-400";
    case "grateful":
      return "yellow-400";
    case "heavy":
      return "red-500";
    case "uncertain":
      return "blue-400";
    case "neutral":
    default:
      return "zinc-500";
  }
}
