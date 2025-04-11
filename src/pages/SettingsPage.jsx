import React from "react";
import PageFrame from "@/components/layout/PageFrame";

export default function SettingsPage() {
  return (
    <PageFrame
      title="⚙️ Settings"
      subtitle="Adjust your alignment, preferences, and profile."
    >
      <div className="bg-zinc-900/60 border border-indigo-700 p-6 rounded-xl shadow-lg text-zinc-300 space-y-4 text-sm">
        <p>This page will allow you to:</p>
        <ul className="list-disc list-inside pl-2">
          <li>Update your name, avatar, and phase</li>
          <li>Retake the signature voice ritual</li>
          <li>Modify notification and sound preferences</li>
          <li>Access account and privacy options</li>
        </ul>

        <div className="text-indigo-400 italic mt-6">
          “When you refine the settings of your soul, the outer world follows.”
        </div>
      </div>
    </PageFrame>
  );
}
