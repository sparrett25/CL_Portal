export default function BreathingRitual() {
  return (
    <div className="flex justify-center mt-8">
      <div className="relative w-24 h-24">
        <div className="absolute inset-0 rounded-full bg-indigo-400/20 animate-breathPulse" />
        <div className="absolute inset-2 rounded-full bg-indigo-400/30 blur-sm" />
        <div className="absolute inset-4 rounded-full bg-indigo-500/40 blur-[2px]" />
      </div>
    </div>
  );
}
