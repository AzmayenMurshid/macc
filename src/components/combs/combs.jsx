import React, { useState, useEffect } from "react";
import data from '../data.json';
import './combs.css';

export default function Combs({ diff }) {
    const [strikes, setStrikes] = useState({});
    const [defenses, setDefenses] = useState({});
    const [selectedCombos, setSelectedCombos] = useState([]);
    const [expandedCombos, setExpandedCombos] = useState({});
    const [showTutorials, setShowTutorials] = useState({});

    useEffect(() => {
        // Parse strikes data by category
        const strikesByCategory = {
            basic: data.dataStrikes?.basicStrikes || {},
            intermediate: data.dataStrikes?.intermediateStikes || {},
            advanced: data.dataStrikes?.advancedStrikes || {}
        };

        // Parse defenses data by category 
        const defensesByCategory = {
            basic: data.dataDefenses?.basicDefenses || {},
            intermediate: data.dataDefenses?.intermediateDefenses || {},
            advanced: data.dataDefenses?.advancedDefenses || {}
        };

        // Get current difficulty strikes and defenses
        const currentStrikes = Object.entries(strikesByCategory[diff] || {});
        const currentDefenses = Object.entries(defensesByCategory[diff] || {});

        // Combine all moves for current difficulty
        const allMoves = [...currentStrikes, ...currentDefenses];

        // Randomly select 4 moves if enough moves exist
        const numToSelect = Math.min(4, allMoves.length);
        const selected = [];
        const movesCopy = [...allMoves];
        
        for(let i = 0; i < numToSelect; i++) {
            const randomIndex = Math.floor(Math.random() * movesCopy.length);
            selected.push(movesCopy[randomIndex]);
            movesCopy.splice(randomIndex, 1);
        }

        setSelectedCombos(selected);
        setExpandedCombos({});
        setShowTutorials({});

        // Add cleanup function
        return () => {
            setStrikes({});
            setDefenses({});
            setSelectedCombos([]);
            setExpandedCombos({});
            setShowTutorials({});
        };
    }, [diff]);

    const toggleComboDetails = (index) => {
        setExpandedCombos(prev => ({
            ...prev,
            [index]: !prev[index]
        }));
    };

    const toggleTutorial = (index) => {
        setShowTutorials(prev => ({
            ...prev,
            [index]: !prev[index]
        }));
    };

    return (
        <div>
            <div className="combinations-container">
                <div className="difficulty-section">
                    <h3>Selected Difficulty: {diff.charAt(0).toUpperCase() + diff.slice(1)}</h3>
                </div>
                <div className='Combination-display'>
                    {selectedCombos.map((combo, index) => (
                        <div key={index} className="combo-item">
                            <div className="combo-header">
                                <span>{combo[1].name}</span>
                                {combo[1].power && (
                                    <span style={{ color: '#a1a3a6', fontSize: '0.9em', margin: '0 10px' }}>
                                        Power: {combo[1].power}/5
                                    </span>
                                )}
                                <button 
                                    onClick={() => toggleComboDetails(index)}
                                    className="learn-more-btn"
                                    aria-label={expandedCombos[index] ? 'Show Less' : 'Learn More'}
                                    style={{
                                        backgroundColor: '#2a2e35',
                                        borderRadius: '20%',
                                        width: '24px',
                                        height: '24px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: '#61dafb',
                                        fontSize: '12px',
                                        transition: 'all 0.2s ease'
                                    }}
                                >
                                    {expandedCombos[index] ? '−' : '+'}
                                </button>
                            </div>
                            {expandedCombos[index] && (
                                <div className="combo-details">
                                    <p><strong>Description:</strong> {combo[1].description}</p>
                                    {combo[1].power && (
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                                            <strong>Power Rating:</strong> {combo[1].power}/5
                                            <span style={{ color: '#a1a3a6', fontSize: '0.9em' }}>
                                                ({combo[1].powerDescription || 'N/A'})
                                            </span>
                                        </div>
                                    )}
                                    <p><strong>Proper Form:</strong> {combo[1].form}</p>
                                    <div className="common-mistakes">
                                        <strong>Common Mistakes:</strong>
                                        <ul>
                                            {combo[1].commonMistakes.map((mistake, i) => (
                                                <li key={i}>{mistake}</li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div>
                                        <button
                                            className="tutorial-btn"
                                            disabled={true}
                                            style={{opacity: 0.6, cursor: 'not-allowed'}}
                                        >
                                            Tutorial Videos Coming Soon
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>    
            </div>
        </div>
    );
}