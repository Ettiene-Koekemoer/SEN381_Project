import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styling/App.css';

const TechniciansTable = () => {
    const [technicians, setTechnicians] = useState([]);
    const [selectedTechnician, setSelectedTechnician] = useState(null);

    useEffect(() => {
        axios.get(`https://localhost:7031/api/data/technicians`)
            .then(response => {
                console.log(response.data);
                setTechnicians(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the technicians!', error);
            });
    }, []);

    const handleTechnicianClick = (technicianId) => {
        axios.get(`https://localhost:7031/api/data/technicians/${technicianId}`)
            .then(response => {
                setSelectedTechnician(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the technician details!', error);
            });
    };

    return (
        <div>
            <h2 id='techniciansHeading'>Technicians</h2>
            <table id='technicians'>
                <thead>
                    <tr>
                        <th>Technician ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Skill Set</th>
                        <th>Location</th>
                        <th>Availability Status</th>
                    </tr>
                </thead>
                <tbody>
                    {technicians.length > 0 ? (
                        technicians.map(technician => (
                            <tr key={technician.technicianId} onClick={() => handleTechnicianClick(technician.technicianId)}>
                                <td>{technician.technicianId}</td>
                                <td>{technician.name}</td>
                                <td>{technician.email}</td>
                                <td>{technician.skillSet}</td>
                                <td>{technician.location}</td>
                                <td>{technician.availabilityStatus}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4">No technicians available.</td>
                        </tr>
                    )}
                </tbody>
            </table>

        </div>
    );
};

export default TechniciansTable;
