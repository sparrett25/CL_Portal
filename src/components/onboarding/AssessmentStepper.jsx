import React, { useState } from "react";

const steps = [
  {
    key: "energy",
    prompt: "What energy feels most present in your life right now?",
    placeholder: "Light, Dark, or Neutral...",
  },
  {
    key: "tone",
    prompt: "If your emotional tone was one word, what would it be?",
    placeholder: "Centered, tense, open, soft...",
  },
  {
    key: "archetype",
    prompt: "What role or archetype feels most alive in you today?",
    placeholder: "Seer, Builder, Messenger...",
  },
  {
    key: "seeking",
    prompt: "What truth are you seeking to remember?",
    placeholder: "Write what stirs within you...",
  },
  {
    key: "breath",
    prompt: "Have you taken three deep breaths?",
    options: ["Yes", "No"],
  },
];

export default function AssessmentStepper({ onComplete }) {
  const [stepIndex, setStepIndex] = useState(0);
  const [responses, setResponses] = useState({});

  const current = steps[stepIndex];
  const isLast = stepIndex === steps.length - 1;

  const handleNext = () => {
    if (!current || !responses[current.key]) return;
    if (isLast) return onComplete(responses);
    setStepIndex((i) => i + 1);
  };

  const handleInput = (val) => {
    setResponses({ ...responses, [current.key]: val });
  };

  return (
    <div className="text-center space-y-6">
      <h2 className="text-xl font-semibold text-indigo-300">{current.prompt}</h2>

      {current.options ? (
        <div className="flex justify-center gap-4">
          {current.options.map((opt) => (
            <button
              key={opt}
              onClick={() => handleInput(opt)}
              className={`px-4 py-2 rounded-md border ${
                responses[current.key] === opt
                  ? "bg-indigo-600 text-white"
                  : "bg-zinc-800 text-indigo-200"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      ) : (
        <textarea
          rows={4}
          className="w-full max-w-xl mx-auto p-4 bg-zinc-900 text-white rounded-lg border border-indigo-600"
          placeholder={current.placeholder}
          value={responses[current.key] || ""}
          onChange={(e) => handleInput(e.target.value)}
        />
      )}

      <div className="flex justify-center gap-4 pt-6">
        {stepIndex > 0 && (
          <button
            onClick={() => setStepIndex((i) => i - 1)}
            className="px-4 py-2 rounded bg-zinc-700 text-indigo-200"
          >
            Back
          </button>
        )}
        <button
          onClick={handleNext}
          className="px-6 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700"
        >
          {isLast ? "Complete Reflection" : "Next"}
        </button>
      </div>
    </div>
  );
}
