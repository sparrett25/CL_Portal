import React, { useEffect, useState } from "react";

export default function VeilUnlock({ onComplete }) {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setFadeOut(true), 1000);  // Start fade
    const timer2 = setTimeout(() => onComplete?.(), 1800);    // Trigger redirect
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 
        bg-gradient-to-br from-indigo-800/70 via-black/90 to-indigo-600/60 
        backdrop-blur-sm transition-opacity duration-1000 pointer-events-none 
        ${fadeOut ? "opacity-0" : "opacity-100"}`}
    />
  );
}
