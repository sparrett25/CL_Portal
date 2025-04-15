
import React from "react";
import { useDevFlags } from "./useDevFlags";
import { useUserSync } from "@/context/UserSyncContext";

export default function DevConsole() {
  const flags = useDevFlags();
  const { user } = useUserSync();

  return (
    <div className="p-4 bg-black text-white">
      <h2 className="text-xl font-bold">🛠️ Dev Console</h2>
      <pre className="mt-2">Flags: {JSON.stringify(flags, null, 2)}</pre>
      <pre className="mt-2">User: {JSON.stringify(user, null, 2)}</pre>
    </div>
  );
}
