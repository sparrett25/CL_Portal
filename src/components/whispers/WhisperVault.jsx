
import React, { useState } from "react";
import WhisperCard from "./WhisperCard";

export default function WhisperVault({ whispers }) {
  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-bold text-white">🔓 Whisper Vault</h2>
      {whispers.map((whisper) => (
        <WhisperCard key={whisper.id} whisper={whisper} />
      ))}
    </div>
  );
}
