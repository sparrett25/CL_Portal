import React from "react";
import { Sparkles } from "lucide-react";

export default function PortalLayout({ title, subtitle, children, showGlyph = true }) {
  return (
    <div className="dark min-h-screen bg-gradient-to-br from-black via-zinc-900 to-indigo-950 text-white font-inter flex flex-col items-center justify-center px-6 py-16 relative overflow-hidden">
      
      {/* 🌟 Background shimmer effect */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-500/10 via-purple-700/5 to-transparent blur-3xl opacity-25" />

      {showGlyph && (
        <div className="mb-6 animate-pulse">
          <Sparkles size={48} className="text-indigo-400" />
        </div>
      )}

      {title && <h1 className="text-3xl font-bold text-indigo-300 mb-2 text-center">{title}</h1>}
      {subtitle && <p className="text-zinc-400 max-w-xl text-center mb-6">{subtitle}</p>}

      <div className="w-full max-w-lg bg-black/40 border border-indigo-700 rounded-xl shadow-2xl p-6 backdrop-blur-md">
        {children}
      </div>
    </div>
  );
}
