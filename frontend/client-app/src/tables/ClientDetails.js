import React, { useState, useEffect } from 'react';
import { getActiveContract, subscribe } from '../state/activeContract';

const ClientDetails = () => {
    const [activeContract, setActiveContract] = useState(getActiveContract());

    useEffect(() => {
        const unsubscribe = subscribe(setActiveContract);
        return unsubscribe;
    }, []);

    if (!activeContract || !activeContract.client) return <p>No client details available.</p>;

    const { client } = activeContract; // Assuming the client details are under `activeContract.client`

    return (
        <div className="client-details-container">
            <div className="client-detail inline">
                <label><h3>Client ID:</h3></label>
                <input type="text" value={client.clientId || 'N/A'} readOnly />
                <label><h3>Client Name:</h3></label>
                <input type="text" value={client.name || 'N/A'} readOnly />
            </div>
            <div className="client-detail inline">
                <label><h3>Email:</h3></label>
                <input type="text" value={client.email || 'N/A'} readOnly />
                <label><h3>Phone:</h3></label>
                <input type="text" value={client.phone || 'N/A'} readOnly />
                <label><h3>Address:</h3></label>
                <input type="text" value={client.address || 'N/A'} readOnly />
            </div>
        </div>
    );
};

export default ClientDetails;
