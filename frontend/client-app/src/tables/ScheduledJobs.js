import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styling/App.css';

const ScheduledJobs = () => {
    const [serviceRequests, setServiceRequests] = useState([]);

    useEffect(() => {
        axios.get(`https://localhost:7031/api/data/serviceRequests`)
            .then(response => {
                console.log(response.data);
                // Filter requests that don't have a resolution date
                const unresolvedRequests = response.data.filter(request => !request.resolutionDate);
                setServiceRequests(unresolvedRequests);
            })
            .catch(error => {
                console.error('There was an error fetching the service requests!', error);
            });
    }, []);

    const formatDate = (date) => {
        if (!date) return 'N/A';
        const d = new Date(date);
        const day = String(d.getDate()).padStart(2, '0');
        const month = String(d.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
        const year = d.getFullYear();
        return `${day}/${month}/${year}`;
    };

    return (
        <div>
            <h2 id='scheduledJobsHeading'>Scheduled Jobs</h2>
            <table id='scheduledJobs'>
                <thead>
                    <tr>
                        <th>Job ID</th>
                        <th>Client ID</th>
                        <th>Technician ID</th>
                        <th>Issue Description</th>
                        <th>Priority</th>
                        <th>Status</th>
                        <th>Assigned Date</th>
                    </tr>
                </thead>
                <tbody>
                    {serviceRequests.length > 0 ? (
                        serviceRequests.map(request => (
                            <tr key={request.serviceRequestId}>
                                <td>{request.serviceRequestId}</td>
                                <td>{request.clientId}</td>
                                <td>{request.technicianId}</td>
                                <td>{request.issueDescription}</td>
                                <td>{request.priority}</td>
                                <td>{request.status}</td>
                                <td>{formatDate(request.assignedDate)}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7">No unresolved service requests available.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ScheduledJobs;
