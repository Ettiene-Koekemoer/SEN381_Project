import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styling/App.css';

const ContractsTable = () => {
    const [contracts, setContracts] = useState([]);
    const [selectedContract, setSelectedContract] = useState(null);

    useEffect(() => {
        axios.get(`https://localhost:7031/api/data/contracts`)
            .then(response => {
                console.log(response.data);
                setContracts(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the contracts!', error);
            });
    }, []);

    const handleContractClick = (contractId) => {
        axios.get(`https://localhost:7031/api/data/contracts${contractId}`)
            .then(response => {
                setSelectedContract(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the contract details!', error);
            });
    };

    return (
        <div>
            <h2 id='contractsHeading'>Contracts</h2>
            <table id='contracts'>
                <thead>
                    <tr>
                        <th>Contract ID</th>
                        <th>Client ID</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {contracts.length > 0 ? (
                        contracts.map(contract => (
                            <tr key={contract.contractId} onClick={() => handleContractClick(contract.contractId)}>
                                <td>{contract.contractId}</td>
                                <td>{contract.clientId}</td>
                                <td>{contract.startDate}</td>
                                <td>{contract.endDate}</td>
                                <td>{contract.status}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5">No contracts available.</td>
                        </tr>
                    )}
                </tbody>
            </table>

            {selectedContract && (
                <div>
                    <h2 id='contractDetailsHeading'>Contract Details</h2>
                    <table>
                        <tbody>
                            <tr>
                                <td className='contractDetails'>Contract ID:</td>
                                <td>{selectedContract.contractId}</td>
                            </tr>
                            <tr>
                                <td className='contractDetails'>Client ID:</td>
                                <td>{selectedContract.clientId}</td>
                            </tr>
                            <tr>
                                <td className='contractDetails'>Start Date:</td>
                                <td>{selectedContract.startDate}</td>
                            </tr>
                            <tr>
                                <td className='contractDetails'>End Date:</td>
                                <td>{selectedContract.endDate}</td>
                            </tr>
                            <tr>
                                <td className='contractDetails'>Status:</td>
                                <td>{selectedContract.status}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ContractsTable;