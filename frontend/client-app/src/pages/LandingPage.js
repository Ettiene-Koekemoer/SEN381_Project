import React, { useState } from 'react';
import '../styling/App.css';
import logo from '../images/finalLogo.png';
import Login from './Login'; // Import the Login component

function LandingPage() {

  const [currentPage, setCurrentPage] = useState('landingpage');
  const [accountType, setAccountType] = useState(null); // State to store selected account type

  const handleAccountSelection = (type) => {
    setAccountType(type);
    setCurrentPage('login'); // Set to login page after account selection
  };

  const renderComponent = () => {
    switch (currentPage) {
      case 'login':
        return <Login accountType={accountType} />; // Pass accountType as a prop to Login
      default:
        return (
          <div className='App'>
            <header className='nav'>
              <h1>Welcome</h1>
            </header>

            <div className="dashboard-container">
              <img className="logo" src={logo} alt="Logo" />
              <h2>Please Select Your Account Type</h2>
              <div className="button-group">
                <button onClick={() => handleAccountSelection('technician')}>
                  <h2>Technician</h2>
                </button>
                <button onClick={() => handleAccountSelection('client')}>
                  <h2>Client</h2>
                </button>
              </div>
            </div>
          </div>
        );
    }
  };

  return <div className="App">{renderComponent()}</div>;
}

export default LandingPage;
