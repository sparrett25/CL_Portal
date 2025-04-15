// src/layout/MainLayout.jsx

import React, { useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { useUserSync } from "@/context/UserSyncContext";
import { getDevFlag } from "@/dev/useDevFlags";

const navLinks = [
  { path: "/home", label: "Home" },
  { path: "/journal", label: "Journal" },
  { path: "/rituals", label: "Rituals" },
  { path: "/companion", label: "Companion" },
  { path: "/settings", label: "Settings" },
];

export default function MainLayout() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const { user, profile } = useUserSync();
  const simulateProd = getDevFlag("simulateProd");

  const toggleMenu = () => setMobileOpen((prev) => !prev);

  return (
    <div className="min-h-screen bg-black text-white font-inter">
      {/* Navigation */}
      <nav className="flex justify-between items-center p-4 border-b border-indigo-900">
        <div className="text-xl font-bold text-indigo-400">Codex Lumina</div>

        <div className="hidden md:flex gap-6">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                isActive
                  ? "text-indigo-300 font-semibold"
                  : "text-indigo-400 hover:text-indigo-200"
              }
            >
              {link.label}
            </NavLink>
          ))}

          {/* 🔧 Dev Console link for Flamekeeper */}
          {!simulateProd && profile?.role === "flamekeeper" && (
            <NavLink
              to="/dev-test"
              className={({ isActive }) =>
                isActive
                  ? "text-yellow-400 font-semibold"
                  : "text-yellow-300 hover:text-yellow-200"
              }
            >
              Dev Console
            </NavLink>
          )}
        </div>
      </nav>

      {/* Route content */}
      <main className="p-4">
        <Outlet />
      </main>
    </div>
  );
}
