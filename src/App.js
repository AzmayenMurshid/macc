import './App.css';
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from "@vercel/speed-insights/react"
import Warmup from './components/warmup/warmup';
import Combs from './components/combs/combs';
import Stopwatch from './components/stopwatch/stopwatch';
import Timer from './components/timer/timer';
import { useState } from 'react';

function App() {
  const [difficulty, setDifficulty] = useState('basic');
  const [showCombs, setShowCombs] = useState(false);
  const [showStretches, setShowStretches] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [combKey, setCombKey] = useState(0); // Add key to force re-render
  const [showTimer, setShowTimer] = useState(true);
  const [showTimerSection, setShowTimerSection] = useState(false);

  const handleGenerateClick = () => {
    setShowStretches(true);
    setShowCombs(false);
    setHasStarted(true);
  };

  const handleStretchesComplete = () => {
    setShowStretches(false);
    setShowTimerSection(true);
  };

  const handleGetCombos = () => {
    setCombKey(prevKey => prevKey + 1); // Increment key to force re-render
    setShowCombs(true);
  };

  const toggleTimer = () => {
    setShowTimer(!showTimer);
  };

  return (
    <div className="App">
      <Analytics />
      <SpeedInsights />
      <header className="App-header">
        <p>TRAIN SMARTER &nbsp;&nbsp;&nbsp;&nbsp; FIGHT HARDER</p>
      </header>
      <div className="App-body">
        <div>
          <h2>Welcome to Sensei.ai &nbsp;&nbsp;|&nbsp;&nbsp; Your Complete Martial Arts Training Companion</h2>
          <p>
            Sensei.ai is your all-in-one martial arts training platform designed to elevate 
            your skills to the next level. From guided warm-ups to dynamic combinations 
            and timed training sessions, SenseiAI provides everything you need for an 
            effective training session. Whether you're a beginner or an advanced 
            practitioner, SenseiAI offers:
          </p>
          <ul>
            <li>Structured warm-up routines to prevent injury</li>
            <li>Dynamic combat combinations for all skill levels</li>
            <li>Professional round timer for interval training</li>
            <li>Progressive difficulty system to match your growth</li>
          </ul>
          <p>
            Start your training session below with a proper warm-up, followed by 
            customized combinations and timed rounds!
          </p>
          {hasStarted && (
            <div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                gap: '20px', 
                margin: '20px 0' }}>
              <label>
                <input 
                  type="radio" 
                  name="difficulty" 
                  value="basic"
                  checked={difficulty === 'basic'}
                  onChange={(e) => setDifficulty(e.target.value)}
                />
                Basic
              </label>
              <label>
                <input 
                  type="radio" 
                  name="difficulty" 
                  value="intermediate"
                  checked={difficulty === 'intermediate'} 
                  onChange={(e) => setDifficulty(e.target.value)}
                />
                Intermediate  
              </label>
              <label>
                <input 
                  type="radio" 
                  name="difficulty" 
                  value="advanced"
                  checked={difficulty === 'advanced'}
                  onChange={(e) => setDifficulty(e.target.value)}
                />
                Advanced
              </label>
            </div>
          )}
          {!hasStarted ? (
            <button onClick={handleGenerateClick}>Begin Training</button>
          ) : (
            <button onClick={handleGetCombos}>Generate New Combinations</button>
          )}
          {showStretches && (
            <div className="modal-overlay">
              <div className="modal-content">
                <Warmup onComplete={handleStretchesComplete} />
              </div>
            </div>
          )}
          {showCombs && <Combs key={combKey} diff={difficulty} />}
        </div>
        {showTimerSection && (
          <div className="timer-section">
            <h2 style={{ 
              marginTop: 40,
              fontSize: '24px',
              fontWeight: 'bold',
              color: '#a1a3a6'
               }}>Training Clock</h2>
            <button onClick={toggleTimer}>
              {showTimer ? 'Switch to Stopwatch' : 'Switch to Timer'}
            </button>
            {showTimer ? <Timer /> : <Stopwatch />}
          </div>
        )}
      </div>
      <footer className='App-footer'>
        created by Azmayen Murshid
      <p>Version 1.0.2</p>
      </footer>
    </div>
  );
}

export default App;
