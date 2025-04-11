import React from "react";
import { useUserSync } from "@/context/UserSyncContext";
import clsx from "clsx";

export default function PageFrame({ children, title, subtitle, fullBleed = false, raw = false }) {
  const { user } = useUserSync();
  const { phase, archetype, energy } = user || {};

  if (raw) return <>{children}</>;

  return (
    <div
      className={clsx(
        "min-h-screen w-full",
        "text-white",
        !fullBleed && "px-4 sm:px-6 py-8",
        "bg-gradient-to-br from-black via-zinc-900 to-black"
      )}
    >
      {!fullBleed && (
        <div className="max-w-5xl mx-auto">
          {title && (
            <h1 className="text-3xl font-bold text-indigo-200 mb-1 drop-shadow">
              {title}
            </h1>
          )}
          {subtitle && (
            <p className="text-sm italic text-purple-300 mb-6">{subtitle}</p>
          )}
        </div>
      )}
      <div className={clsx(!fullBleed && "max-w-5xl mx-auto")}>{children}</div>
    </div>
  );
}
