/* === Codex Lumina: Global Animations & Styling === */

@keyframes fade-in-up {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fade-in-up 1.2s ease-out forwards;
}

@keyframes sigil-glow {
  0%, 100% {
    box-shadow: 0 0 10px #8b5cf6;
  }
  50% {
    box-shadow: 0 0 20px #8b5cf6;
  }
}

.animate-sigil {
  animation: sigil-glow 2s ease-in-out infinite;
}

/* === Utility Fixes (Optional) === */

html,
body {
  margin: 0;
  padding: 0;
  font-family: 'Inter', system-ui, sans-serif;
  background-color: #000000;
  color: #ffffff;
}

::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.15);
  border-radius: 6px;
}
