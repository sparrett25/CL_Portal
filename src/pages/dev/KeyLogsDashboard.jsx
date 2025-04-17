import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase"; // ✅ Unified import path

export default function KeyLogsDashboard() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      const { data, error } = await supabase
        .from("key_logs")
        .select("*")
        .order("timestamp", { ascending: false });

      if (error) {
        console.error("❌ Failed to fetch key logs:", error.message);
      } else {
        setLogs(data);
      }

      setLoading(false);
    };

    fetchLogs();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-6 font-inter">
      <h1 className="text-3xl font-bold text-indigo-300 mb-6">
        🔑 Codex Key Activity Logs
      </h1>

      {loading ? (
        <div className="text-indigo-200">Loading sacred key logs...</div>
      ) : (
        <div className="overflow-x-auto bg-zinc-900 border border-indigo-700/20 rounded-xl shadow-xl">
          <table className="w-full table-auto text-sm">
            <thead className="bg-indigo-700/10 text-indigo-200 border-b border-indigo-600/20">
              <tr>
                <th className="p-3 text-left">Key</th>
                <th className="p-3 text-left">User</th>
                <th className="p-3 text-left">Action</th>
                <th className="p-3 text-left">Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => (
                <tr key={log.id} className="border-b border-zinc-800 hover:bg-zinc-800/50 transition">
                  <td className="p-3 text-indigo-300">{log.key}</td>
                  <td className="p-3 text-white/80">{log.user_id || "—"}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded-lg text-xs font-semibold ${
                        log.action === "claimed"
                          ? "bg-green-600/20 text-green-300"
                          : log.action === "revoked"
                          ? "bg-red-600/20 text-red-300"
                          : "bg-yellow-600/20 text-yellow-300"
                      }`}
                    >
                      {log.action}
                    </span>
                  </td>
                  <td className="p-3 text-sm text-zinc-400">
                    {new Date(log.timestamp).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
