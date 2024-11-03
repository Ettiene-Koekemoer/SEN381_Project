import React from 'react';
import '../styling/App.css';
import arrow from '../images/arrow.png';

function ClientManagement() {
  const goToDashboard = () => {
    window.location.href = './dashboardClient';
  };

  return (
  <div>
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

    <label for='searchID' class='searchLabel'>ID:</label>
    <input type='text' name='searchID' class='searchID' placeholder='Enter ID to search client'></input>
    <button type='submit' class='searchButton'>Search ID</button><br/>

    <h4>Name</h4><h4>Surname</h4><br/>
    <h4>Email: xxx</h4><h4>Phone number: xxx</h4><h4>Address: xxx</h4><br/>
    <div className='activeContract'>
    <h3>Active Contracts</h3>
    <table>
      <tr>
        <th>Request ID</th>
        <th>Job ID</th>
        <th>Completion Date</th>
      </tr>
      <tr>
        <td>NP026</td>
        <td>A7</td>
        <td>2025/01/01</td>
      </tr>
    </table>
    </div>

    <div className='contractHistory'>
    <h3>Contract History</h3>
    <table>
      <tr>
        <th>Request ID</th>
        <th>Job ID</th>
        <th>Description</th>
        <th>Completion date</th>
        <th>Average service rating</th>
      </tr>
      <tr>
        <td>NP020</td>
        <td>A1</td>
        <td>Repair cracked windshield on vehicle.</td>
        <td>2020/10/20</td>
        <td>4.5</td>
      </tr>
    </table>
    </div>
  </div>
  );
}

export default ClientManagement;
