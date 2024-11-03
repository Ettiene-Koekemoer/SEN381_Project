import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styling/App.css';

const ClientsTable = () => {
    const [clients, setClients] = useState([]);
    const [selectedClient, setSelectedClient] = useState(null);

    useEffect(() => {
        axios.get(`https://localhost:7031/api/clients`)
            .then(response => {
                console.log(response.data);
                setClients(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the clients!', error);
            });
    }, []);

    const handleClientClick = (clientId) => {
        axios.get(`https://localhost:7031/api/clients/${clientId}`)
            .then(response => {
                setSelectedClient(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the client details!', error);
            });
    };

    return (
        <div>
            <h2 id='clientsHeading'>Clients</h2>
            <table id='clients'>
                <thead>
                    <tr>
                        <th>Client ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Address</th>
                    </tr>
                </thead>
                <tbody>
                    {clients.length > 0 ? (
                        clients.map(client => (
                            <tr key={client.clientId} onClick={() => handleClientClick(client.clientId)}>
                                <td>{client.clientId}</td>
                                <td>{client.name}</td>
                                <td>{client.email}</td>
                                <td>{client.phone}</td>
                                <td>{client.address}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4">No clients available.</td>
                        </tr>
                    )}
                </tbody>
            </table>

        </div>
    );
};

export default ClientsTable;
