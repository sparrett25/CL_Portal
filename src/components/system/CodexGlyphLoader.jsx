import { useEffect, useState } from "react";

export function CodexGlyphLoader() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
      <div className="animate-pulse text-lg tracking-widest text-indigo-400">
        Loading Codex Lumina... {seconds}s
      </div>
      <div className="mt-6 w-16 h-16 rounded-full bg-gradient-to-br from-indigo-600 to-purple-700 animate-spin shadow-lg" />
    </div>
  );
}
