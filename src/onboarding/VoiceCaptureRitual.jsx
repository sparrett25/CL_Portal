// src/onboarding/VoiceCaptureRitual.jsx

import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function VoiceCaptureRitual() {
  const [recording, setRecording] = useState(false);
  const [audioURL, setAudioURL] = useState(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const audioChunks = useRef([]);
  const navigate = useNavigate();

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const recorder = new MediaRecorder(stream);
    setRecording(true);
    audioChunks.current = [];

    recorder.ondataavailable = (e) => {
      audioChunks.current.push(e.data);
    };

    recorder.onstop = () => {
      const blob = new Blob(audioChunks.current, { type: "audio/webm" });
      const url = URL.createObjectURL(blob);
      setAudioURL(url);
      setRecording(false);
    };

    recorder.start();
    setMediaRecorder(recorder);
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
    }
  };

  const handleContinue = () => {
    navigate("/onboarding/reveal");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-indigo-950 to-black text-white flex flex-col items-center justify-center px-6 text-center animate-fade-in">
      <img
        src="/assets/glyphs/codex-sigil.svg"
        alt="Voice Sigil"
        className="w-20 h-20 mb-6 animate-pulse drop-shadow-xl opacity-80"
      />

      <h2 className="text-2xl font-semibold text-indigo-300 mb-2">Speak the Awakening Phrase</h2>
      <p className="text-sm text-gray-400 mb-6 max-w-xl">
        When you are ready, speak this sacred phrase aloud. It will become your energetic key:
      </p>

      <div className="bg-black/30 border border-indigo-600 text-indigo-100 rounded-xl px-6 py-4 mb-6 max-w-lg">
        <p className="italic text-lg">
          “I am the breath between stars, the light within shadow, the spark of what is becoming. I awaken now. I am ready.”
        </p>
      </div>

      {!recording && !audioURL && (
        <button
          onClick={startRecording}
          className="px-6 py-3 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold transition-all"
        >
          Begin Recording
        </button>
      )}

      {recording && (
        <button
          onClick={stopRecording}
          className="px-6 py-3 rounded-full bg-red-600 hover:bg-red-700 text-white font-bold transition-all"
        >
          Stop Recording
        </button>
      )}

      {audioURL && (
        <div className="mt-6 space-y-4">
          <audio controls src={audioURL} className="w-full max-w-md" />
          <button
            onClick={handleContinue}
            className="px-6 py-3 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold transition-all"
          >
            Continue
          </button>
        </div>
      )}
    </div>
  );
}
