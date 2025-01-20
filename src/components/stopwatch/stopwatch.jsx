import React from 'react'
import { useState, useEffect } from 'react';
import './stopwatch.css'

export default function Stopwatch() {
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);
  const [targetTime, setTargetTime] = useState(0);
  const [isTraining, setIsTraining] = useState(true);

  useEffect(() => {
    let intervalId;
    if (isRunning) {
      intervalId = setInterval(() => {
        setTime(prevTime => {
          const newTime = prevTime + 10;
          if (newTime >= targetTime && targetTime > 0) {
            // Dispatch timerComplete event when target time is reached
            const event = new Event('timerComplete');
            window.dispatchEvent(event);
            setIsRunning(false);
            setIsTraining(!isTraining); // Toggle between train and rest
            return 0;
          }
          return newTime;
        });
      }, 10);
    }
    return () => clearInterval(intervalId);
  }, [isRunning, targetTime, isTraining]);

  const startStop = () => {
    if (!isRunning) {
      // Set target time to 1 minute when starting
      setTargetTime(60000);
    }
    setIsRunning(!isRunning);
  };

  const reset = () => {
    setIsRunning(false);
    setTime(0);
    setTargetTime(0);
    setIsTraining(true);
  };

  return (
    <div>
      <h3 style={{ 
        color: isTraining ? '#4CAF50' : '#ff0000',
        textAlign: 'center',
        marginBottom: '10px'
      }}>
        {isTraining ? 'TRAIN' : 'REST'}
      </h3>
      <div className='stopwatch'>
        <span><b>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}</b></span>
        <span><b>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}</b></span>
        <span><b>{("0" + ((time / 10) % 100)).slice(-2)}</b></span>
      </div>
      <div className='button-container'>
        <button 
          onClick={startStop}
          style={{ backgroundColor: isRunning ? '#ff0000' : '#4CAF50' }}  >
          {isRunning ? 'Stop' : 'Start'}
        </button>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
