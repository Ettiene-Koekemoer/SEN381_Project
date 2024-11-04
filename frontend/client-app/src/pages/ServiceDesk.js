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
    const [errorMessage, setErrorMessage] = useState(''); // State for error messages
    const [clientId, setClientId] = useState(null); // New state for client ID

    const goToDashboard = () => {
        window.location.href = '/dashboardTech';
    };

    const handleSelectIssue = (issue) => {
        setSelectedIssue(issue);
        setClientId(issue.clientId); // Update client ID directly from the selected issue
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

        // Wrap the patch operations in an object
        const patchDocument = {
            patchDocument: [
                { op: "replace", path: "/technicianId", value: selectedTechnicianId },
                { op: "replace", path: "/priority", value: selectedPriority }
            ]
        };

        try {
            const response = await fetch(`https://localhost:7031/api/Data/serviceRequests/${selectedIssue.serviceRequestId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(patchDocument),
            });

            if (response.ok) {
                setErrorMessage(''); // Clear any previous error messages
                alert('Technician assigned successfully!');
                // Optionally, you can refresh the issue list or the current issue details
            } else {
                const errorMessage = await response.text();
                setErrorMessage(`Error assigning technician: ${errorMessage}`);
            }
        } catch (error) {
            console.error('Error during technician assignment:', error);
            setErrorMessage('An error occurred while assigning the technician. Please try again.');
        }
    };

    useEffect(() => {
        const fetchTechnicians = async () => {
            try {
                const response = await fetch('https://localhost:7031/api/Data/technicians');
                const data = await response.json();
                setTechnicians(data);
            } catch (error) {
                console.error('Error fetching technicians:', error);
            }
        };

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
                    <IssueList onSelectIssue={handleSelectIssue} />
                </div>

                {selectedIssue && (
                    <>
                        <div className='field-top-middle'>
                            <h1>Issue Summary</h1>
                            <div className='contents'>
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
                                <div className='issue-buttons'>
                                    Change Issue Priority
                                    <PriorityButtons setSelectedPriority={setSelectedPriority} />
                                </div>
                            </div>
                        </div>

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
                                        <option value="" disabled>Select Technician</option> {/* Default prompt option */}
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

                        <div id='test-div'>
                            <p>Selected Issue ID: {selectedIssue.serviceRequestId}</p>
                            <p>Selected Client ID: {clientId}</p> {/* Display selected client ID */}
                            <p>Client Phone Number: {selectedIssue.clientPhone}</p> {/* Display client phone number */}
                            <p>Selected Priority: {selectedPriority || selectedIssue.priority}</p>
                            <p>Selected Technician ID: {selectedTechnicianId}</p>
                            <p>Message: {message}</p> {/* Display the message from the textarea */}
                            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>} {/* Display error message if it exists */}
                        </div>
                    </>
                )}
            </main>
        </div>
    );
}

export default ServiceDesk;
