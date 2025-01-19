import React, { useState, useEffect } from 'react';
import './warmup.css';

const COUNTDOWN_SECONDS = 30;

export default function Warmup({ onComplete }) {
    const [showStretches, setShowStretches] = useState(true);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [countdown, setCountdown] = useState(COUNTDOWN_SECONDS);
    const warmupData = require('../data.json').warmUps;

    useEffect(() => {
        let timer;
        if (countdown > 0 && isButtonDisabled) {
            timer = setInterval(() => {
                setCountdown(prev => prev - 1);
            }, 1000);
        } else if (countdown === 0) {
            setIsButtonDisabled(false);
        }

        return () => clearInterval(timer);
    }, [countdown, isButtonDisabled]);

    const handleComplete = () => {
        setShowStretches(false);
        onComplete();
    };

    if (!showStretches) {
        return (
            <div className="stretches-container">
                <h2>Warm Up Complete</h2>
                <p>Stay safe and make sure you're properly warmed up!</p>
                <button onClick={handleComplete}>Continue to training</button>
            </div>
        );
    }

    return (
        <div className="stretches-container">
            <div 
                style={{
                    height: '4px',
                    background: '#61dafb',
                    width: `${(countdown / COUNTDOWN_SECONDS) * 100}%`,
                    transition: 'width 1s linear',
                    marginTop: '-20px',
                    marginBottom: '20px'
                }}
            />
            <h2>Warm Up Routine</h2>
            
            <div className="stretch-section">
                <h3>Cardio Warm-up</h3>
                <ul>
                    {Object.values(warmupData.cardio).map((exercise, index) => (
                        <li key={index}>{exercise}</li>
                    ))}
                </ul>
            </div>

            <div className="stretch-section">
                <h3>Mobility Exercises</h3>
                <ul>
                    {Object.values(warmupData.mobility).map((exercise, index) => (
                        <li key={index}>{exercise}</li>
                    ))}
                </ul>
            </div>

            <div className="stretch-section">
                <h3>Dynamic Stretches</h3>
                <ul>
                    {Object.values(warmupData.dynamic).map((exercise, index) => (
                        <li key={index}>{exercise}</li>
                    ))}
                </ul>
            </div>

            <div className="stretch-section">
                <h3>Static Stretches</h3>
                <ul>
                    {Object.values(warmupData.stretches).map((exercise, index) => (
                        <li key={index}>{exercise}</li>
                    ))}
                </ul>
            </div>

            <div className="stretch-note">
                <p>Note: Hold each static stretch for minimum of 15 to 30 seconds. Perform dynamic stretches with controlled movements.</p>
            </div>

            <div className="skip-section">
                <button 
                    onClick={() => setShowStretches(false)}
                    disabled={isButtonDisabled}
                >
                    {isButtonDisabled ? `Please review warm-up ${countdown}s` : 'Complete'}
                </button>
            </div>
        </div>
    );
}
