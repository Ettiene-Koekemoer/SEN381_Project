import React, { useState } from 'react';
import '../styling/App.css';
import arrow from '../images/arrow.png';
import RequestsTable from '../tables/RequestsTable';
import ScheduledJobs from '../tables/ScheduledJobs';
import axios from 'axios';

function FieldService() {
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [jobId, setJobId] = useState('');
    const [clientId, setClientId] = useState('');
    const [technicianId, setTechnicianId] = useState('');
    const [issueDescription, setIssueDescription] = useState('');
    const [priority, setPriority] = useState('');
    const [status, setStatus] = useState('');
    const [assignedDate, setAssignedDate] = useState('');
    const [resolutionDate, setResolutionDate] = useState('');
    const [message, setMessage] = useState(''); 

    const goToDashboard = () => {
        window.location.href = '/dashboardTech';
    };

    const handleRequestClick = (request) => {
        setSelectedRequest(request);
        setJobId(request.serviceRequestId);
        setClientId(request.clientId);
        setTechnicianId(request.technicianId);
        setIssueDescription(request.issueDescription);
        setPriority(request.priority);
        setStatus(request.status);
        setAssignedDate(request.assignedDate);
        setResolutionDate(request.resolutionDate || '');
        setMessage(''); 
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        const updatedRequest = {
            serviceRequestId: jobId,
            clientId,
            technicianId,
            issueDescription,
            priority,
            status,
            assignedDate,
            resolutionDate,
        };

        try {
            await axios.put(`https://localhost:7031/api/data/serviceRequests/${jobId}`, updatedRequest);
            setMessage("Service request updated successfully!"); 
            setSelectedRequest(null); 
        } catch (error) {
            console.error('There was an error updating the service request!', error);
            setMessage("Error updating service request. Please try again."); 
        }
    };

    return (
        <div className="FieldService">
            <header className='nav'>
                <button onClick={goToDashboard} className="dashboard-button">
                    <img src={arrow} alt="Arrow" width="50" height="50" />
                </button>
                <h1>Field Service Management</h1>
            </header> 

            <div className="field-container">
                <h2 id='fieldServiceHeading'>Field Service Management Centre</h2>
                <div className="field-top">
                    <div className='field-top-left'>
                        <RequestsTable onRequestClick={handleRequestClick} />
                    </div>

                    <div className='field-top-right'>
                        <h2>Escalate or Reassign Service Request</h2>
                        <form className='escalate-container' onSubmit={handleUpdate}>
                            <div>
                                <label htmlFor='jobID'><h3>Job ID:</h3></label>
                                <input type='text' id='jobID' name='jobID' value={jobId} readOnly />
                            </div>

                            <div>
                                <label htmlFor='custID'><h3>Client ID:</h3></label>
                                <input type='text' id='custID' name='custID' value={clientId} onChange={(e) => setClientId(e.target.value)} required />
                            </div>

                            <div>
                                <label htmlFor='techID'><h3>Technician ID:</h3></label>
                                <input type='text' id='techID' name='techID' value={technicianId} onChange={(e) => setTechnicianId(e.target.value)} required />
                            </div>

                            <div>
                                <label htmlFor='issueDescription'><h3>Issue Description:</h3></label>
                                <input type='text' id='issueDescription' name='issueDescription' value={issueDescription} onChange={(e) => setIssueDescription(e.target.value)} required />
                            </div>

                            <div>
                                <label htmlFor='priority'><h3>Priority:</h3></label>
                                <input type='text' id='priority' name='priority' value={priority} onChange={(e) => setPriority(e.target.value)} required />
                            </div>

                            <div>
                                <label htmlFor='status'><h3>Status:</h3></label>
                                <input type='text' id='status' name='status' value={status} onChange={(e) => setStatus(e.target.value)} required />
                            </div>

                            <div>
                                <label htmlFor='assignedDate'><h3>Assigned Date:</h3></label>
                                <input type='date' id='assignedDate' name='assignedDate' value={assignedDate} onChange={(e) => setAssignedDate(e.target.value)} required />
                            </div>

                            <div>
                                <label htmlFor='resolutionDate'><h3>Resolution Date:</h3></label>
                                <input type='date' id='resolutionDate' name='resolutionDate' value={resolutionDate} onChange={(e) => setResolutionDate(e.target.value)} />
                            </div>

                            <div className='button-group'>
                                <button type="submit"><h3>Update</h3></button>
                            </div>
                        </form>
                        {message && <div className="message">{message}</div>}
                    </div>
                </div>

                <div className='field-bottom'>
                    <ScheduledJobs />
                </div>
            </div>
        </div>
    );
}

export default FieldService;
