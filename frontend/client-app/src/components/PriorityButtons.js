import React, { useState } from 'react';
import '../styling/PriorityButtons.css';

const PriorityButtons = ({ setSelectedPriority }) => {
    const [selected, setSelected] = useState(null);

    const toggleButton = (priority) => {
        const newSelected = (selected === priority) ? null : priority;
        setSelected(newSelected);
        // Capitalize the selected priority and pass it to the parent component
        setSelectedPriority(newSelected ? capitalizeFirstLetter(newSelected) : null);
    };

    // Function to capitalize the first letter of a string
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
