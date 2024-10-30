import React, { useState } from 'react';
import './styling/App.css';
import logo from './images/finalLogo.png';
import AppCurrent from './AppCurrent'; 
import AppPast from './AppPast';
import ServiceDesk from './pages/ServiceDesk';
import ClientManagement from './pages/ClientManagement';
import FieldService from './pages/FieldService';
import CustomerSatisfaction from './pages/CustomerSatisfaction';

function Dashboard() {
  const [currentPage, setCurrentPage] = useState('dashboard');

  const renderComponent = () => {
    switch (currentPage) {
      case 'appCurrent':
        return <AppCurrent />;
      case 'appPast':
        return <AppPast />;
      case 'serviceDesk':
        return <ServiceDesk />;
      case 'clientManagement':
        return <ClientManagement />;
      case 'fieldService':
        return <FieldService />;
      case 'customerSatisfaction':
        return <CustomerSatisfaction />;
      default:
        return (
          <div>
            <header>
            
            <h1>Dashboard</h1>
            </header>
            
            <div className="dashboard-container">
                <img className="logo"
                    src={logo} 
                    alt="Logo" 
                />
                <div className="button-group">
                  <button onClick={() => setCurrentPage('appCurrent')}>
                    <h2>Service Requests</h2>
                  </button>
                  <button onClick={() => setCurrentPage('appPast')}>
                    <h2>Service Request History</h2>
                  </button>
                </div>

                <div className="button-group">
                  <button onClick={() => setCurrentPage('serviceDesk')}>
                    <h2>Service Desk</h2>
                  </button>
                  <button onClick={() => setCurrentPage('clientManagement')}>
                    <h2>Client Management</h2>
                  </button>
                </div>

                <div className="button-group">
                  <button onClick={() => setCurrentPage('fieldService')}>
                    <h2>Field Service Management</h2>
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
      {renderComponent()} {/* This will display the appropriate component */}
    </div>
  );
}

export default Dashboard;
