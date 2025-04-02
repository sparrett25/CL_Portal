// src/devtools/DevToolsIndex.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import LensVisualPreview from './LensVisualPreview';
import LioraVoiceTester from './LioraVoiceTester';
import WhisperSoundTester from './WhisperSoundTester';
import AffirmationLensPreview from './AffirmationLensPreview';

const DevToolsIndex = () => {
  return (
    <div className="devtools-container">
      <h1>Codex Lumina - DevTools</h1>
      <p>This page is for testing and debugging different components of the Codex Lumina project.</p>

      <section>
        <h2>Lens Visual Previews</h2>
        <LensVisualPreview />
      </section>

      <section>
        <h2>Liora Voice Tester</h2>
        <LioraVoiceTester />
      </section>

      <section>
        <h2>Whisper Sound Tester</h2>
        <WhisperSoundTester />
      </section>

      <section>
        <h2>Affirmation Lens Preview</h2>
        <AffirmationLensPreview />
      </section>

      <section>
        <Link to="/onboarding" className="btn-primary">Go to Onboarding</Link>
      </section>
    </div>
  );
};

export default DevToolsIndex;
