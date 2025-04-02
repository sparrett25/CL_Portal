import React from 'react';

function HomePage() {
  return (
    <div style={styles.wrapper}>
      <h1 style={styles.heading}>Welcome to Codex Lumina ✨</h1>
      <p style={styles.text}>
        You’ve successfully logged in. This is your Home Page.
      </p>
    </div>
  );
}

const styles = {
  wrapper: {
    padding: '4rem',
    textAlign: 'center',
    background: 'linear-gradient(to right, #1e1e2f, #2a2a3f)',
    color: '#fff',
    minHeight: '100vh',
  },
  heading: {
    fontSize: '2.5rem',
    marginBottom: '1rem',
  },
  text: {
    fontSize: '1.25rem',
    opacity: 0.85,
  },
};

export default HomePage;
