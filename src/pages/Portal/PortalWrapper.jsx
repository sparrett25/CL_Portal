import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';  // Using the alias to import Supabase
import { useNavigate } from 'react-router-dom';

const PortalWrapper = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const session = supabase.auth.session();
    if (session) {
      setUser(session.user);
    } else {
      navigate('/login');  // Redirect to login if no session
    }
  }, [navigate]);

  return (
    <div>
      {user ? (
        <div>Welcome, {user.email}!</div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default PortalWrapper;
