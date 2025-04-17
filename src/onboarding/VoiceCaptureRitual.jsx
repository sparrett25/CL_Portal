import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { useUserSync } from "@/context/UserSyncContext";

export default function VoiceCaptureRitual() {
  const [recording, setRecording] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [audioURL, setAudioURL] = useState(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const audioChunks = useRef([]);
  const navigate = useNavigate();
  const { user, refetchProfile } = useUserSync();

  const startRecording = async () => {
    try {
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
        handleUpload(blob);
      };

      recorder.start();
      setMediaRecorder(recorder);
    } catch (err) {
      console.error("🎤 Microphone access denied or error:", err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
    }
  };

  const resetRecording = () => {
    setAudioURL(null);
    setMediaRecorder(null);
    setRecording(false);
    audioChunks.current = [];
  };

  const handleUpload = async (blob) => {
    if (!user) return;
    setUploading(true);

    const filePath = `voices/${user.id}.webm`;
    const { data, error } = await supabase.storage
      .from("voice-recordings")
      .upload(filePath, blob, { upsert: true, contentType: "audio/webm" });

    if (error) {
      console.error("❌ Upload failed:", error.message);
      setUploading(false);
      return;
    }

    const { data: publicUrlData } = supabase.storage
      .from("voice-recordings")
      .getPublicUrl(filePath);

    const voiceUrl = publicUrlData?.publicUrl;

    const { error: updateError } = await supabase
      .from("profiles")
      .update({ voice_signature_url: voiceUrl })
      .eq("id", user.id);

    if (updateError) {
      console.error("❌ Profile update failed:", updateError.message);
      setUploading(false);
      return;
    }

    await refetchProfile();
    setUploading(false);
    navigate("/onboarding/profile-reveal");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center text-white bg-black px-6 py-12">
      <h1 className="text-3xl font-bold mb-4 text-indigo-300">🕊️ Voice Capture Ritual</h1>
      <p className="mb-6 max-w-xl text-sm text-white/80 leading-relaxed">
        Please speak the sacred phrase: <br />
        <em className="text-indigo-200">
          “I am the breath between stars, the light within shadow, the spark of what is becoming. I awaken now. I am ready.”
        </em>
      </p>

      {uploading && (
        <div className="text-indigo-400 animate-pulse">Uploading voice to the Codex...</div>
      )}

      {audioURL && !uploading ? (
        <div className="flex flex-col items-center space-y-4">
          <audio controls src={audioURL} className="w-64" />
          <button
            onClick={resetRecording}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl"
          >
            Retry
          </button>
        </div>
      ) : (
        !uploading && (
          <div className="flex flex-col items-center space-y-4">
            {!recording && (
              <button
                onClick={startRecording}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl"
              >
                Start Recording
              </button>
            )}
            {recording && (
              <button
                onClick={stopRecording}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl"
              >
                Stop & Save
              </button>
            )}
          </div>
        )
      )}
    </div>
  );
}
