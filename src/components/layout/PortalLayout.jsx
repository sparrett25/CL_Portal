// src/components/layout/PortalLayout.jsx

import React from "react";

export default function PortalLayout({ children }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black via-indigo-900 to-black text-white">
      <div className="w-full max-w-md p-6 bg-black/60 rounded-2xl border border-indigo-500 shadow-xl">
        {children}
      </div>
    </div>
  );
}
