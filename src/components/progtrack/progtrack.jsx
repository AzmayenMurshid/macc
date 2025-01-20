import React, { useState, useEffect } from 'react';

const ProgressTracker = ({ totalRounds }) => {
    const [completedRounds, setCompletedRounds] = useState(0);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const progressPercentage = (completedRounds / totalRounds) * 100;
        setProgress(progressPercentage);
    }, [completedRounds, totalRounds]);

    useEffect(() => {
        // Listen for timer completion event
        const handleTimerComplete = () => {
            if (completedRounds < totalRounds) {
                setCompletedRounds(completedRounds + 1);
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
        }
    };

    const handleReset = () => {
        setCompletedRounds(0);
        setProgress(0);
    };

    const radius = 60;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (progress / 100) * circumference;

    return (
        <div className="progress-tracker" style={{ textAlign: 'center', marginBottom: '1rem', marginTop: '1rem' }}>
            <div style={{ position: 'relative', width: '140px', height: '140px', margin: '0 auto' }}>
                <svg width="140" height="140" style={{ transform: 'rotate(-90deg)' }}>
                    <circle
                        cx="70"
                        cy="70"
                        r={radius}
                        stroke="#2d2d2d"
                        strokeWidth="15"
                        fill="none"
                    />
                    <circle
                        cx="70"
                        cy="70"
                        r={radius}
                        stroke="#61dafb"
                        strokeWidth="15"
                        fill="none"
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        style={{ transition: 'stroke-dashoffset 0.5s ease-in-out' }}
                    />
                </svg>
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    fontSize: '1.5rem',
                    color: '#fff'
                }}>
                    {completedRounds}/{totalRounds}
                </div>
            </div>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '2rem' }}>
                <button 
                    onClick={handleRoundComplete}
                    disabled={completedRounds >= totalRounds}
                    style={{
                        padding: '0.75rem 1rem',
                        backgroundColor: completedRounds >= totalRounds ? '#4a4a4a' : '#61dafb',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '10px',
                        cursor: completedRounds >= totalRounds ? 'not-allowed' : 'pointer'
                    }}
                >
                    {completedRounds >= totalRounds ? (
                        <span style={{color: '#98FB98', fontWeight: 'bold'}}>Rounds Complete!</span>
                    ) : 'Complete Round'}
                </button>
                <button
                    onClick={handleReset}
                    style={{
                        padding: '0.75rem',
                        backgroundColor: 'transparent',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '10px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
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
