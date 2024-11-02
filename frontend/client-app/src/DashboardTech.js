import React, { useState } from 'react';
import './styling/App.css';
import logo from './images/finalLogo.png';
import ServiceDesk from './pages/ServiceDesk';
import FieldService from './pages/FieldService';

function DashboardTech() {
  const [currentPage, setCurrentPage] = useState('dashboard');

  const renderComponent = () => {
    switch (currentPage) {
      case 'serviceDesk':
        return <ServiceDesk />;
      case 'fieldService':
        return <FieldService />;
      default:
        return (
          <div>
            <header>
            
            <h1>Technician Dashboard</h1>
            </header>
            
            <div className="dashboard-container">
                <img className="logo"
                    src={logo} 
                    alt="Logo" 
                />

                <div className="button-group">
                  <button onClick={() => setCurrentPage('serviceDesk')}>
                    <h2>Service Desk</h2>
                  </button>
                  <button onClick={() => setCurrentPage('fieldService')}>
                    <h2>Field Service Management</h2>
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

export default DashboardTech;
