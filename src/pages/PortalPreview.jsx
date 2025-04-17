import React from "react";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import glyphAnimation from "@/assets/lottie/codex-glyph.json"; // 🔁 Replace with your own animation file

export default function PortalView() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-black text-white flex items-center justify-center overflow-hidden">
      {/* 🌫 Veil Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-indigo-900 to-black opacity-80 pointer-events-none z-0" />

      {/* 🌀 Animated Glyph */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[60%] w-64 h-64 z-10 opacity-90 drop-shadow-2xl animate-pulse-slow">
        <Lottie animationData={glyphAnimation} loop={true} />
      </div>

      {/* 🔓 Entry Options */}
      <div className="z-20 relative text-center space-y-6 max-w-md p-8 bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 shadow-lg">
        <h1 className="text-3xl font-bold text-indigo-300">Enter Codex Lumina</h1>
        <p className="text-sm text-zinc-400">
          Choose your path. All who seek, begin through the Gate.
        </p>

        <div className="space-y-4 pt-4">
          <button
            onClick={() => navigate("/key-entry")}
            className="w-full py-3 rounded-full bg-green-600 hover:bg-green-700 transition-all shadow-md"
          >
            🔑 Enter with a Codex Key
          </button>
          <button
            onClick={() => navigate("/sign-in")}
            className="w-full py-3 rounded-full bg-indigo-600 hover:bg-indigo-700 transition-all shadow-md"
          >
            🔐 Sign In
          </button>
          <button
            onClick={() => navigate("/create-account")}
            className="w-full py-3 rounded-full bg-purple-600 hover:bg-purple-700 transition-all shadow-md"
          >
            ✨ Create Account
          </button>
        </div>
      </div>
    </div>
  );
}
