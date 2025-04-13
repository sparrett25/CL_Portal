import React, { useState, useRef } from "react";

export default function VoiceCaptureRitual({ onComplete }) {
  const [recording, setRecording] = useState(false);
  const [audioURL, setAudioURL] = useState(null);
  const [audioBlob, setAudioBlob] = useState(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [micLevel, setMicLevel] = useState(0);

  const audioChunks = useRef([]);
  const rafRef = useRef(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const audioTracks = stream.getAudioTracks();
      if (!audioTracks.length) {
        alert("No audio input detected. Please check your microphone.");
        console.warn("No audio tracks found in stream:", stream);
        return;
      }

      console.log("🎙️ Audio track:", audioTracks[0].label);

      // ✅ Mic level visualization setup
      const audioContext = new AudioContext();
      const source = audioContext.createMediaStreamSource(stream);
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 256;
      const dataArray = new Uint8Array(analyser.frequencyBinCount);

      const updateMicLevel = () => {
        analyser.getByteFrequencyData(dataArray);
        const avg = dataArray.reduce((a, b) => a + b, 0) / dataArray.length;
        setMicLevel(avg);
        console.log("🔊 Mic level (debug):", avg);
        rafRef.current = requestAnimationFrame(updateMicLevel);
      };
      updateMicLevel();

      const recorder = new MediaRecorder(stream); // ← omit mimeType for broader compatibility
      audioChunks.current = [];

      recorder.ondataavailable = (e) => {
        audioChunks.current.push(e.data);
      };

      recorder.onstop = () => {
        cancelAnimationFrame(rafRef.current);
        audioContext.close();

        const blob = new Blob(audioChunks.current, { type: "audio/webm" });
        console.log("✅ Blob created:", blob, "Size:", blob.size);

        if (!blob || blob.size < 20000) {
          alert("Recording was silent or too short. Please try again.");
          setRecording(false);
          return;
        }

        const url = URL.createObjectURL(blob);
        setAudioBlob(blob);
        setAudioURL(url);
        setRecording(false);
      };

      recorder.start();
      setMediaRecorder(recorder);
      setRecording(true);
    } catch (err) {
      console.error("🎤 Microphone access error:", err);
      alert("Microphone access is required for this step.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && recording) {
      mediaRecorder.stop();
    }
  };

  const handleAccept = () => {
    if (audioBlob && typeof onComplete === "function") {
      const publicUrl = URL.createObjectURL(audioBlob);
      onComplete(audioBlob, publicUrl);
    } else {
      alert("No valid recording found.");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center space-y-6 p-6">
      <h2 className="text-xl font-bold text-indigo-300">🎙️ Voice Capture Ritual</h2>

      <p className="text-center text-indigo-300 italic max-w-lg mb-4 leading-relaxed">
        “I am the breath between stars,<br />
        the light within shadow,<br />
        the spark of what is becoming.”<br />
        <strong>I awaken now. I am ready.</strong>
      </p>

      {!audioURL && (
        <button
          onClick={recording ? stopRecording : startRecording}
          className={`px-6 py-2 rounded-full font-semibold transition-all text-white ${
            recording ? "bg-red-600 hover:bg-red-700" : "bg-purple-600 hover:bg-purple-700"
          }`}
        >
          {recording ? "Stop Recording" : "Start Recording"}
        </button>
      )}

      {/* 🎛️ Mic Level Bar */}
      {recording && (
        <div className="w-full max-w-md h-2 bg-zinc-700 rounded overflow-hidden">
          <div
            className="h-full bg-indigo-400 transition-all duration-75"
            style={{ width: `${Math.min(micLevel * 1.5, 100)}%` }}
          ></div>
        </div>
      )}

      {/* 🎧 Playback and Action Buttons */}
      {audioURL && (
        <div className="space-y-4 w-full max-w-md">
          <audio controls src={audioURL} className="w-full" />
          <div className="flex justify-center gap-4">
            <button
              onClick={startRecording}
              className="bg-purple-700 hover:bg-purple-800 text-white px-6 py-2 rounded-full"
            >
              Record Again
            </button>
            <button
              onClick={handleAccept}
              className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-2 rounded-full"
            >
              Accept and Continue
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
