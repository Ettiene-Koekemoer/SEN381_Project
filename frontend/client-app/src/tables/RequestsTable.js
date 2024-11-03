import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styling/App.css';

const RequestsTable = () => {
    const [serviceRequests, setServiceRequests] = useState([]);
    const [selectedRequest, setSelectedRequest] = useState(null);

    useEffect(() => {
        axios.get(`https://localhost:7031/api/service-requests`)
            .then(response => {
                console.log(response.data);
                setServiceRequests(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the service requests!', error);
            });
    }, []);

    const handleRequestClick = (requestId) => {
        axios.get(`https://localhost:7031/api/service-requests/${requestId}`)
            .then(response => {
                setSelectedRequest(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the service request details!', error);
            });
    };

    return (
        <div>
            <h2 id='serviceRequestsHeading'>Service Requests</h2>
            <table id='serviceRequests'>
                <thead>
                    <tr>
                        <th>Request ID</th>
                        <th>Description</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {serviceRequests.length > 0 ? (
                        serviceRequests.map(request => (
                            <tr key={request.requestId} onClick={() => handleRequestClick(request.requestId)}>
                                <td>{request.requestId}</td>
                                <td>{request.description}</td>
                                <td>{request.status}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3">No service requests available.</td>
                        </tr>
                    )}
                </tbody>
            </table>

        </div>
    );
};

export default RequestsTable;
