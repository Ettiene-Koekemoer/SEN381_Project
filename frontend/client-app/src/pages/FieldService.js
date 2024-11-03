import React from 'react';
import '../styling/App.css';
import arrow from '../images/arrow.png';
import RequestsTable from '../tables/RequestsTable';

function FieldService() {
   const goToDashboard = () => {
    window.location.href = '/dashboardTech';
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
            <RequestsTable/>
          </div>

          <div className='field-top-right'>
            <h2>Escalate or Reassign Service Request</h2>
            <form className='escalate-container'>
              <div>
                <label htmlFor='jobID'><h3>Job ID:</h3></label>
                <input type='text' id='jobID' name='jobID' required />
              </div>

              <div>
                <label htmlFor='custID'><h3>Client ID:</h3></label>
                <input type='text' name='custID' required />
              </div>

              <div>
                <label htmlFor='techID'><h3>Technician ID:</h3></label>
                <input type='text' id='techID' name='techID' required />
              </div>

              <div>
                <label htmlFor='issueDescription'><h3>Issue Description:</h3></label>
                <input type='text' id='issueDescription' name='issueDescription' required />
              </div>

              <div>
                <label htmlFor='priority'><h3>Priority:</h3></label>
                <input type='text' id='priority' name='priority' required />
              </div>

              <div>
                <label htmlFor='status'><h3>Status:</h3></label>
                <input type='text' id='status' name='status' required />
              </div>

              <div>
                <label htmlFor='assignedDate'><h3>Assigned Date:</h3></label>
                <input type='date' id='assignedDate' name='assignedDate' required />
              </div>

              <div>
                <label htmlFor='resolutionDate'><h3>Resolution Date:</h3></label>
                <input type='date' id='resolutionDate' name='resolutionDate' required />
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
