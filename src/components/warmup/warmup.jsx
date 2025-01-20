import React, { useState, useEffect } from 'react';
import './warmup.css';

const COUNTDOWN_SECONDS = 1;

export default function Warmup({ onComplete }) {
    const [showStretches, setShowStretches] = useState(true);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [countdown, setCountdown] = useState(COUNTDOWN_SECONDS);
    const [currentPage, setCurrentPage] = useState(1);
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

    const nextPage = () => {
        setCurrentPage(prev => Math.min(prev + 1, 3));
    };

    const prevPage = () => {
        setCurrentPage(prev => Math.max(prev - 1, 1));
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
            <div className="page-indicator">
                Step {currentPage} of 3
            </div>
            
            <div className="stretch-section">
                {currentPage === 1 && (
                    <>
                        <h3>1. Cardio Warm-up</h3>
                        <ul>
                            {Object.values(warmupData.cardio || {}).map((exercise, index) => (
                                <li key={index}>
                                    <strong>{exercise.name}</strong>
                                    <p>{exercise.description}</p>
                                    <p>Form: {exercise.form}</p>
                                    <p>Common mistakes to avoid:</p>
                                    <ul>
                                        {exercise.commonMistakes.map((mistake, i) => (
                                            <li key={i}>{mistake}</li>
                                        ))}
                                    </ul>
                                </li>
                            ))}
                        </ul>
                    </>
                )}

                {currentPage === 2 && (
                    <>
                        <h3>2. Static Stretches</h3>
                        <ul>
                            {Object.values(warmupData.stretches || {}).map((exercise, index) => (
                                <li key={index}>
                                    <strong>{exercise.name}</strong>
                                    <p>{exercise.description}</p>
                                    <p>Form: {exercise.form}</p>
                                    <p>Common mistakes to avoid:</p>
                                    <ul>
                                        {exercise.commonMistakes.map((mistake, i) => (
                                            <li key={i}>{mistake}</li>
                                        ))}
                                    </ul>
                                </li>
                            ))}
                        </ul>
                    </>
                )}

                {currentPage === 3 && (
                    <>
                        <h3>3. Dynamic Warm-up</h3>
                        <ul>
                            {Object.values(warmupData.dynamic || {}).map((exercise, index) => (
                                <li key={index}>
                                    <strong>{exercise.name}</strong>
                                    <p>{exercise.description}</p>
                                    <p>Form: {exercise.form}</p>
                                    <p>Common mistakes to avoid:</p>
                                    <ul>
                                        {exercise.commonMistakes.map((mistake, i) => (
                                            <li key={i}>{mistake}</li>
                                        ))}
                                    </ul>
                                </li>
                            ))}
                        </ul>
                    </>
                )}
            </div>

            <div className="stretch-note">
                <p>Note: Hold each static stretch for minimum of 15 to 30 seconds. Perform dynamic stretches with controlled movements.</p>
            </div>

            <div className="navigation-buttons" style={{ display: 'flex', justifyContent: currentPage === 3 ? 'center' : 'space-between', gap: '10px' }}>
                {currentPage > 1 && currentPage < 3 && (
                    <button onClick={prevPage}>←</button>
                )}
                {currentPage < 3 && (
                    <button onClick={nextPage}>→</button>
                )}
                {currentPage === 3 && (
                    <button 
                        onClick={() => setShowStretches(false)}
                        disabled={isButtonDisabled}
                    >
                        {isButtonDisabled ? `Please review warm-up ${countdown}s` : 'Complete Warm Up'}
                    </button>
                )}
            </div>
        </div>
    );
}
