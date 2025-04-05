import { useUserSync } from "@/context/UserSyncContext";  // Correct import

export default function CodexLibrary() {
  const { user } = useUserSync();  // Get user from context

  if (!user) {
    return <div>You need to log in to access the library</div>;
  }

  return (
    <div>
      <h1>Codex Library</h1>
      {/* Your CodexLibrary content */}
    </div>
  );
}
