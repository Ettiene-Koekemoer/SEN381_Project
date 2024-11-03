import React, { useEffect, useState } from 'react';
import { getActiveContract, subscribe } from '../state/activeContract';

const ActiveContractDetails = () => {
    const [activeContract, setActiveContract] = useState(getActiveContract());

    useEffect(() => {
        const unsubscribe = subscribe(setActiveContract);
        return unsubscribe;
    }, []);

    if (!activeContract) return <p>No contract selected.</p>;

    return (
        <div>
            <h2 id='contractDetailsHeading'>Active Contract</h2>
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
                    <tr>
                        <td>{activeContract.contractId}</td>
                        <td>{activeContract.clientId}</td>
                        <td>{formatDate(activeContract.startDate)}</td>
                        <td>{formatDate(activeContract.endDate)}</td>
                        <td>{activeContract.serviceLevel}</td>
                        <td>{activeContract.isActive ? 'Yes' : 'No'}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

const formatDate = (date) => {
    if (!date) return 'N/A';
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
};

export default ActiveContractDetails;
