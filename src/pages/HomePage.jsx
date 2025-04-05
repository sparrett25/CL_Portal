// pages/HomePage.jsx

import { useEffect, useState } from "react";
import { useUserSync } from "@/context/UserSyncContext";
import { useUserProfile } from "@/hooks/useUserProfile";
import { backgroundGradient } from "@/utils/CodexUIThemeGuide.js";
import { calculatePhaseShiftReadiness } from "@/utils/phaseShiftEngine";
import {
  updatePhaseAndTimestamp,
  logPhaseShiftEvent,
} from "@/services/userService";
import { insertJournalEntry } from "@/services/journalService";
import Confetti from "react-confetti";
import { useWindowSize } from "@uidotdev/usehooks";

// Components
import SignatureProfileHeader from "@/components/SignatureProfileHeader";
import DailyAlignmentSpotlight from "@/components/dashboard/DailyAlignmentSpotlight";
import CollectivePulseCard from "@/components/dashboard/CollectivePulseCard";
import LioraWhisperCard from "@/components/dashboard/LioraWhisperCard";
import DailyRitualCard from "@/components/dashboard/DailyRitualCard";
import CompanionPanel from "@/components/dashboard/CompanionPanel";
import JournalPreviewFeed from "@/components/JournalPreviewFeed";
import PhaseShiftRitual from "@/components/rituals/PhaseShiftRitual";
import EvolutionMap from "@/components/dashboard/EvolutionMap";

export default function HomePage() {
  const { user, loading: authLoading } = useUserSync();
  const { profile, loading: profileLoading } = useUserProfile(user) || {};
  const [readinessScore, setReadinessScore] = useState(null);
  const [showRitual, setShowRitual] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [showJournalPrompt, setShowJournalPrompt] = useState(false);
  const [reflectionText, setReflectionText] = useState("");
  const [highlightReflections, setHighlightReflections] = useState(false); // Added state for link highlight
  const { width, height } = useWindowSize();

  const getNextPhase = (current) => {
    const order = [
      "Seeking & Struggle",
      "Emerging Awareness",
      "Shadow Work",
      "Integration",
      "Alignment",
      "Embodiment",
    ];
    const i = order.indexOf(current);
    return i >= 0 && i < order.length - 1 ? order[i + 1] : current;
  };

  const refreshUserProfile = async () => {
    const nextPhase = getNextPhase(profile.phase);
    await updatePhaseAndTimestamp(user.id, nextPhase);
    await logPhaseShiftEvent(user.id, profile.phase, nextPhase);
  };

  useEffect(() => {
    if (user && profile) {
      calculatePhaseShiftReadiness(user.id, profile).then(setReadinessScore);
    }
  }, [user, profile]);

  // Trigger highlight for Reflections link
  useEffect(() => {
    if (highlightReflections) {
      const timer = setTimeout(() => setHighlightReflections(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [highlightReflections]);

  if (authLoading || profileLoading) {
    return (
      <div className="p-6 text-center text-lg text-white">
        Preparing your Codex...
      </div>
    );
  }

  if (!user || !profile) {
    return (
      <div className="p-6 text-center text-red-300">
        You must be signed in to access your Codex.
      </div>
    );
  }

  return (
    <div className={`${backgroundGradient} min-h-screen px-4 py-8`}>
      {showCelebration && (
        <Confetti width={width} height={height} numberOfPieces={150} recycle={false} />
      )}

      <div className="flex flex-col gap-6 max-w-5xl mx-auto">
        <SignatureProfileHeader profile={profile} />
        <DailyAlignmentSpotlight profile={profile} />
        <CollectivePulseCard />
        <LioraWhisperCard profile={profile} />
        <DailyRitualCard profile={profile} />
        <CompanionPanel profile={profile} />
        <JournalPreviewFeed profile={profile} />

        {/* 🔗 Shortcut to Archive */}
        <div className="text-right">
          <a
            href="/reflections"
            className={`text-sm transition ${
              highlightReflections
                ? "text-indigo-300 underline animate-pulse"
                : "text-indigo-400 hover:underline"
            }`}
          >
            View All Reflections →
          </a>
        </div>

        <EvolutionMap userId={user.id} />

        {readinessScore !== null && (
          <div className="text-center text-sm text-indigo-300 mt-2">
            🔍 Phase Readiness Score:{" "}
            <span className="font-bold">{readinessScore}</span>/100
            <div className="text-xs text-zinc-400 mt-1">
              (Based on journal tone, rituals, and time since last shift)
            </div>

            {readinessScore >= 75 && (
              <button
                className="mt-4 px-4 py-2 bg-indigo-700 hover:bg-indigo-800 text-white rounded-md transition"
                onClick={() => setShowRitual(true)}
              >
                🌒 Begin Transition Ritual
              </button>
            )}
          </div>
        )}

        {showRitual && (
          <PhaseShiftRitual
            profile={profile}
            onComplete={async () => {
              await refreshUserProfile();
              setShowRitual(false);
              setShowCelebration(true);

              setTimeout(() => {
                const whisper = new Audio("/sounds/liora-whisper.mp3");
                whisper.play();
                setShowCelebration(false);
                setShowJournalPrompt(true);
                setHighlightReflections(true); // Trigger highlight after phase shift
              }, 4000);
            }}
          />
        )}

        {showJournalPrompt && (
          <div className="bg-zinc-950 border border-indigo-600 p-5 mt-6 rounded-xl text-white shadow-xl">
            <h3 className="text-sm uppercase text-indigo-400 mb-2 tracking-widest">
              📝 A Message from Liora
            </h3>
            <p className="text-sm italic text-indigo-200 mb-4">
              “As one chapter ends and another begins, what truth wishes to be spoken now?”
            </p>
            <textarea
              rows={5}
              placeholder="Begin your reflection here..."
              value={reflectionText}
              onChange={(e) => setReflectionText(e.target.value)}
              className="w-full p-3 bg-zinc-900 text-white rounded-md border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              className="mt-4 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-md text-white"
              onClick={async () => {
                await insertJournalEntry(user.id, reflectionText, "phase-shift");
                setReflectionText("");
                setShowJournalPrompt(false);
                setHighlightReflections(true); // Trigger highlight after journal save
              }}
            >
              Save Reflection
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
