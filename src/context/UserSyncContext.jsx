import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useNavigate } from 'react-router-dom';

const UserSyncContext = createContext();

export function UserSyncProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const [codexKey, setCodexKey] = useState(null);
  const [codexReflection, setCodexReflection] = useState(null); // 🆕 Added for dev-test and whisper

  const navigate = useNavigate();

  // 🔁 Extracted refetch logic
  const refetchProfile = async () => {
    const { data: sessionData } = await supabase.auth.getSession();
    const currentUser = sessionData?.session?.user;

    if (!currentUser) {
      setUser(null);
      setProfile(null);
      setLoading(false);
      return;
    }

    setUser(currentUser);

    const { data: profileData, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', currentUser.id)
      .single();

    if (error) {
      console.error('🔥 Profile fetch failed:', error.message);
      setProfile(null);
    } else {
      setProfile(profileData || null);
    }

    setLoading(false);
  };

  useEffect(() => {
    refetchProfile();

    // 🧠 Load codexReflection from session storage (for tone testing)
    const stored = sessionStorage.getItem('codexReflection');
    if (stored) {
      try {
        setCodexReflection(JSON.parse(stored));
      } catch (e) {
        console.warn('⚠️ Failed to parse codexReflection from session');
      }
    }
  }, []);

  useEffect(() => {
    if (!loading && user && profile === null) {
      console.warn('⚠️ Authenticated user has no profile — resetting session.');
      supabase.auth.signOut();
      sessionStorage.clear();
      localStorage.clear();
      window.location.href = '/portal';
    }
  }, [user, profile, loading]);

  const value = {
    user,
    profile,
    loading,
    codexKey,
    setCodexKey,
    codexReflection, // 🧠 now available everywhere
    refetchProfile,
  };

  console.log('🧠 Rendering UserSyncContext.Provider', value);

  return (
    <UserSyncContext.Provider value={value}>
      {children}
    </UserSyncContext.Provider>
  );
}

export function useUserSync() {
  return useContext(UserSyncContext);
}
