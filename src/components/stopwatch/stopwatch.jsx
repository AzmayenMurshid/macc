import React from 'react'
import { useState, useEffect } from 'react';
import './stopwatch.css'

export default function Stopwatch() {
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);

  useEffect(() => {
    let intervalId;
    if (isRunning) {
      intervalId = setInterval(() => {
        setTime(prevTime => prevTime + 10);
      }, 10);
    }
    return () => clearInterval(intervalId);
  }, [isRunning]);

  const startStop = () => {
    setIsRunning(!isRunning);
  };

  const reset = () => {
    setIsRunning(false);
    setTime(0);
  };

  return (
    <div>
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
