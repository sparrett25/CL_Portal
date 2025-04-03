import { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link component from react-router
import { useUserSync } from "@/context/UserSyncContext";
import SignatureProfileHeader from "@/components/dashboard/SignatureProfileHeader";
import DailyAlignmentSpotlight from "@/components/dashboard/DailyAlignmentSpotlight";
import CompanionPanel from "@/components/dashboard/CompanionPanel";
import CollectivePulseCard from "@/components/dashboard/CollectivePulseCard";
import UserSettingsPanel from "@/components/dashboard/UserSettingsPanel";
import LiorasWhisper from "@/components/dashboard/LiorasWhisper"; // Import Liora's Whispers component

export default function HomePage() {
  const context = useUserSync() || {};
  const { userProfile, loading } = context;

  const [showSettings, setShowSettings] = useState(false);

  if (loading || !userProfile) {
    return <div className="text-center mt-20 text-white">Loading your profile...</div>;
  }

  return (
    <div className="relative space-y-6 p-6 max-w-5xl mx-auto">
      {/* 🔮 Signature Modules */}
      <SignatureProfileHeader />
      <DailyAlignmentSpotlight />
      <CompanionPanel />
      <CollectivePulseCard />

      {/* ⚙️ Settings Trigger */}
      <div className="text-right mt-6">
        <button
          onClick={() => setShowSettings(true)}
          className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded text-sm text-white border border-zinc-600"
        >
          ✏️ Edit My Signature
        </button>
      </div>

      {/* ⚙️ Modal Overlay */}
      {showSettings && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative w-full max-w-2xl bg-zinc-900 rounded-xl shadow-xl border border-zinc-700 p-6">
            <button
              onClick={() => setShowSettings(false)}
              className="absolute top-3 right-3 text-zinc-400 hover:text-white text-lg"
              title="Close"
            >
              ✕
            </button>
            <UserSettingsPanel />
          </div>
        </div>
      )}

      {/* Liora's Whisper (Personalized Daily Insight) */}
      <LiorasWhisper />

      {/* Navigation Links */}
      <div className="mt-6">
        <Link to="/profile" className="text-blue-500 hover:underline">
          Go to Your Profile
        </Link>
        <br />
        <Link to="/codex-library" className="text-blue-500 hover:underline">
          Explore Codex Library
        </Link>
      </div>
    </div>
  );
}
