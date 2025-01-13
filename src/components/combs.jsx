import React, { useState, useEffect } from "react";
import combsData from './combsData.json';

export default function Combs() {
    const [strikes, setStrikes] = useState({});
    const [defenses, setDefenses] = useState({});

    useEffect(() => {
        // Parse strikes data
        const allStrikes = {
            ...combsData.dataStrikes.basicStrikes,
            ...combsData.dataStrikes.intermediateStikes,
            ...combsData.dataStrikes.advancedStrikes
        };
        setStrikes(allStrikes);

        // Parse defenses data
        const allDefenses = {
            ...combsData.dataDefenses.basicDefenses,
            ...combsData.dataDefenses.intermediateDefenses,
            ...combsData.dataDefenses.advancedDefenses
        };
        setDefenses(allDefenses);

        // Log strikes and defenses
        console.log("Available Strikes:");
        console.log(allStrikes)
        Object.entries(allStrikes).forEach(([key, value]) => {
            console.log(`${key}: ${value}`);
        });

        console.log("\nAvailable Defenses:");
        console.log(allDefenses)
        Object.entries(allDefenses).forEach(([key, value]) => {
            console.log(`${key}: ${value}`);
        });
    }, []);

    return (
        <div>
            {/* Method 1: Simple mapping */}
            {Object.entries(combsData.dataStrikes).map(([category, strikes]) => (
                <div key={category}>
                    <h3>{category}</h3>
                    <pre>{JSON.stringify(strikes, null, 2)}</pre>
                </div>
            ))}

            {/* Method 2: Nested mapping */}
            {Object.entries(combsData.dataStrikes).map(([category, strikes]) => (
                <div key={category}>
                    <h3>{category}</h3>
                    {Object.entries(strikes).map(([name, description]) => (
                        <div key={name}>
                            <strong>{name}:</strong> {description}
                        </div>
                    ))}
                </div>
            ))}

            {/* Method 3: Conditional rendering with mapping */}
            {Object.entries(combsData.dataStrikes).map(([category, strikes]) => (
                <div key={category}>
                    <h3>{category}</h3>
                    {Object.entries(strikes).length > 0 ? (
                        Object.entries(strikes).map(([name, description]) => (
                            <div key={name}>{name}: {description}</div>
                        ))
                    ) : (
                        <p>No strikes in this category</p>
                    )}
                </div>
            ))}
        </div>
    );
}