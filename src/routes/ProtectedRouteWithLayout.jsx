import ProtectedRoute from "./ProtectedRoute";
import MainLayout from "@/layouts/MainLayout";

export default function ProtectedRouteWithLayout({ children }) {
  return (
    <ProtectedRoute>
      <MainLayout>{children}</MainLayout>
    </ProtectedRoute>
  );
}
