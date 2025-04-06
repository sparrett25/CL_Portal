// components/LioraAvatar.jsx
export default function LioraAvatar({ toneEcho, signatureProfile }) {
  const getLioraResponse = () => {
    if (!signatureProfile) return "Liora is here to guide you...";

    // Example dynamic response based on the signature profile
    if (signatureProfile.energy === "Light") {
      return "Your energy is radiant today. Continue to embrace your vision.";
    } else if (signatureProfile.energy === "Dark") {
      return "You are in a time of reflection. Seek stillness within.";
    } else if (signatureProfile.energy === "Neutral") {
      return "Balance is key. Stay grounded and trust your journey.";
    }

    // Default response
    return "You are on the right path. Keep moving forward.";
  };

  return (
    <div className="relative z-30 flex flex-col items-center mx-auto my-4">
      {/* Avatar container with gradient background and visual enhancements */}
      <div className="w-24 sm:w-32 md:w-36 h-32 sm:h-40 md:h-48 max-h-[200px] rounded-lg shadow-xl bg-gradient-to-tr from-indigo-700 via-purple-500 to-indigo-700 overflow-hidden relative">
        
        {/* Left gradient effect */}
        <div className="absolute left-0 top-0 w-1/2 h-full bg-gradient-to-tl from-indigo-400 via-purple-500 to-indigo-700 opacity-50 animate-glow"></div>

        {/* Right gradient effect */}
        <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-tr from-indigo-400 via-purple-500 to-indigo-700 opacity-50 animate-glow"></div>

        {/* Liora Avatar Image */}
        <img
          src="/avatar-liora.png"
          alt="Liora Avatar"
          className="w-full h-full object-cover object-top rounded-lg opacity-90"
        />
      </div>

     
      {/* Dynamic response text */}
      <p className="text-s mt-2 text-indigo-300 italic text-center max-w-[9rem] animate-fade-in">
        {toneEcho || getLioraResponse()}
      </p>
    </div>
  );
}
