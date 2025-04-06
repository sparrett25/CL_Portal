// pages/HomePage.jsx

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
import { motion } from "framer-motion";

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
  const navigate = useNavigate();
  const { user, loading: authLoading } = useUserSync();
  const { profile, loading: profileLoading } = useUserProfile(user) || {};
  const [readinessScore, setReadinessScore] = useState(null);
  const [showRitual, setShowRitual] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [showJournalPrompt, setShowJournalPrompt] = useState(false);
  const [reflectionText, setReflectionText] = useState("");
  const [highlightReflections, setHighlightReflections] = useState(false);
  const [ambientPlaying, setAmbientPlaying] = useState(false);
  const ambientRef = useState(new Audio("/sounds/ambient-celestial.mp3"))[0];
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

  useEffect(() => {
    if (highlightReflections) {
      const timer = setTimeout(() => setHighlightReflections(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [highlightReflections]);

  useEffect(() => {
    ambientRef.loop = true;
    ambientRef.volume = 0.3;
    ambientPlaying ? ambientRef.play() : ambientRef.pause();
  }, [ambientPlaying]);

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

  const glowColor = {
    light: "from-indigo-300 to-purple-500",
    neutral: "from-zinc-500 to-indigo-700",
    dark: "from-purple-900 to-black",
  }[profile.energy?.toLowerCase()] || "from-zinc-700 to-black";

  return (
    <div className={`min-h-screen px-4 py-8 relative overflow-hidden bg-gradient-to-br ${glowColor}`}>
      {/* 🌌 Animated Background Aura */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/5 via-indigo-900/20 to-black opacity-50 pointer-events-none z-0 animate-pulse-slow" />

      {/* 🜂 Floating Archetype Glyph */}
      {profile.archetype && (
        <img
          src={`/glyphs/${profile.archetype.toLowerCase()}.svg`}
          alt="Archetype Glyph"
          className="absolute top-10 right-10 w-24 h-24 opacity-10 animate-spin-slow z-0"
        />
      )}

      {/* 🎧 Ambient Sound Toggle */}
      <button
        onClick={() => setAmbientPlaying(!ambientPlaying)}
        className="absolute top-4 left-4 z-50 bg-white/10 hover:bg-white/20 text-white px-3 py-1 rounded-md text-xs"
      >
        {ambientPlaying ? "Pause Ambience" : "Play Ambience"}
      </button>

      {showCelebration && (
        <Confetti width={width} height={height} numberOfPieces={150} recycle={false} />
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col gap-8 max-w-5xl mx-auto z-10 bg-white/5 backdrop-blur-sm p-6 rounded-2xl shadow-2xl border border-indigo-400/20 ring-1 ring-indigo-400/10"
      >
        <h1 className="text-center text-2xl font-semibold text-white mb-4 animate-fade-in-up">
          🌟 Welcome back, {profile.nickname || "Luminary"}
        </h1>

        <SignatureProfileHeader profile={profile} />
        <DailyAlignmentSpotlight profile={profile} />
        <div className="my-6 w-full border-t border-indigo-500/20 opacity-60" />
        <CollectivePulseCard />
        <LioraWhisperCard profile={profile} />
        <DailyRitualCard profile={profile} />
        <CompanionPanel profile={profile} />
        <JournalPreviewFeed profile={profile} onOpenFullJournal={() => navigate("/journal")} />

        <EvolutionMap userId={user.id} />

        {readinessScore !== null && (
          <div className="text-center text-sm text-indigo-300 mt-2">
            🔍 Phase Readiness Score: <span className="font-bold">{readinessScore}</span>/100
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
                setHighlightReflections(true);
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
                setHighlightReflections(true);
              }}
            >
              Save Reflection
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}
