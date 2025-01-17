import './App.css';
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from "@vercel/speed-insights/react"
import Warmup from './components/warmup/warmup';
import Combs from './components/combs/combs';
import Stopwatch from './components/stopwatch/stopwatch';
import Timer from './components/timer/timer';

import Sensai from './components/sensai-ai/sensai';
import { useState, useEffect } from 'react';

// TODO: add training distinction type between speed, power, and form

import { useState } from 'react';


function App() {
  const [difficulty, setDifficulty] = useState('basic');
  const [showCombs, setShowCombs] = useState(false);
  const [showStretches, setShowStretches] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [combKey, setCombKey] = useState(0); // Add key to force re-render
  const [showTimer, setShowTimer] = useState(true);
  const [showTimerSection, setShowTimerSection] = useState(false);

  const [currentStep, setCurrentStep] = useState(0);
  const [showIntro, setShowIntro] = useState(true);
  const [showChat, setShowChat] = useState(false);

  const { introSteps } = require('./components/data.json');

  useEffect(() => {
    // Always show intro steps by removing localStorage check
    setShowIntro(true);
  }, []);

  const handleNextStep = () => {
    if (currentStep < introSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowIntro(false);
      setShowStretches(true);
      setShowCombs(false);
      setHasStarted(true);
    }
  };

  const handleSkipIntro = () => {
    setShowIntro(false);


  const handleGenerateClick = () => {

    setShowStretches(true);
    setShowCombs(false);
    setHasStarted(true);
  };

  const handleStretchesComplete = () => {
    setShowStretches(false);

    setShowCombs(true);


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
      <header className="App-header">
        <p>TRAIN SMARTER &nbsp;&nbsp;&nbsp;&nbsp; FIGHT HARDER</p>
      </header>

      {showIntro && (
        <div className="intro-overlay" style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000
        }}>
          <div className="intro-modal" style={{
            backgroundColor: '#2a2a2a',
            padding: '30px',
            borderRadius: '10px',
            maxWidth: '500px',
            textAlign: 'center',
            color: '#fff',
            position: 'relative'
          }}>
            <h2 style={{ color: '#ffd700' }}>{introSteps[currentStep].title}</h2>
            <p style={{ margin: '20px 0' }}>{introSteps[currentStep].content}</p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
              <button onClick={handleNextStep} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '5px'
              }}>
                {currentStep === introSteps.length - 1 ? "Get Started" : "Next"}
                {currentStep !== introSteps.length - 1 && (
                  <span style={{ fontSize: '20px' }}>→</span>
                )}
              </button>
              <button onClick={handleSkipIntro}>Skip Tour</button>
            </div>
            <div style={{ marginTop: '20px' }}>
              {introSteps.map((_, index) => (
                <span key={index} style={{
                  height: '10px',
                  width: '10px',
                  margin: '0 5px',
                  backgroundColor: currentStep === index ? '#ffd700' : '#fff',
                  borderRadius: '50%',
                  display: 'inline-block'
                }}></span>
              ))}
            </div>
          </div>
        </div>
      )}
      <div className="App-body">
        {!showChat ? (
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
        ) : (
          <Sensai />

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

      <p>Version 1.0.2</p>

      </footer>
      <button 
        onClick={toggleChat}
        title="Chat with Sensai"
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          borderRadius: '50%',
          width: '70px',
          height: '70px',
          fontSize: '28px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
          zIndex: 1000
        }}
      >
        {showChat ? '🔙' : '💬'}
      </button>
    </div>
  );
}

export default App;
