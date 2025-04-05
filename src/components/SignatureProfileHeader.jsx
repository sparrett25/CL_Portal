// src/components/SignatureProfileHeader.jsx

export default function SignatureProfileHeader({ profile }) {
  if (!profile) return null;

  const { energy, archetype, phase } = profile;

  const energyColor = {
    Light: "text-yellow-300",
    Neutral: "text-teal-300",
    Dark: "text-purple-400",
  }[energy] || "text-white";

  return (
    <div className="p-6 rounded-xl bg-zinc-900 shadow-lg border border-zinc-700 animate-fade-in-up">
      <h2 className="text-lg uppercase tracking-wide text-zinc-400 mb-2">
        Your Signature Profile
      </h2>

      <div className="space-y-1">
        <p className="text-xl font-semibold">
          Energy Alignment: <span className={`${energyColor}`}>{energy}</span>
        </p>
        <p className="text-xl font-semibold">
          Archetype: <span className="text-indigo-300">{archetype}</span>
        </p>
        <p className="text-md text-zinc-400 italic">Phase: {phase}</p>
      </div>
    </div>
  );
}
