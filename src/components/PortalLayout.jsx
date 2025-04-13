import React from "react";

export default function PortalLayout({ title, subtitle, children }) {
  return (
    <div className="min-h-screen bg-black text-white font-cinzel flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-6 relative z-10">
        {/* 🔮 Title */}
        <h1 className="text-3xl sm:text-4xl font-bold text-indigo-400">
          {title}
        </h1>

        {/* 🌀 Subtitle */}
        {subtitle && (
          <p className="text-sm text-zinc-400 italic">{subtitle}</p>
        )}

        {/* 🔓 Portal Body */}
        <div className="mt-6 space-y-4">{children}</div>
      </div>

      {/* ✨ Optional Sigil or Glow Background */}
      <div className="absolute inset-0 bg-gradient-to-tr from-black via-indigo-950 to-black opacity-80 pointer-events-none z-0" />
    </div>
  );
}
