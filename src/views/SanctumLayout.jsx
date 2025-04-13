import React from "react";
import { Outlet } from "react-router-dom";
import SanctumPillar from "@/components/sanctum/SanctumPillar";
import RitualFlamePortal from "@/components/sanctum/RitualFlamePortal";
import WhisperVault from "@/components/sanctum/WhisperVault";
import SanctumScrolls from "@/components/sanctum/SanctumScrolls";
import PhaseRingGlyph from "@/components/sanctum/PhaseRingGlyph";
import KeeperControls from "@/components/sanctum/KeeperControls";
import SanctumAmbientCanvas from "@/components/sanctum/SanctumAmbientCanvas";

export default function SanctumLayout() {
  return (
    <div className="relative min-h-screen bg-black text-white font-serif overflow-hidden">
      <SanctumAmbientCanvas />

      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
        <SanctumPillar />
        <RitualFlamePortal />
      </div>

      <div className="absolute inset-0 z-20 pointer-events-none">
        <div className="absolute top-10 left-10 pointer-events-auto">
          <WhisperVault />
        </div>
        <div className="absolute top-10 right-10 pointer-events-auto">
          <SanctumScrolls />
        </div>
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 pointer-events-auto">
          <PhaseRingGlyph />
        </div>
      </div>

      <div className="absolute bottom-4 right-4 z-30">
        <KeeperControls />
      </div>

      <Outlet />
    </div>
  );
}
