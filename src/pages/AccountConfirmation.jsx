import React from "react";
import { useNavigate } from "react-router-dom";
import PortalLayout from "@/layouts/PortalLayout";
import CodexGlyphGlow from "@/components/CodexGlyphGlow";

export default function AccountConfirmation() {
  const navigate = useNavigate();

  return (
    <PortalLayout showGlyph={false}>
      <div className="flex flex-col items-center text-center">
        <CodexGlyphGlow size="lg" pulse className="mb-6" />

        <h1 className="text-2xl font-serif text-indigo-300 mb-2">
          Welcome, Seeker
        </h1>
        <p className="text-zinc-400 text-sm mb-6">
          You are now recognized by the Codex.<br />
          Prepare to receive your Signature Profile.
        </p>

        <button
          onClick={() => navigate("/onboarding/welcome")}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg transition-all"
        >
          Begin Your Onboarding
        </button>
      </div>
    </PortalLayout>
  );
}
