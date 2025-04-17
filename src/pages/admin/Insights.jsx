import KeyLogsDashboard from "@/pages/dev/KeyLogsDashboard";

export default function AdminInsights() {
  return (
    <div className="bg-black text-white min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-6">🕯️ Flamekeeper Insights</h1>
      <KeyLogsDashboard />
    </div>
  );
}
