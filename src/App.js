import './App.css';
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from "@vercel/speed-insights/react"
import Warmup from './components/warmup/warmup';
import Combs from './components/combs/combs';
import Stopwatch from './components/stopwatch/stopwatch';
import Timer from './components/timer/timer';
import IntroSteps from './components/introsteps/introsteps';
import { useState } from 'react';

function App() {
  const [difficulty, setDifficulty] = useState('basic');
  const [showCombs, setShowCombs] = useState(false);
  const [showStretches, setShowStretches] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [combKey, setCombKey] = useState(0); // Add key to force re-render
  const [showTimer, setShowTimer] = useState(true);
  const [showTimerSection, setShowTimerSection] = useState(false);
  const [showChat, setShowChat] = useState(false);

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

  const toggleChat = () => {
    setShowChat(!showChat);
  };

  return (
    <div className="App">
      <Analytics />
      <SpeedInsights />
      <IntroSteps onComplete={handleStretchesComplete} setHasStarted={setHasStarted} />
      <header className="App-header">
        <p>TRAIN SMARTER &nbsp;&nbsp;&nbsp;&nbsp; FIGHT HARDER</p>
      </header>
      <div className="App-body">
        <div>
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
          {hasStarted && (
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
      <button 
        onClick={toggleChat}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          backgroundColor: '#1890ff',
          color: 'white',
          border: 'none',
          cursor: 'pointer',
          boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '24px'
        }}
      >
        💬
      </button>
      <footer className='App-footer'>
        created by Azmayen Murshid
        <p>Version 1.0.2</p>
      </footer>
    </div>
  );
}

export default App;
