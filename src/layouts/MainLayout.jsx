import React, { useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useDevFlag } from "@/context/DevFlagContext"; // ✅ Add this

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
  const simulateProd = useDevFlag("simulateProd"); // ✅ Check flag

  const toggleMenu = () => setMobileOpen((prev) => !prev);

  const allLinks = simulateProd
    ? navLinks
    : [...navLinks, { path: "/dev-test", label: "Dev Test" }]; // ✅ Inject Dev link if allowed

  return (
    <div className="min-h-screen bg-black text-white font-inter">
      {/* Navigation */}
      <nav className="bg-zinc-950 px-4 sm:px-6 py-4 shadow-md flex items-center justify-between">
        {/* Logo + Brand */}
        <div className="flex items-center gap-2 text-indigo-400 font-bold text-xl tracking-wide">
          <div
            className="w-9 h-9 flex items-center justify-center rounded-xl transition-all"
            style={{
              background: "radial-gradient(circle at center, rgba(139,92,246,0.15), transparent 80%)",
              boxShadow: "0 0 16px rgba(139,92,246,0.6)",
              animation: "pulse 3s ease-in-out infinite",
              padding: "4px"
            }}
          >
            <img
              src="/logo-sigil-transparent.png"
              alt="Codex Sigil"
              className="w-full h-full object-contain"
              style={{ borderRadius: "0.5rem" }}
            />
          </div>
          Codex Lumina
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-6 text-sm">
          {allLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `hover:text-white ${
                  isActive
                    ? "text-white underline underline-offset-4"
                    : "text-indigo-300"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-indigo-300">
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Nav Dropdown */}
      {mobileOpen && (
        <div className="bg-zinc-900 border-t border-zinc-800 px-4 py-4 md:hidden">
          <div className="flex flex-col gap-3 text-sm">
            {allLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `hover:text-white ${
                    isActive ? "text-white underline" : "text-indigo-300"
                  }`
                }
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="px-4 sm:px-6 py-6">
        <Outlet />
      </main>
    </div>
  );
}
