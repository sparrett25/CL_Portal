import React from "react";
import CodexGlyphGlow from "@/components/CodexGlyphGlow";

/**
 * PortalLayout - Sacred wrapper for Codex key-based onboarding flows
 * Props:
 * - title: Optional heading (string)
 * - subtitle: Optional subtext (string)
 * - showGlyph: Boolean to toggle glyph (default true)
 * - children: Rendered content
 */
export default function PortalLayout({
  title = "Enter the Codex",
  subtitle = "This gateway is sealed by intention.",
  showGlyph = true,
  children,
}) {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4 relative">
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-900/80 via-black/90 to-indigo-900/80 z-0" />
      <div className="relative z-10 max-w-md w-full p-6 md:p-8 border border-indigo-500 rounded-2xl bg-zinc-900/80 backdrop-blur-sm shadow-2xl text-center">

        {showGlyph && (
          <div className="flex justify-center mb-4">
            <CodexGlyphGlow size="md" />
          </div>
        )}

        <h1 className="text-2xl font-serif mb-2 text-indigo-300">{title}</h1>
        {subtitle && <p className="text-sm text-zinc-400 mb-6">{subtitle}</p>}

        {children}
      </div>
    </div>
  );
}
