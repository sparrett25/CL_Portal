import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CodexGlyphGlow from "@/components/glyphs/CodexGlyphGlow";
import PortalLayout from "@/layouts/PortalLayout";

export default function CreateAccountConfirmation() {
  const navigate = useNavigate();

  useEffect(() => {
    const delay = setTimeout(() => {
      navigate("/onboarding/welcome");
    }, 3800); // Adjust timing for sigil animation duration

    return () => clearTimeout(delay);
  }, [navigate]);

  return (
    <PortalLayout
      title="Account Created ✨"
      subtitle="The Codex welcomes you. Your flame is now lit."
    >
      <div className="flex flex-col items-center space-y-4 mt-6">
        {/* 🌀 Glowing Codex Sigil */}
        <CodexGlyphGlow size={120} />

        <p className="text-sm text-indigo-300 text-center max-w-md">
          You will now be guided into your Onboarding Ritual.
        </p>

        <p className="text-xs text-white/50 italic">
          Redirecting to your first step...
        </p>
      </div>
    </PortalLayout>
  );
}
