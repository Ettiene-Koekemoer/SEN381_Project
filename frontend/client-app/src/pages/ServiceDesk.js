import React, { useEffect, useState } from 'react';
import '../styling/App.css';
import arrow from '../images/arrow.png';
import IssueList from '../tables/IssueList';
import PriorityButtons from '../components/PriorityButtons';

function ServiceDesk() {
    const [selectedIssue, setSelectedIssue] = useState(null);
    const [technicians, setTechnicians] = useState([]);
    const [selectedPriority, setSelectedPriority] = useState(null);
    const [selectedTechnicianId, setSelectedTechnicianId] = useState(null);
    const [message, setMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [clientId, setClientId] = useState(null);
    const [refresh, setRefresh] = useState(false);

    const goToDashboard = () => {
        window.location.href = '/dashboardTech';
    };

    const handleSelectIssue = (issue) => {
        setSelectedIssue(issue);
        setClientId(issue.clientId);
        setSelectedPriority(issue.priority); // Set the priority when an issue is selected
    };

    const handleMessageChange = (event) => {
        setMessage(event.target.value);
    };

    const handleTechnicianChange = (event) => {
        setSelectedTechnicianId(event.target.value);
    };

    const handleAssignTechnician = async () => {
        if (!selectedIssue || !selectedTechnicianId || !selectedPriority) {
            setErrorMessage('Please select an issue, technician, and priority before assigning.');
            return;
        }

        const patchDocument = [
            { op: "replace", path: "/technicianId", value: selectedTechnicianId },
            { op: "replace", path: "/priority", value: selectedPriority }
        ];

        try {
            const response = await fetch(`https://localhost:7031/api/Data/serviceRequests/${selectedIssue.serviceRequestId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(patchDocument),
            });

            if (response.ok) {
                // Clear error and refresh UI
                setErrorMessage('');
                setRefresh(prev => !prev);
                setSelectedTechnicianId(null);
                setSelectedPriority(null);
                setMessage('');
                setClientId(selectedIssue.clientId);
                setSelectedIssue(null); // Reset selected issue to indicate none is selected

                // Send SMS if a message is provided
                if (message.trim()) {
                    await sendMessage();
                }
            } else {
                const errorMessage = await response.text();
                setErrorMessage(`Error assigning technician: ${errorMessage}`);
            }
        } catch (error) {
            console.error('Error during technician assignment:', error);
            setErrorMessage('An error occurred while assigning the technician. Please try again.');
        }
    };

    const sendMessage = async () => {
        try {
            const smsUrl = `https://localhost:7031/api/SMS/send-sms?phoneNumber=${selectedIssue.clientPhone}&message=${encodeURIComponent(message)}`;
            const smsResponse = await fetch(smsUrl, {
                method: 'POST',
            });

            if (!smsResponse.ok) {
                console.error('Failed to send SMS:', await smsResponse.text());
            }
        } catch (error) {
            console.error('Error sending SMS:', error);
        }
    };

    const fetchTechnicians = async () => {
        try {
            const response = await fetch('https://localhost:7031/api/Data/technicians');
            const data = await response.json();
            setTechnicians(data);
        } catch (error) {
            console.error('Error fetching technicians:', error);
        }
    };

    useEffect(() => {
        fetchTechnicians();
    }, []);

    return (
        <div className="App">
            <header className='nav'>
                <button onClick={goToDashboard} className="dashboard-button">
                    <img src={arrow} alt="Arrow" width="50" height="50" />
                </button>
                <h1>Service Desk</h1>
            </header>

            <main>
                <div className='field-issue-list'>
                    <h1>Select From Issue List</h1>
                    <IssueList onSelectIssue={handleSelectIssue} refresh={refresh} />
                </div>

                <div className='field-top-middle'>
                    <h1>Issue Summary</h1>
                    <div className='contents'>
                        <div className='middle-left'>
                            {selectedIssue ? (
                                <table border="1">
                                    <thead>
                                        <tr>
                                            <th>Client Name</th>
                                            <th>Date Reported</th>
                                            <th>Client Phone</th>
                                            <th>Client Email</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{selectedIssue.clientName}</td>
                                            <td>{new Date(selectedIssue.assignedDate).toLocaleDateString()}</td>
                                            <td>{selectedIssue.clientPhone}</td>
                                            <td>{selectedIssue.clientEmail}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            ) : (
                                <h2>No issue selected</h2>
                            )}
                        </div>
                        
                        <div className='issue-buttons'>
                            Change Issue Priority
                            <PriorityButtons 
                                setSelectedPriority={setSelectedPriority} 
                                initialPriority={selectedIssue ? selectedIssue.priority : null} 
                            />
                        </div>
                    </div>
                </div>

                {selectedIssue && (
                    <div className='field-bottom-middle'>
                        <h1>Assign Technician</h1>
                        <div className='contents'>
                            <div className='bottom-left'>
                                <h2>Message</h2>
                                <textarea
                                    rows="4"
                                    cols="50"
                                    placeholder="Enter message to Client here..."
                                    value={message}
                                    onChange={handleMessageChange}
                                ></textarea>
                            </div>

                            <div className='bottom-right'>
                                <h2>Select Technician</h2>
                                <select id="technician-select" onChange={handleTechnicianChange} value={selectedTechnicianId || ''}>
                                    <option value="" disabled>Select Technician</option>
                                    {technicians.map(technician => (
                                        <option key={technician.technicianId} value={technician.technicianId}>
                                            {technician.name} - {technician.skillSet} ({technician.availabilityStatus})
                                        </option>
                                    ))}
                                </select>
                                <div className='button-group'>
                                    <button onClick={handleAssignTechnician}>
                                        <h3>Assign to Technician</h3>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <div id='test-div'>
                    {selectedIssue && (
                        <>
                            {/* <p>Selected Issue ID: {selectedIssue.serviceRequestId}</p>
                            <p>Selected Client ID: {clientId}</p>
                            <p>Client Phone Number: {selectedIssue.clientPhone}</p>
                            <p>Button Priority: {selectedPriority || 'None'}</p>
                            <p>Issue Priority: {selectedIssue.priority}</p>
                            <p>Selected Technician ID: {selectedTechnicianId}</p> */}
                            <p> {message}</p>
                        </>
                    )}
                    {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                </div>
            </main>
        </div>
    );
}

export default ServiceDesk;
