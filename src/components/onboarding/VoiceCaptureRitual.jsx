import React, { useState, useRef } from "react";
import { supabase } from "@/lib/supabase";
import { v4 as uuidv4 } from "uuid";

export default function VoiceCaptureRitual({ onComplete }) {
  const [recording, setRecording] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [audioURL, setAudioURL] = useState(null);
  const [audioBlob, setAudioBlob] = useState(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const audioChunks = useRef([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream, { mimeType: "audio/webm;codecs=opus" });
      setRecording(true);
      audioChunks.current = [];

      recorder.ondataavailable = (e) => {
        audioChunks.current.push(e.data);
      };

      recorder.onstop = () => {
        const blob = new Blob(audioChunks.current, { type: "audio/webm;codecs=opus" });

        if (!blob || blob.size === 0) {
          alert("Recording failed or unsupported format. Please try again.");
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
    } catch (err) {
      console.error("Microphone access error:", err);
      alert("Microphone access is required for this step.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
    }
  };

  const resetRecording = () => {
    setAudioURL(null);
    setAudioBlob(null);
    setRecording(false);
    setUploading(false);
    setMediaRecorder(null);
    audioChunks.current = [];
    setErrorMsg(null);
  };

  const handleAccept = async () => {
    if (!audioBlob) {
      alert("No valid recording found.");
      return;
    }

    try {
      setUploading(true);
      const filename = `voice-${uuidv4()}.webm`;

      const { data, error: uploadError } = await supabase.storage
        .from("voice-recordings") // or "voices"
        .upload(filename, audioBlob, {
          contentType: "audio/webm",
          upsert: false,
        });

      if (uploadError) {
        console.error("Upload failed:", uploadError);
        setErrorMsg(uploadError.message);
        return;
      }

      const { data: publicURLData } = supabase.storage
        .from("voice-recordings")
        .getPublicUrl(filename);

      const publicURL = publicURLData?.publicUrl;

      if (!publicURL) {
        throw new Error("Could not retrieve public URL.");
      }

      console.log("Upload complete:", publicURL);
      onComplete(audioBlob, publicURL);
    } catch (err) {
      console.error("Upload error:", err);
      setErrorMsg(err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto text-white space-y-6 bg-white/5 p-6 rounded-xl shadow-xl backdrop-blur-md">
      <h2 className="text-2xl font-semibold text-lime-300 text-center">
        🔊 Voice Imprint Ritual
      </h2>
      <p className="text-sm text-zinc-300 text-center italic">
        Speak this phrase aloud, with breath and intention. This is your signature moment.
      </p>
      <p className="text-center font-medium text-indigo-400 mt-2 border border-indigo-700 bg-indigo-900/30 rounded-xl px-4 py-3 shadow-inner">
        “I am the breath between stars, the light within shadow, the spark of what is becoming. I awaken now. I am ready.”
      </p>

      {!audioURL && (
        <div className="flex flex-col items-center gap-4">
          <button
            onClick={recording ? stopRecording : startRecording}
            className={`px-6 py-2 rounded-lg text-white transition ${
              recording ? "bg-red-600 hover:bg-red-700" : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {recording ? "Stop Recording" : "Start Recording"}
          </button>
          {recording && (
            <p className="text-sm text-zinc-400">Recording... Speak clearly and calmly.</p>
          )}
        </div>
      )}

      {/* ✅ Always display the playback + button block if audioURL is set */}
      {audioURL && (
        <div className="space-y-4 text-center">
          <audio controls src={audioURL} className="w-full" />

          {errorMsg && (
            <p className="text-sm text-red-400 mt-2">Upload error: {errorMsg}</p>
          )}

          <div className="flex justify-center gap-4 mt-4">
            <button
              onClick={resetRecording}
              className="bg-zinc-600 hover:bg-zinc-700 px-4 py-2 rounded-lg text-white"
            >
              Record Again
            </button>

            <button
              onClick={handleAccept}
              disabled={uploading || !audioBlob}
              className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg text-white disabled:opacity-50"
            >
              {uploading ? "Uploading..." : "Accept and Upload"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
