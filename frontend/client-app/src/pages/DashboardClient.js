import React, { useState } from 'react';
import '../styling/App.css';
import logo from '../images/finalLogo.png';
import arrow from '../images/arrow.png';
import ClientManagement from './ClientManagement';
import CustomerSatisfaction from './CustomerSatisfaction';

function DashboardClient() {
  const goToDashboard = () => {
    window.location.href = '/';
  };

  const [currentPage, setCurrentPage] = useState('dashboard');

  const renderComponent = () => {
    switch (currentPage) {
      case 'clientManagement':
        return <ClientManagement />;
      case 'customerSatisfaction':
        return <CustomerSatisfaction />;
      default:
        return (
          <div className='App'>
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
              <h1>Client Dashboard</h1>
            </header>
            
            <div className="dashboard-container">
                <img className="logo"
                    src={logo} 
                    alt="Logo" 
                />

                <div className="button-group">
                  <button onClick={() => setCurrentPage('clientManagement')}>
                    <h2>Client Management</h2>
                  </button>
                  <button onClick={() => setCurrentPage('customerSatisfaction')}>
                    <h2>Customer Satisfaction</h2>
                  </button>
                </div>

            </div>
          </div>

          
        );
    }
  };

  return (
    <div className="App">
      {renderComponent()}
    </div>
  );
}

export default DashboardClient;
