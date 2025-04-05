// pages/HomePage.jsx

import { useUserSync } from "@/context/UserSyncContext";
import { useUserProfile } from "@/hooks/useUserProfile";

// Visual theme guide
import { backgroundGradient } from "@/utils/CodexUIThemeGuide.js";

// Module Components
import SignatureProfileHeader from "@/components/SignatureProfileHeader";
import DailyAlignmentSpotlight from "@/components/dashboard/DailyAlignmentSpotlight";
import CollectivePulseCard from "@/components/dashboard/CollectivePulseCard";
import LioraWhisperCard from "@/components/dashboard/LioraWhisperCard";
import DailyRitualCard from "@/components/dashboard/DailyRitualCard";
import CompanionPanel from "@/components/dashboard/CompanionPanel";
import JournalPreviewFeed from "@/components/JournalPreviewFeed";

export default function HomePage() {
  const { user, loading: authLoading } = useUserSync();
  const { profile, loading: profileLoading } = useUserProfile(user) || {};

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
      <div className="flex flex-col gap-6 max-w-5xl mx-auto">
        <SignatureProfileHeader profile={profile} />
        <DailyAlignmentSpotlight profile={profile} />
        <CollectivePulseCard />
        <LioraWhisperCard profile={profile} />
        <DailyRitualCard profile={profile} />
        <CompanionPanel profile={profile} />
        <JournalPreviewFeed profile={profile} />
      </div>
    </div>
  );
}
