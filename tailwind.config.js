/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Optional Codex palette extensions
        codexLight: "#fcd34d",
        codexNeutral: "#64748b",
        codexDark: "#1e1b4b",
      },
      keyframes: {
        breathPulse: {
          '0%, 100%': {
            transform: 'scale(0.95)',
            opacity: '0.6',
          },
          '50%': {
            transform: 'scale(1.1)',
            opacity: '1',
          },
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },
      animation: {
        fadeIn: 'fadeIn 1.5s ease-in-out forwards',
        fadeInSlow: 'fadeIn 3s ease-in-out forwards',
        breathPulse: 'breathPulse 4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
