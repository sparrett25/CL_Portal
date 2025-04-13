import React from "react";

const toneQuotes = {
  joy: "Let your light dance — it was made to be seen.",
  peace: "Still waters reveal the stars reflected.",
  fear: "Even shadows bow before the spark within you.",
  clarity: "The fog has lifted, and your steps are true.",
  grief: "Tears are sacred. They are how the soul softens.",
  awe: "You have touched the edge of the infinite.",
};

const phaseQuotes = {
  Awakening: "You have stirred from the veil — welcome to the living flame.",
  Transformation: "Old skins shed as your new self steps forward.",
  Integration: "Your journey is not behind you — it walks beside you.",
  Radiance: "You are not a reflection of light — you are its source.",
  Friction: "Pressure reveals the jewel you were always becoming.",
};

export default function ToneQuote({ tone = null, phase = null }) {
  const toneKey = tone?.toLowerCase();
  const phaseKey = phase?.toLowerCase();

  const quote =
    toneQuotes[toneKey] ||
    phaseQuotes[phase] ||
    "You are the echo and the origin — becoming yourself in every breath.";

  return (
    <p className="mt-4 italic text-indigo-300 text-sm max-w-md mx-auto text-center">
      🌀 {quote}
    </p>
  );
}
