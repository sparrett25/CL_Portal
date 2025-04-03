import React from 'react';
import { useNavigate } from 'react-router-dom';

function LandingPortal() {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <div style={styles.overlay}>
        <h1 style={styles.title}>Welcome to Codex Lumina</h1>
        <p style={styles.subtitle}>
          You are not lost. You are arriving. <br />
          Within you lives a memory of stars,<br />
          and this Codex is your map home.
        </p>
        <div style={styles.buttons}>
          <button style={styles.loginButton} onClick={() => navigate('/login')}>
            Enter
          </button>
          <button style={styles.signupButton} onClick={() => navigate('/signup')}>
            Begin Your Journey
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    background: 'radial-gradient(circle, #0a0a1a 0%, #000010 100%)',
    minHeight: '100vh',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundImage: `url('/starscape.svg')`, // Optional background art
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    padding: '2rem',
  },
  overlay: {
    backgroundColor: 'rgba(10, 10, 30, 0.8)',
    padding: '3rem',
    borderRadius: '1.5rem',
    maxWidth: '600px',
    textAlign: 'center',
    boxShadow: '0 0 20px #7b5de3',
  },
  title: {
    fontSize: '2.8rem',
    marginBottom: '1.5rem',
    fontFamily: `'Cinzel', serif`,
    letterSpacing: '1px',
  },
  subtitle: {
    fontSize: '1.25rem',
    lineHeight: '1.8',
    marginBottom: '2rem',
    fontStyle: 'italic',
    opacity: 0.85,
  },
  buttons: {
    display: 'flex',
    justifyContent: 'center',
    gap: '1.5rem',
  },
  loginButton: {
    padding: '0.75rem 1.5rem',
    fontSize: '1rem',
    borderRadius: '8px',
    background: '#ffffff22',
    color: '#fff',
    border: '1px solid #aaa',
    cursor: 'pointer',
  },
  signupButton: {
    padding: '0.75rem 1.5rem',
    fontSize: '1rem',
    borderRadius: '8px',
    background: '#7b5de3',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
  },
};

export default LandingPortal;
