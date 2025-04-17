import { Navigate } from "react-router-dom";
import { useUserSync } from "@/context/UserSyncContext";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useUserSync();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl text-white bg-black">
        Loading your Codex...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/portal" replace />;
  }

  return children;
}
