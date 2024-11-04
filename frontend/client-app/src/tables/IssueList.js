import React, { useEffect, useState } from 'react';

function IssueList({ onSelectIssue }) {
  const [serviceRequests, setServiceRequests] = useState([]);

  useEffect(() => {
    fetch('https://localhost:7031/api/Data/serviceRequests')
      .then(response => response.json())
      .then(data => {
        const filteredRequests = data.filter(request => request.technicianId === null);
        const requestsWithClientInfo = Promise.all(
          filteredRequests.map(async (request) => {
            const clientResponse = await fetch(`https://localhost:7031/api/auth/client/${request.clientId}`);
            const clientData = await clientResponse.json();
            return {
              ...request,
              clientPhone: clientData.phone,
              clientName: clientData.name,
              clientEmail: clientData.email, // Add email here
            };
          })
        );
        return requestsWithClientInfo;
      })
      .then(requestsWithClientInfo => setServiceRequests(requestsWithClientInfo))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className="field-issue-list">
      <table border="1">
        <thead>
          <tr>
            <th>Issue ID</th>
            <th>Client Name</th>
            <th>Date Reported</th>
            <th>Issue Description</th>
            <th>Client Phone</th>
            <th>Priority</th>
          </tr>
        </thead>
        <tbody>
          {serviceRequests.map((request) => (
            <tr key={request.serviceRequestId} onClick={() => onSelectIssue(request)}>
              <td>{request.serviceRequestId}</td>
              <td>{request.clientName}</td>
              <td>{new Date(request.assignedDate).toLocaleDateString()}</td>
              <td>{request.issueDescription}</td>
              <td>{request.clientPhone}</td>
              <td>{request.priority}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default IssueList;
