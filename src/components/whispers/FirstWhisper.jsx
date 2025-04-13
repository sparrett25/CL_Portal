import React from "react";

// 🔮 Sample whispers keyed to tone, phase, or archetype
const whisperLibrary = {
  joy: "You laughed — and the cosmos remembered its song.",
  fear: "You did not run. That was your magic.",
  grief: "You softened where others shattered. That is sacred.",
  peace: "You are no longer searching. You are arriving.",
  clarity: "The mirror does not lie. And neither do you.",
  Awakening: "You have stirred from the veil — welcome to the flame.",
  Visionary: "You are the ember of futures unseen. Light the path.",
};

export default function FirstWhisper({ tone = null, phase = null, archetype = null }) {
  const toneKey = tone?.toLowerCase();
  const quote =
    whisperLibrary[toneKey] ||
    whisperLibrary[phase] ||
    whisperLibrary[archetype] ||
    "You are not late. You arrived precisely when the Codex began to breathe.";

  return (
    <div className="mt-6 p-4 bg-zinc-900 border border-indigo-500/50 rounded-xl shadow-inner text-indigo-300 text-sm text-center max-w-xl mx-auto italic">
      🕯️ <span>{quote}</span>
    </div>
  );
}
