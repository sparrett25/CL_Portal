
import React from "react";
import LioraAvatarManager from "./LioraAvatarManager";

export default function LioraVisualShell({ tone }) {
  return (
    <div className="p-4 text-center">
      <LioraAvatarManager tone={tone} />
      <p className="mt-2 text-sm text-gray-300">Liora is with you.</p>
    </div>
  );
}
