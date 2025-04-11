import { useState, useRef } from "react";

export default function VoiceCapture() {
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState(null);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        chunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        const url = URL.createObjectURL(blob);
        setAudioURL(url);
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (err) {
      alert("Microphone access is needed for the ritual.");
    }
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setIsRecording(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-white px-6 text-center">
      <div className="animate-fade-in max-w-xl space-y-6">
        <h2 className="text-2xl font-bold">Voice Ritual</h2>
        <p className="opacity-70">
          Speak this phrase aloud, with breath and intention. This is your signature moment.
        </p>
        <blockquote className="text-indigo-300 italic text-lg font-medium py-4 px-6 bg-zinc-900 rounded-xl border border-indigo-500 shadow-inner">
          “I am the breath between stars, the light within shadow,  
          the spark of what is becoming. I awaken now. I am ready.”
        </blockquote>

        {audioURL ? (
          <div className="space-y-3">
            <audio controls src={audioURL} className="w-full" />
            <button
              onClick={startRecording}
              className="bg-indigo-600 hover:bg-indigo-700 px-5 py-2 rounded-full text-white text-sm"
            >
              Record Again
            </button>
          </div>
        ) : (
          <button
            onClick={isRecording ? stopRecording : startRecording}
            className={`px-6 py-3 rounded-full text-white font-semibold transition-all ${
              isRecording
                ? "bg-red-600 hover:bg-red-700"
                : "bg-purple-600 hover:bg-purple-700"
            }`}
          >
            {isRecording ? "Stop Recording" : "Begin Recording"}
          </button>
        )}
      </div>
    </div>
  );
}
