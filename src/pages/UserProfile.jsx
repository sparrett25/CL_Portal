import { useUserSync } from "@/context/UserSyncContext";

export default function UserProfile() {
  const { userProfile, loading } = useUserSync();

  if (loading || !userProfile) {
    return <div className="text-center mt-20 text-white">Loading your profile...</div>;
  }

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-white">User Profile</h1>
      <div className="bg-zinc-800 p-4 rounded-lg">
        <h2 className="text-xl text-white">Name: {userProfile.name}</h2>
        <p className="text-white">Energy: {userProfile.energy}</p>
        <p className="text-white">Archetype: {userProfile.archetype}</p>
        <p className="text-white">Phase: {userProfile.phase}</p>
      </div>
    </div>
  );
}
