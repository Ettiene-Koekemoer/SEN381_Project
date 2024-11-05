import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styling/App.css';
import { setActiveContract } from '../state/activeContract';

const ContractsTable = ({ onContractSelect, refreshContracts }) => {
    const [contracts, setContracts] = useState([]);

    useEffect(() => {
        const fetchContracts = async () => {
            try {
                const response = await axios.get(`https://localhost:7031/api/data/contracts`);
                setContracts(response.data);
            } catch (error) {
                console.error('There was an error fetching the contracts!', error);
            }
        };

        fetchContracts();
    }, [refreshContracts]); // Re-fetch contracts when refreshContracts changes

    const handleContractClick = (contractId) => {
        axios.get(`https://localhost:7031/api/data/contracts/${contractId}`)
            .then(response => {
                setActiveContract(response.data);
                onContractSelect(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the contract details!', error);
            });
    };

    const formatDate = (date) => {
        if (!date) return 'N/A';
        const d = new Date(date);
        const day = String(d.getDate()).padStart(2, '0');
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const year = d.getFullYear();
        return `${day}/${month}/${year}`;
    };

    return (
        <div>
            <table id='contracts'>
                <thead>
                    <tr>
                        <th>Contract ID</th>
                        <th>Client ID</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Service Level</th>
                        <th>Is Active</th>
                    </tr>
                </thead>
                <tbody>
                    {contracts.length > 0 ? (
                        contracts.map(contract => (
                            <tr key={contract.contractId} onClick={() => handleContractClick(contract.contractId)}>
                                <td>{contract.contractId}</td>
                                <td>{contract.clientId}</td>
                                <td>{formatDate(contract.startDate)}</td>
                                <td>{formatDate(contract.endDate)}</td>
                                <td>{contract.serviceLevel}</td>
                                <td>{contract.isActive ? 'Yes' : 'No'}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6">No Contracts Available</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ContractsTable;
