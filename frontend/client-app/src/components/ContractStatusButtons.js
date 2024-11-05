import React from 'react';
import '../styling/App.css';

const ContractStatusButtons = ({ setSelectedStatus, currentSelected }) => {
    const toggleButton = (status) => {
        const newSelected = (currentSelected === status) ? null : status;
        setSelectedStatus(newSelected);
    };

    return (
        <div className="contract-status-buttons">
            <button
                className={`status-button ${currentSelected === 'active' ? 'active' : ''}`}
                onClick={() => toggleButton('active')}
            >
                Active
            </button>
            <button
                className={`status-button ${currentSelected === 'canceled' ? 'active' : ''}`}
                onClick={() => toggleButton('canceled')}
            >
                Canceled
            </button>
        </div>
    );
};

export default ContractStatusButtons;
