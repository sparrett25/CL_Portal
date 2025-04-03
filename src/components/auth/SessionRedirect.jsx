import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';

export default function SessionRedirect({ children }) {
  const [checking, setChecking] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();

      if (session) {
        navigate('/home');
      } else {
        setChecking(false); // allow children (LandingPortal) to render
      }
    };

    checkSession();
  }, [navigate]);

  if (checking) {
    return (
      <div style={styles.loading}>
        <p style={styles.text}>Aligning energies...</p>
      </div>
    );
  }

  return children;
}

const styles = {
  loading: {
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'radial-gradient(circle, #0a0a1a 0%, #000010 100%)',
  },
  text: {
    fontFamily: `'Cinzel', serif`,
    fontSize: '1.5rem',
    color: '#ffffffcc',
    animation: 'fadePulse 2s ease-in-out infinite',
  },
};
