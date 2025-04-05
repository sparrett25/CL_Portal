import { useUserSync } from "@/context/UserSyncContext";  // Correct import

export default function UserProfile() {
  const { user } = useUserSync();  // Get user from context

  if (!user) {
    return <div>You need to log in to access this page</div>;
  }

  return (
    <div>
      <h1>User Profile</h1>
      {/* Your UserProfile content */}
    </div>
  );
}
