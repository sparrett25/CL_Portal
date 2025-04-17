import { Navigate } from "react-router-dom";
import { useUserSync } from "@/context/UserSyncContext";

export default function ProtectedFlamekeeperRoute({ children }) {
  const { user, profile, loading } = useUserSync();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl text-white bg-black">
        Loading your Codex...
      </div>
    );
  }

  if (!user || profile?.nickname !== "Flamekeeper") {
    return <Navigate to="/home" replace />;
  }

  return children;
}
