import React from "react";
import Lottie from "lottie-react";
import lightSigil from "@/assets/lottie/sigil_light.json";
import darkSigil from "@/assets/lottie/sigil_dark.json";
import neutralSigil from "@/assets/lottie/sigil_neutral.json";

export default function LottieSigilAnimation({ energy = "Neutral" }) {
  const getSigil = () => {
    switch (energy) {
      case "Light":
        return lightSigil;
      case "Dark":
        return darkSigil;
      case "Neutral":
      default:
        return neutralSigil;
    }
  };

  const getGlow = () => {
    switch (energy) {
      case "Light":
        return "shadow-yellow-400";
      case "Dark":
        return "shadow-purple-700";
      case "Neutral":
      default:
        return "shadow-sky-500";
    }
  };

  return (
    <div className={`w-48 h-48 mx-auto rounded-full bg-black p-4 ${getGlow()} shadow-2xl`}>
      <Lottie animationData={getSigil()} loop autoplay />
    </div>
  );
}
