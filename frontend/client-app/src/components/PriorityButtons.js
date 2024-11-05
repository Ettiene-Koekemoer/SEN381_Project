import React, { useEffect, useState } from 'react';
import '../styling/PriorityButtons.css';

const PriorityButtons = ({ setSelectedPriority, initialPriority }) => {
    const [selected, setSelected] = useState(initialPriority);

    useEffect(() => {
        setSelected(initialPriority); // Set the selected state based on the initial priority passed in
    }, [initialPriority]);

    const toggleButton = (priority) => {
        const newSelected = (selected === priority) ? null : priority;
        setSelected(newSelected);
        // Capitalize the selected priority and pass it to the parent component
        setSelectedPriority(newSelected ? capitalizeFirstLetter(newSelected) : null);
    };

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    return (
        <div className="priority-buttons">
            <button
                className={`status-button ${selected === 'low' ? 'active' : ''}`}
                onClick={() => toggleButton('low')}
            >
                Low
            </button>
            <button
                className={`status-button ${selected === 'medium' ? 'active' : ''}`}
                onClick={() => toggleButton('medium')}
            >
                Medium
            </button>
            <button
                className={`status-button ${selected === 'high' ? 'active' : ''}`}
                onClick={() => toggleButton('high')}
            >
                High
            </button>
        </div>
    );
};

export default PriorityButtons;
