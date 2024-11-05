import React, { useState } from 'react';
import '../styling/App.css';

const ContractTypeButtons = ({ setSelectedContractType, currentSelected }) => {
    const toggleButton = (type) => {
        const newSelected = currentSelected === type ? null : type;
        setSelectedContractType(newSelected);
    };

    return (
        <div className="contract-type-buttons">
            <button
                className={`contract-button ${currentSelected === 'premium' ? 'active' : ''}`}
                onClick={() => toggleButton('premium')}
            >
                Premium
            </button>
            <button
                className={`contract-button ${currentSelected === 'standard' ? 'active' : ''}`}
                onClick={() => toggleButton('standard')}
            >
                Standard
            </button>
            <button
                className={`contract-button ${currentSelected === 'basic' ? 'active' : ''}`}
                onClick={() => toggleButton('basic')}
            >
                Basic
            </button>
        </div>
    );
};

export default ContractTypeButtons;
