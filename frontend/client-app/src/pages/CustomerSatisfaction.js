import React from 'react';
import '../styling/App.css';
import arrow from '../images/arrow.png';

function CustomerSatisfaction() {
  const goToDashboard = () => {
    window.location.href = './';
  };

  return (
    <div className="CustomerSatisfaction">
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
        <h1>Customer Satisfaction</h1>
      </header> 

      <div className='survey'>
        <h2>Feedback Survey</h2>
        <form className='container'>
          <label for='name'><h3>Name:</h3></label>
          <input type='text' id='name' name='name' required></input>

          <label for='surname'><h3>Surname:</h3></label>
          <input type='text' id='surname' name='surname' required></input>

          <label for='email'><h3>Email:</h3></label>
          <input type='email' id='email' name='email' required></input>

          <label for='rating'><h3>Professionalism:</h3></label>
         
          <label for='rating'><h3>Timeliness:</h3></label>

          <label for='rating'><h3>Overall Satisfaction:</h3></label>
         
          <label for='comment'><h3>Additional Feedback:</h3></label>
          <textarea id='comment' name='comment' required></textarea>

          <div className='button-group'>
            <button><h3>Reset</h3></button>
            <button type='submit'><h3>Submit</h3></button>
          </div>

        </form>
      </div>
      
    </div>
  );
}

export default CustomerSatisfaction;