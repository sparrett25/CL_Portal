import { useEffect, useState } from "react";
import { useUserSync } from "@/context/UserSyncContext";
import { useAllDevFlags } from "@/context/DevFlagContext";
import PageFrame from "@/components/layout/PageFrame";

export default function DevTestPage() {
  const devFlags = useAllDevFlags();
  const { user } = useUserSync();
  const [codexReflection, setCodexReflection] = useState(null);

  useEffect(() => {
    const stored = sessionStorage.getItem("codexReflection");
    if (stored) setCodexReflection(JSON.parse(stored));
  }, []);

  return (
    <PageFrame
      title="🧪 Dev Test Panel"
      subtitle="This sacred view shows all live dev flags, user state, and reflection memory."
    >
      <section className="space-y-6">
        {/* Dev Flags */}
        <div className="bg-zinc-900 border border-indigo-600 rounded-xl p-4">
          <h3 className="text-indigo-400 text-lg font-bold mb-2">Dev Flags</h3>
          <pre className="text-xs text-indigo-300 whitespace-pre-wrap">
            {JSON.stringify(devFlags, null, 2)}
          </pre>
        </div>

        {/* User Profile */}
        <div className="bg-zinc-900 border border-green-600 rounded-xl p-4">
          <h3 className="text-green-400 text-lg font-bold mb-2">User Profile</h3>
          <pre className="text-xs text-green-300 whitespace-pre-wrap">
            {JSON.stringify(user, null, 2)}
          </pre>
        </div>

        {/* Codex Reflection */}
        <div className="bg-zinc-900 border border-purple-600 rounded-xl p-4">
          <h3 className="text-purple-400 text-lg font-bold mb-2">Codex Reflection (Session)</h3>
          <pre className="text-xs text-purple-300 whitespace-pre-wrap">
            {JSON.stringify(codexReflection, null, 2)}
          </pre>
        </div>
      </section>
    </PageFrame>
  );
}
