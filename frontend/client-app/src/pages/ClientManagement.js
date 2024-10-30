import React from 'react';
import '../styling/App.css';
import arrow from '../images/arrow.png';

function ClientManagement() {
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
        <h1>Client Management</h1>
      </header> 
    </div>
  );
}

export default ClientManagement;