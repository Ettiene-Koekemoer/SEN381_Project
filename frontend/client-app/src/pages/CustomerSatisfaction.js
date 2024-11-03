import React, { useState, useEffect } from 'react';
import '../styling/App.css';
import arrow from '../images/arrow.png';
import StarRating from '../StarRating';

function CustomerSatisfaction() {

  const [professionalismRating, setProfessionalismRating] = useState(0);
  const [timelinessRating, setTimelinessRating] = useState(0);
  const [satisfactionRating, setSatisfactionRating] = useState(0);

  const goToDashboard = () => {
    window.location.href = './dashboardClient';
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
          <div className="name-surname-container">
            <div>
              <label htmlFor='name'><h3>Name:</h3></label>
              <input type='text' id='name' name='name' required />
            </div>
            <div>
              <label htmlFor='surname'><h3>Surname:</h3></label>
              <input type='text' id='surname' name='surname' required />
            </div>
          </div>

          <label for='email'><h3>Email:</h3></label>
          <input type='email' id='email' name='email' required></input>

          <label><h3>Professionalism:</h3></label>
            <div className="star-rating-wrapper">
              <StarRating rating={professionalismRating} setRating={setProfessionalismRating} />
            </div>
          
          <label><h3>Timeliness:</h3></label>
            <div className="star-rating-wrapper">
              <StarRating rating={timelinessRating} setRating={setTimelinessRating} />
            </div>

          <label><h3>Overall Satisfaction:</h3></label>
            <div className="star-rating-wrapper">
              <StarRating rating={satisfactionRating} setRating={setSatisfactionRating} />
            </div>

          <label for='comment'><h3>Additional Feedback:</h3></label>
          <textarea id='comment' name='comment' required></textarea>

          <div className='button-group'>
          <button id="left" type="button" onClick={() => {
            setProfessionalismRating(0);
            setTimelinessRating(0);
            setSatisfactionRating(0);
          }}><h3>Reset</h3></button>
            <button id="right" type='submit'><h3>Submit</h3></button>
          </div>

        </form>
      </div>
      
    </div>
  );
}

export default CustomerSatisfaction;