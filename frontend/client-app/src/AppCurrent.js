import React from 'react';
import ServiceRequestsTable from './ServiceRequestsTable'; 
import './styling/App.css';
import arrow from './images/arrow.png';

function AppCurrent() {
  const goToDashboard = () => {
    window.location.href = './';
  };

  return (
    <div className="App">
      <header className='nav'>
        <button onClick={goToDashboard} className="dashboard-button">
        <img
          src={arrow}
          alt="Arrow"
          width="50"
          height="50"
          backgroundColor="white"
        />
        </button>
        <h1>Service Requests</h1>
      </header>
      <ServiceRequestsTable />  
    </div>
  );
}

export default AppCurrent;