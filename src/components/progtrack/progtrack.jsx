    import React, { useState, useEffect } from 'react';
import './progtrack.css';

const ProgressTracker = ({ totalRounds, onRoundComplete, onRoundDecrement, onReset }) => {
    const [completedRounds, setCompletedRounds] = useState(0);
    const [progress, setProgress] = useState(0);
    const [showNote, setShowNote] = useState(true);

    useEffect(() => {
        const progressPercentage = (completedRounds / totalRounds) * 100;
        setProgress(progressPercentage);
    }, [completedRounds, totalRounds]);

    useEffect(() => {
        // Listen for timer completion event
        const handleTimerComplete = () => {
            if (completedRounds < totalRounds) {
                handleRoundComplete();
            }
        };

        window.addEventListener('timerComplete', handleTimerComplete);

        return () => {
            window.removeEventListener('timerComplete', handleTimerComplete);
        };
    }, [completedRounds, totalRounds]);

    const handleRoundComplete = () => {
        if (completedRounds < totalRounds) {
            setCompletedRounds(completedRounds + 1);
            if (onRoundComplete) {
                onRoundComplete(completedRounds + 1);
            }
        }
    };

    const handleReset = () => {
        setCompletedRounds(0);
        setProgress(0);
        if (onReset) {
            onReset();
        }
    };

    const handleDecrement = () => {
        if (completedRounds > 0) {
            setCompletedRounds(completedRounds - 1);
            if (onRoundDecrement) {
                onRoundDecrement(completedRounds - 1);
            }
        }
    };

    const radius = 60;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (progress / 100) * circumference;

    return (
        <div className="progress-tracker">
            <div className={`progress-container`}>
                {showNote && (
                    <div className="progress-note">
                        <button 
                            onClick={() => setShowNote(false)}
                            className="note-close-btn"
                        >
                            ×
                        </button>
                        <p>
                           Rounds update automatically with timer or manually using controls.<br /> 
                        </p>
                        <p style={{ fontSize: '11px', color: 'crimson' }}>Close to access tracker.</p>
                    </div>
                )}
                <div className={`progress-circle-container ${showNote ? 'blurred' : ''}`}>
                    <button
                        onClick={handleDecrement}
                        className={`decrement-btn ${showNote ? 'disabled' : ''}`}
                        disabled={completedRounds === 0 || showNote}>
                        -
                    </button>
                    <svg width="140" height="140" className="progress-circle">
                    <circle
                        cx="70"
                        cy="70"
                        r={radius}
                        stroke="#2d2d2d"
                        strokeWidth="17"
                        fill="none"
                        className="progress-circle-bg"
                    />
                    <circle
                        cx="70"
                        cy="70"
                        r={radius}
                        stroke="#17e6b5"
                        strokeWidth="17"
                        fill="none"
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        className="progress-circle-fill"
                    />
                    </svg>
                    <div className="progress-text">
                        {completedRounds}/{totalRounds}
                    </div>
                </div>

            </div>
            <div className={`progress-controls ${showNote ? 'blurred' : ''}`}>
                <button 
                    onClick={handleRoundComplete}
                    disabled={completedRounds >= totalRounds || showNote}
                    className={`complete-round-btn ${completedRounds >= totalRounds || showNote ? 'disabled' : ''}`}
                >
                    {completedRounds >= totalRounds ? (
                        <span className="complete-text">Rounds Complete!</span>
                    ) : 'Complete Round'}
                </button>
                <button
                    onClick={handleReset}
                    className="reset-btn">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M21 12a9 9 0 0 0-9-9M3 12a9 9 0 0 1 9-9" strokeWidth="2" strokeLinecap="round"/>
                        <path d="M21 12a9 9 0 0 1-9 9" strokeWidth="2" strokeLinecap="round"/>
                        <path d="M12 21l3-3" strokeWidth="2" strokeLinecap="round"/>
                        <path d="M15 21h-3v-3" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default ProgressTracker;
