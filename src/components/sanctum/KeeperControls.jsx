import React from "react";

export default function KeeperControls() {
  return (
    <div className="flex gap-2">
      <button className="px-3 py-1 bg-white/10 text-xs rounded hover:bg-white/20">
        Toggle Ambient
      </button>
      <button className="px-3 py-1 bg-white/10 text-xs rounded hover:bg-white/20">
        Lock Scrolls
      </button>
    </div>
  );
}
