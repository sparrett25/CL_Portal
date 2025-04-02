import React from 'react';

function OnboardingPage() {
  const handleContinue = () => {
    // Replace with routing or step progression logic
    console.log('Continue to next onboarding step');
  };

  return (
    <div style={styles.wrapper}>
      <h1 style={styles.title}>Welcome to Codex Lumina 🌟</h1>
      <p style={styles.subtitle}>
        You are about to begin your journey. This space is sacred. Breathe. Let us begin.
      </p>
      <button style={styles.button} onClick={handleContinue}>
        Begin Onboarding
      </button>
    </div>
  );
}

const styles = {
  wrapper: {
    padding: '4rem',
    textAlign: 'center',
    background: 'linear-gradient(to right, #121225, #1c1c3a)',
    color: '#fff',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  title: {
    fontSize: '2.5rem',
    marginBottom: '1rem',
  },
  subtitle: {
    fontSize: '1.25rem',
    marginBottom: '2rem',
    opacity: 0.9,
  },
  button: {
    padding: '0.75rem 1.5rem',
    fontSize: '1.1rem',
    border: 'none',
    borderRadius: '10px',
    backgroundColor: '#5f4dee',
    color: '#fff',
    cursor: 'pointer',
    transition: 'background 0.3s ease',
  },
};

export default OnboardingPage;
