import { useEffect } from "react";
import { runDevSeeder } from "@/scripts/devSeeder";

export default function DevSeederPage() {
  useEffect(() => {
    runDevSeeder();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold mb-4">🌱 DevSeeder Running...</h1>
      <p>
        The test user, profile, Codex Keys, and journal entry are being created.
      </p>
      <ul className="list-disc ml-6 mt-4">
        <li><code>INITIATE-888</code> — valid key</li>
        <li><code>USED-KEY-123</code> — already used</li>
        <li><code>EXPIRED-KEY-999</code> — inactive</li>
      </ul>
    </div>
  );
}
