import React, { useState, useRef } from "react";
import { Volume2, VolumeX } from "lucide-react";

export default function AmbientAudioToggle() {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef(null);

  const toggleAudio = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (playing) {
      audio.pause();
    } else {
      audio.play();
    }
    setPlaying(!playing);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <audio ref={audioRef} loop>
        <source src="/assets/audio/ambient.mp3" type="audio/mpeg" />
      </audio>
      <button
        onClick={toggleAudio}
        className="p-3 bg-zinc-800/80 hover:bg-zinc-700 text-white rounded-full shadow-lg transition"
        title="Toggle Ambient Sound"
      >
        {playing ? <Volume2 size={20} /> : <VolumeX size={20} />}
      </button>
    </div>
  );
}
