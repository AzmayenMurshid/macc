import React, { useState, useEffect } from 'react';
import './timer.css';
import data from '../data.json';

export default function Timer() {
    const [isRunning, setIsRunning] = useState(false);
    const [timeLeft, setTimeLeft] = useState(0);
    const [roundDuration, setRoundDuration] = useState(data.timerSettings.defaultRound);
    const [restDuration, setRestDuration] = useState(data.timerSettings.defaultRest);
    const [isRest, setIsRest] = useState(false);
    const [customRoundDuration, setCustomRoundDuration] = useState('');
    const [isCustomRound, setIsCustomRound] = useState(false);
    const [customTimeInput, setCustomTimeInput] = useState('');
    const [showInput, setShowInput] = useState(false);
    const [showStatus, setShowStatus] = useState(false);

    useEffect(() => {
        let intervalId;
        if (isRunning && timeLeft > 0) {
            intervalId = setInterval(() => {
                setTimeLeft(prevTime => {
                    if (prevTime <= 1) {
                        if (!isRest) {
                            // Dispatch timerComplete event when round timer hits 0
                            const event = new Event('timerComplete');
                            window.dispatchEvent(event);
                            
                            setIsRest(true);
                            return restDuration;
                        } else {
                            setIsRest(false);
                            setIsRunning(false);
                            return 0;
                        }
                    }
                    return prevTime - 1;
                });
            }, 1000);
        }
        return () => clearInterval(intervalId);
    }, [isRunning, timeLeft, restDuration, isRest]);

    const startStop = () => {
        if (!isRunning && timeLeft === 0) {
            if (customTimeInput) {
                // Convert MM:SS format to total seconds
                const [minutes, seconds] = customTimeInput.split(':').map(Number);
                if (!isNaN(minutes) && !isNaN(seconds)) {
                    const totalSeconds = (minutes * 60) + seconds;
                    setTimeLeft(totalSeconds);
                }
            } else {
                setTimeLeft(roundDuration);
            }
            setIsRest(false);
        }
        setIsRunning(!isRunning);
        setShowStatus(true);
    };

    const reset = () => {
        setIsRunning(false);
        setTimeLeft(0);
        setIsRest(false);
        setCustomTimeInput('');
        setShowStatus(false);
    };

    const handleRoundTimeChange = (event) => {
        const value = event.target.value;
        if (value === 'custom') {
            setIsCustomRound(true);
            setRoundDuration('custom');
            setTimeLeft(0);
            setShowInput(true); // Show input when custom is selected
        } else {
            setIsCustomRound(false);
            const seconds = parseInt(value) * 60;
            setRoundDuration(seconds);
            setTimeLeft(seconds);
        }
        setIsRunning(false);
        setIsRest(false);
    };

    const handleRestTimeChange = (event) => {
        const value = event.target.value;
        const seconds = parseInt(value);
        setRestDuration(seconds);
        setIsRunning(false);
        setIsRest(false);
    };

    const formatTime = (totalSeconds) => {
        if (isNaN(totalSeconds)) {
            return (
                <div className="timer-error-message">
                    Hit reset and enter timer duration
                </div>
            );
        }
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    const handleCustomTimeInput = (e) => {
        const value = e.target.value;
        
        // Remove any non-digit characters
        const cleanValue = value.replace(/[^\d]/g, '');
        
        // Handle minutes input (first 2 digits)
        if (cleanValue.length <= 2) {
            setCustomTimeInput(cleanValue);
        } 
        // Automatically add colon after minutes and handle seconds
        else if (cleanValue.length > 2) {
            const minutes = cleanValue.slice(0, 2);
            const seconds = cleanValue.slice(2, 4);
            setCustomTimeInput(`${minutes}:${seconds}`);
            
            // Convert to total seconds if we have valid input
            if (!isNaN(minutes) && !isNaN(seconds)) {
                const totalSeconds = parseInt(minutes) * 60 + parseInt(seconds);
                setTimeLeft(totalSeconds);
            }
        }
    };

    const handleCustomTimeKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.target.blur();
            setShowInput(false);
            const inputParts = customTimeInput.split(':');
            if (inputParts.length === 2) {
                const minutes = parseInt(inputParts[0]);
                const seconds = parseInt(inputParts[1]);
                if (!isNaN(minutes) && !isNaN(seconds)) {
                    const totalSeconds = minutes * 60 + seconds;
                    setTimeLeft(totalSeconds);
                }
            }
        }
    };

    return (
        <div>
            {showStatus && (
                <h3 className={`status-text ${isRest ? "timer-rest" : "timer-train"}`}>
                    {isRest ? 'REST' : 'TRAIN'}
                </h3>
            )}
            <div>
                {showInput ? (
                    <input
                        type="text"
                        placeholder="MM:SS"
                        value={customTimeInput}
                        onChange={handleCustomTimeInput}
                        onKeyDown={handleCustomTimeKeyDown}
                        onBlur={() => setShowInput(false)}
                        className="timer"
                        style={{
                            backgroundColor: '#282c34',
                            border: '1px solid #61dafb',
                            borderRadius: '5px',
                            padding: '5px',
                            width: '200px',
                            minHeight: '50px',
                            fontSize: '20px',
                            textAlign: 'center',
                            color: 'white' }}
                        maxLength="5"
                        autoFocus
                    />
                ) : (
                    <span 
                        className="timer"
                        onClick={() => {
                            if (!isRunning) {
                                if (timeLeft === 0 && !showInput) {
                                    setShowInput(true);
                                } else {
                                    setShowInput(!showInput);
                                }
                            }
                        }}
                        style={{color: isRest ? '#4CAF50' : 'rgb(154, 154, 187)'}}
                    >
                        {formatTime(timeLeft)}
                    </span>
                )}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px', justifyContent: 'center' }}>
                    <p style={{ margin: 0, color: 'white' }}>Round Duration:</p>
                    <select 
                        value={isCustomRound ? 'custom' : roundDuration / 60}
                        onChange={handleRoundTimeChange}
                        className="timer-select"
                    >
                        {Object.entries(data.timerSettings.roundDurations).map(([key, value]) => (
                            <option key={key} value={value/60}>
                                {value/60} Minutes
                            </option>
                        ))}
                        <option value="custom">Custom</option>
                    </select>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px', justifyContent: 'center' }}>
                    <p style={{ margin: 0, color: 'white' }}>Rest Duration:</p>
                    <select
                        value={restDuration}
                        onChange={handleRestTimeChange}
                        className="timer-select"
                    >
                        {Object.entries(data.timerSettings.restPeriods).map(([key, value]) => (
                            <option key={key} value={value}>
                                {value} Seconds Rest
                            </option>
                        ))}
                    </select>
                </div>
                <div className="button-container">
                    <button onClick={startStop}>{isRunning ? 'Pause' : 'Start'}</button>
                    <button onClick={reset}>Reset</button>
                </div>
            </div>
        </div>
    );
}
