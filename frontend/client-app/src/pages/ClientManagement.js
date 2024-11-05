import React, { useState } from 'react';
import axios from 'axios';
import '../styling/App.css';
import arrow from '../images/arrow.png';
import ContractsTable from '../tables/ContractsTable';
import ClientDetails from '../tables/ClientDetails';
import ContractTypeButtons from '../components/ContractTypeButtons';
import ContractStatusButtons from '../components/ContractStatusButtons';

function ClientManagement() {
  const [selectedContractType, setSelectedContractType] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [selectedContractId, setSelectedContractId] = useState(null);
  const [selectedServiceLevel, setSelectedServiceLevel] = useState(null);
  const [isActive, setIsActive] = useState(null);
  const [refreshContracts, setRefreshContracts] = useState(false); // New state for refresh

  const goToDashboard = () => {
    window.location.href = './dashboardClient';
  };

  const handleContractSelect = (contract) => {
    setSelectedContractId(contract.contractId);
    setSelectedServiceLevel(contract.serviceLevel);
    setIsActive(contract.isActive);
    setSelectedContractType(contract.serviceLevel.toLowerCase());
    setSelectedStatus(contract.isActive ? 'active' : 'canceled');
  };

  const fetchContracts = () => {
    setRefreshContracts(prev => !prev); // Toggle the refresh state
  };

  const handleSaveChanges = async () => {
    if (!selectedContractId) return;

    const isActiveValue = selectedStatus === 'active';
    const requestBody = [
      {
        op: "replace",
        path: "/ServiceLevel",
        value: selectedContractType
      },
      {
        op: "replace",
        path: "/IsActive",
        value: isActiveValue
      }
    ];

    try {
      const response = await axios.patch(`https://localhost:7031/api/Data/contracts/${selectedContractId}`, requestBody, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log('Update successful:', response.data);
      fetchContracts(); // Call the function to refresh contracts after successful update
    } catch (error) {
      console.error('Error updating contract:', error);
    }
  };

  return (
    <div>
      <div className="App">
        <header className='nav'>
          <button onClick={goToDashboard} className="dashboard-button">
            <img src={arrow} alt="Arrow" width="50" height="50" />
          </button>
          <h1>Client Management</h1>
        </header>
      </div>

      <main>
        <div className="field-top-client-management">
          <h2 id='contractsHeading'>Select From Contract List</h2>
          <div>
            <ContractsTable onContractSelect={handleContractSelect} refreshContracts={refreshContracts} /> {/* Pass refresh state */}
          </div>
        </div>

        <div className='field-middle-client-management'>
          <h2 id='contractsHeading'>Selected Client Details</h2>
          <div>
            <ClientDetails />
          </div>
        </div>

        {selectedContractId && (
          <div className='field-bottom-client-management'>
            <h2>Update Details</h2>
            <hr className='line-break' />
            <div className="left-right">
              <div className='bottom-left'>
                <h2 id='contractsHeading'>Change Contract Type</h2>
                <ContractTypeButtons 
                  setSelectedContractType={setSelectedContractType} 
                  selectedServiceLevel={selectedServiceLevel}
                  currentSelected={selectedContractType} 
                />
              </div>
              <div className='bottom-right'>
                <h2 id='contractsHeading'>Change Contract Status</h2>
                <ContractStatusButtons 
                  setSelectedStatus={setSelectedStatus} 
                  currentSelected={selectedStatus}
                />
              </div>
            </div>

            <hr className='line-break' />

            <div className='button-group'>
              <button onClick={handleSaveChanges}><h3>Save Changes</h3></button>
            </div>
          </div>
        )}

        <div className='test-div'>
          {/* <h3>Selected Contract ID: {selectedContractId || 'None'}</h3>
          <h3>Selected Contract Type: {selectedContractType || 'None'}</h3>
          <h3>Selected Contract Status: {selectedStatus || 'None'}</h3>
          <h3>Service Level: {selectedServiceLevel || 'None'}</h3>
          <h3>Is Active: {isActive !== null ? (isActive ? 'Yes' : 'No') : 'None'}</h3> */}
        </div>
      </main>
    </div>
  );
}

export default ClientManagement;
