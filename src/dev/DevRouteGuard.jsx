import { Navigate } from "react-router-dom";

export default function DevRouteGuard({ children }) {
  const isDev = import.meta.env.DEV || process.env.NODE_ENV === "development";

  if (!isDev) {
    return <Navigate to="/portal" />;
  }

  return children;
}
