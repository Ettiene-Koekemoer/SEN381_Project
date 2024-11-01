import React from 'react';
import '../styling/App.css';
import arrow from '../images/arrow.png';

function FieldService() {
  const goToDashboard = () => {
    window.location.href = './';
  };

  return (
    <div className="FieldService">
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
        <h1>Field Service Management</h1>
      </header> 

      <div className="field-container">
        <h2 id='fieldServiceHeading'>Field Service Management Centre</h2>
        <div class="field-top">
          <div className='field-top-left'>
            <h2>Service Requests</h2>
            <table>
              <tbody>
                <tr>
                  <th>Request ID</th>
                  <th>Customer ID</th>
                  <th>Job ID</th>
                  <th>Description</th>
                  <th>Priority</th>
                </tr>
              </tbody>
            </table>
          </div>

          <div className='field-top-right'>
            <h2>Escalate or Reassign Service Request</h2>
            <form className='escalate-container'>
              <div>
                <label htmlFor='jobID'><h3>Job ID:</h3></label>
                <input type='text' id='jobID' name='jobID' required />
              </div>

              <div>
                <label htmlFor='custID'><h3>Customer ID:</h3></label>
                <input type='text' id='custID' name='custID' required />
              </div>

              <div>
                <label htmlFor='techID'><h3>Technician ID:</h3></label>
                <input type='text' id='techID' name='techID' required />
              </div>

              <div>
                <label htmlFor='priority'><h3>Priority:</h3></label>
                <input type='text' id='priority' name='priority' required />
              </div>

              <div>
                <label htmlFor='schedDate'><h3>Scheduled Date:</h3></label>
                <input type='date' id='schedDate' name='schedDate' required />
              </div>

              <div>
                <label htmlFor='compDate'><h3>Completion Date:</h3></label>
                <input type='date' id='compDate' name='compDate' required />
              </div>

              <div className='button-group'>
                <button><h3>Update</h3></button>
                <button><h3>Escalate</h3></button>
              </div>
            </form>
          </div>
        </div>

        <div className='field-bottom'>
          <h2>Scheduled Jobs</h2>
          <table>
            <tbody>
              <tr>
                <th>Job ID</th>
                <th>Technician ID</th>
                <th>Customer ID</th>
                <th>Scheduled Start Date</th>
                <th>Scheduled End Date</th>
                <th>Priority</th>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default FieldService;