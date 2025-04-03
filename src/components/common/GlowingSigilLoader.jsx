import React from 'react';

function GlowingSigilLoader() {
  return (
    <div style={styles.container}>
      <div style={styles.sigilWrapper}>
        <img src="/sigil.svg" alt="Codex Lumina Sigil" style={styles.sigil} />
      </div>
      <p style={styles.text}>Aligning energies...</p>
    </div>
  );
}

const styles = {
  container: {
    height: '100vh',
    background: 'radial-gradient(circle, #0a0a1a 0%, #000010 100%)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff',
  },
  sigilWrapper: {
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    animation: 'pulseGlow 2s ease-in-out infinite',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sigil: {
    width: '100%',
    filter: 'drop-shadow(0 0 12px #7b5de3)',
  },
  text: {
    marginTop: '1.5rem',
    fontFamily: `'Cinzel', serif`,
    fontSize: '1.2rem',
    opacity: 0.85,
  },
};

export default GlowingSigilLoader;
