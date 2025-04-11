import React from "react";
import PageFrame from "@/components/layout/PageFrame";

export default function RitualsPage() {
  return (
    <PageFrame
      title="🌀 Ritual Portal"
      subtitle="Enter sacred space. Begin your transformation."
    >
      <div className="bg-zinc-900/60 border border-indigo-700/60 p-6 rounded-xl shadow-lg text-zinc-300 text-sm text-center">
        Rituals are being prepared... soon you will shape your own ceremonies of
        <span className="text-indigo-400"> light</span>, 
        <span className="text-purple-300"> shadow</span>, and 
        <span className="text-blue-300"> breath</span>.
      </div>
    </PageFrame>
  );
}
