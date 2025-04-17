import { useUserSync } from "@/context/UserSyncContext";
import { NavLink, Outlet } from "react-router-dom";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Menu, X } from "lucide-react";

const navLinks = [
  { path: "/home", label: "Home" },
  { path: "/journal", label: "Journal" },
  { path: "/rituals", label: "Rituals" },
  { path: "/companion", label: "Companion" },
  { path: "/settings", label: "Settings" },
];

export default function MainLayout() {
  const { loading, user, profile } = useUserSync();
  const [menuOpen, setMenuOpen] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Syncing your Codex signature...
      </div>
    );
  }

  const firstName = profile?.first_name || "Seeker";
  const archetype = profile?.archetype || "Wanderer";

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-900 to-black text-white font-inter">
      {/* Navigation */}
      <nav className="bg-black/80 border-b border-indigo-700/30 px-4 py-4 flex items-center justify-between backdrop-blur-md shadow-md relative z-10">
        <div className="text-xl font-bold tracking-wide text-indigo-400">
          ✦ Codex Lumina
        </div>

        {/* Desktop Nav */}
        <div className="hidden sm:flex gap-4">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                isActive
                  ? "text-white bg-indigo-600 px-3 py-1 rounded"
                  : "text-white/70 hover:text-white transition-all duration-150"
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* Mobile Menu Icon */}
        <div className="sm:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-white">
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* User & Logout */}
        <div className="hidden sm:flex items-center gap-4 text-sm text-white/70">
          <span className="hidden sm:inline">Welcome,</span>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-indigo-300">{firstName}</span>
            <span className="italic text-indigo-400">— {archetype}</span>
            <img
              src="/assets/glyphs/codex-sigil.svg"
              alt="Codex Glyph"
              className="w-5 h-5 animate-pulse-slow opacity-80"
            />
          </div>
          <button
            onClick={async () => {
              await supabase.auth.signOut();
              sessionStorage.clear();
              localStorage.clear();
              window.location.href = "/portal";
            }}
            className="text-red-400 hover:text-red-200 underline text-xs transition"
          >
            Log Out
          </button>
        </div>
      </nav>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="sm:hidden absolute top-16 left-0 w-full bg-black border-t border-indigo-800 shadow-lg z-20">
          <div className="flex flex-col px-4 py-4 space-y-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  isActive
                    ? "text-white bg-indigo-600 px-3 py-2 rounded"
                    : "text-white/70 hover:text-white px-3 py-2 rounded"
                }
              >
                {link.label}
              </NavLink>
            ))}
            <hr className="border-zinc-700 my-2" />
            <button
              onClick={async () => {
                await supabase.auth.signOut();
                sessionStorage.clear();
                localStorage.clear();
                window.location.href = "/portal";
              }}
              className="text-red-400 hover:text-red-300 text-sm text-left"
            >
              Log Out
            </button>
          </div>
        </div>
      )}

      {/* Page Content */}
      <main className="p-6">
        <Outlet />
      </main>
    </div>
  );
}