import React from 'react';
import '../styling/App.css';
import arrow from '../images/arrow.png';
import ContractsTable from '../tables/ContractsTable';
import ActiveContractDetails from '../tables/ActiveContractDetails';
import ClientDetails from '../tables/ClientDetails';

function ClientManagement() {
  const goToDashboard = () => {
    window.location.href = './dashboardClient';
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

    <div className="field-container">
      <ClientDetails />
      
      <div className="field-top">
        <div className='field-top-left'>
          <ActiveContractDetails />
        </div>
        <div className='field-top-right'>
          <ContractsTable />        
        </div>
      </div>
    </div>
  </div>
  );
}

export default ClientManagement;
