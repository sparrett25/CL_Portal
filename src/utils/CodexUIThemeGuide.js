// src/utils/CodexUIThemeGuide.js
// ✨ Codex Lumina Visual Language & Aura Map

export const auraGlow = {
  default: "hover:shadow-[0_0_12px_#a855f7]/40 transition-shadow duration-300",
  light: "hover:shadow-[0_0_12px_#fde68a]/40",
  neutral: "hover:shadow-[0_0_12px_#5eead4]/40",
  dark: "hover:shadow-[0_0_12px_#8b5cf6]/40",
};

export const backgroundGradient = "bg-gradient-to-b from-black via-zinc-900 to-black";

export const fadeIn = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
};

export const energyColors = {
  Light: "text-yellow-300",
  Neutral: "text-teal-300",
  Dark: "text-purple-400",
};

export const borderColors = {
  Light: "border-yellow-300",
  Neutral: "border-teal-300",
  Dark: "border-purple-400",
};

export const toneColors = {
  calm: "text-sky-300",
  focused: "text-emerald-300",
  uncertain: "text-zinc-400",
  intense: "text-rose-400",
};

export const sigilMap = {
  Seeker: "/glyphs/seeker.svg",
  Visionary: "/glyphs/visionary.svg",
  Guardian: "/glyphs/guardian.svg",
  Alchemist: "/glyphs/alchemist.svg",
  Oracle: "/glyphs/oracle.svg",
  Mystic: "/glyphs/mystic.svg",
  Rebel: "/glyphs/rebel.svg",
  Weaver: "/glyphs/weaver.svg",
  Sage: "/glyphs/sage.svg",
  Healer: "/glyphs/healer.svg",
  Warrior: "/glyphs/warrior.svg",
  Architect: "/glyphs/architect.svg",
};

export const phaseThemes = {
  "Phase 1": {
    overlay: "bg-gradient-to-br from-indigo-900/10 to-transparent",
    aura: auraGlow.neutral,
  },
  "Phase 2": {
    overlay: "bg-gradient-to-br from-emerald-800/10 to-transparent",
    aura: auraGlow.light,
  },
  "Phase 3": {
    overlay: "bg-gradient-to-br from-amber-900/10 to-transparent",
    aura: auraGlow.dark,
  },
  "Phase 4": {
    overlay: "bg-gradient-to-br from-cyan-800/10 to-transparent",
    aura: auraGlow.neutral,
  },
};
