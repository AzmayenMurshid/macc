import React, { useState, useEffect } from "react";
import data from '../data.json';
import './combs.css';

export default function Combs({ diff }) {
    const [strikes, setStrikes] = useState({});
    const [defenses, setDefenses] = useState({});
    const [selectedCombos, setSelectedCombos] = useState([]);

    useEffect(() => {
        // Parse strikes data by category
        const strikesByCategory = {
            basic: data.dataStrikes.basicStrikes,
            intermediate: data.dataStrikes.intermediateStikes,
            advanced: data.dataStrikes.advancedStrikes
        };

        // Parse defenses data by category
        const defensesByCategory = {
            basic: data.dataDefenses.basicDefenses,
            intermediate: data.dataDefenses.intermediateDefenses,
            advanced: data.dataDefenses.advancedDefenses
        };

        // Get current difficulty strikes and defenses
        const currentStrikes = Object.entries(strikesByCategory[diff]);
        const currentDefenses = Object.entries(defensesByCategory[diff]);

        // Combine all moves for current difficulty
        const allMoves = [...currentStrikes, ...currentDefenses];

        // Randomly select 4 moves
        const selected = [];
        for(let i = 0; i < 4; i++) {
            const randomIndex = Math.floor(Math.random() * allMoves.length);
            selected.push(allMoves[randomIndex]);
            allMoves.splice(randomIndex, 1);
        }

        setSelectedCombos(selected);
        console.log("Selected combinations:", selected);

        // Add cleanup function
        return () => {
            setStrikes({});
            setDefenses({});
            setSelectedCombos([]);
            console.clear();
        };
    }, [diff]);

    return (
        <div>
            <div className="combinations-container">
                <div className="difficulty-section">
                    <h3>Selected Difficulty: {diff.charAt(0).toUpperCase() + diff.slice(1)}</h3>
                </div>
                <div className='Combination-display'>
                    {selectedCombos.map((combo, index) => (
                        <div key={index}>
                            {combo[1]}
                        </div>
                    ))}
                </div>    
            </div>
        </div>
    );
}