import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';

function SignupPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(null);
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) {
      setError(error.message);
    } else {
      navigate('/onboarding');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Join the Codex</h1>
        <form onSubmit={handleSignup} style={styles.form}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />
          <button type="submit" style={styles.button}>Begin</button>
          {error && <p style={styles.error}>{error}</p>}
        </form>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    background: 'radial-gradient(circle, #0a0a1a 0%, #000010 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem',
  },
  card: {
    backgroundColor: 'rgba(20, 20, 40, 0.85)',
    padding: '3rem',
    borderRadius: '1.5rem',
    maxWidth: '400px',
    width: '100%',
    boxShadow: '0 0 25px #5f4dee',
    textAlign: 'center',
  },
  title: {
    fontSize: '2rem',
    marginBottom: '2rem',
    color: '#fff',
    fontFamily: `'Cinzel', serif`,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  input: {
    padding: '0.75rem',
    borderRadius: '8px',
    border: 'none',
    fontSize: '1rem',
  },
  button: {
    padding: '0.75rem',
    borderRadius: '8px',
    background: '#7b5de3',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  error: {
    marginTop: '1rem',
    color: '#ff6a6a',
    fontSize: '0.9rem',
  },
};

export default SignupPage;
