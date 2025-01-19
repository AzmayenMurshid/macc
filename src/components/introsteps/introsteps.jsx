import React, { useState, useEffect } from 'react';
import { Steps } from 'antd';
import './introsteps.css';
import data from '../data.json';

const IntroSteps = ({ onComplete, setHasStarted }) => {
  const [current, setCurrent] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [showWarmup, setShowWarmup] = useState(false);

  const steps = data.introSteps.map(step => ({
    title: step.title,
    content: step.content
  }));

  const handleNext = () => {
    setCurrent(current + 1);
  };

  const handleDone = () => {
    setIsVisible(false);
    setShowWarmup(true);
    if (setHasStarted) setHasStarted(true);
  };

  const handleSkip = () => {
    setIsVisible(false); 
    setShowWarmup(true);
    if (setHasStarted) setHasStarted(true);
  };

  useEffect(() => {
    if (showWarmup && onComplete) {
      onComplete();
    }
  }, [showWarmup, onComplete]);

  if (!isVisible) return null;

  return (
    <div className="intro-steps-overlay">
      <div className="intro-steps-container">
        <Steps  current={current} items={steps} />
        <div className="steps-content">
          <h3>{steps[current].title}</h3>
          <p>{steps[current].content}</p>
        </div>
        <div className="steps-action">
          <button onClick={handleSkip}>Skip Tutorial</button>
          {current < steps.length - 1 && (
            <button onClick={handleNext}>Next</button>
          )}
          {current === steps.length - 1 && (
            <button onClick={handleDone}>Get Started</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default IntroSteps;
