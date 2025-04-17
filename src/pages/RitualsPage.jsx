import React, { useState } from "react";
import PageFrame from "@/components/layout/PageFrame";
import RitualBookGrid from "@/components/rituals/RitualBookGrid";
import RitualModal from "@/components/rituals/RitualModal"; // ✅ Updated import

export default function RitualsPage() {
  const [activeRitual, setActiveRitual] = useState(null);

  return (
    <PageFrame
      title="🌀 Ritual Portal"
      subtitle="Enter sacred space. Begin your transformation."
    >
      <RitualBookGrid onSelect={(ritual) => setActiveRitual(ritual)} />

      {/* ✅ Replaced inline layout with RitualModal */}
      {activeRitual && (
        <RitualModal ritual={activeRitual} onClose={() => setActiveRitual(null)} />
      )}
    </PageFrame>
  );
}
