import React from "react";
import { useUser } from "@/context/UserContext";
import LioraCompanion from "@/components/Liora/LioraCompanion";
import AmbientAudioToggle from "@/components/Audio/AmbientAudioToggle"; // optional
import JournalCTA from "@/components/Journal/JournalCTA"; // optional

export default function HomePage() {
  const { userProfile } = useUser();

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-black to-zinc-900 text-white px-6 py-10">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Greeting */}
        <header className="text-center space-y-2">
          <h1 className="text-4xl font-extrabold text-lime-300 drop-shadow">
            Welcome back, Luminary
          </h1>
          {userProfile && (
            <p className="text-zinc-400 text-md">
              You are aligned with <span className="font-semibold text-indigo-400">{userProfile.energy}</span> energy as the <span className="font-semibold text-indigo-400">{userProfile.archetype}</span>.
            </p>
          )}
        </header>

        {/* Ambient Sound Toggle */}
        <AmbientAudioToggle />

        {/* Liora Companion Display */}
        <LioraCompanion currentTone="neutral" />

        {/* Journal Call to Action */}
        <JournalCTA />

        {/* Portal to Rituals or Dashboard */}
        <div className="text-center mt-12">
          <a
            href="/rituals"
            className="inline-block px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg transition"
          >
            ✨ Enter Ritual Portals
          </a>
        </div>
      </div>
    </div>
  );
}
