import React, { useState } from 'react';
import '../styling/App.css';
import arrow from '../images/arrow.png';
import StarRating from '../StarRating';

function CustomerSatisfaction() {
  const [professionalismRating, setProfessionalismRating] = useState(0);
  const [timelinessRating, setTimelinessRating] = useState(0);
  const [satisfactionRating, setSatisfactionRating] = useState(0);
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');

  const goToDashboard = () => {
    window.location.href = './dashboardClient';
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = `Name: ${name}\nSurname: ${surname}\nEmail: ${email}\nProfessionalism: ${professionalismRating}\nTimeliness: ${timelinessRating}\nSatisfaction: ${satisfactionRating}\nComment: ${comment}\n`;

    const fileName = `${name}${surname}_${email}.txt`;

    const blob = new Blob([data], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    alert('Your feedback has been submitted and the text file has been created.');

    setProfessionalismRating(0);
    setTimelinessRating(0);
    setSatisfactionRating(0);
    setName('');
    setSurname('');
    setEmail('');
    setComment('');
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
        <form className='container' onSubmit={handleSubmit}>
          <div className="name-surname-container">
            <div className="name-surname-input">
              <label htmlFor='name'><h3>Name:</h3></label>
              <input type='text' id='name' name='name' value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className="name-surname-input">
              <label htmlFor='surname'><h3>Surname:</h3></label>
              <input type='text' id='surname' name='surname' value={surname} onChange={(e) => setSurname(e.target.value)} required />
            </div>
          </div>

          <label htmlFor='email'><h3>Email:</h3></label>
          <input type='email' id='email' name='email' value={email} onChange={(e) => setEmail(e.target.value)} required />

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

          <label htmlFor='comment'><h3>Additional Feedback:</h3></label>
          <textarea id='comment' name='comment' value={comment} onChange={(e) => setComment(e.target.value)} required></textarea>

          <div className='button-group'>
            <button id="left" type="button" onClick={() => {
              setProfessionalismRating(0);
              setTimelinessRating(0);
              setSatisfactionRating(0);
              setName('');
              setSurname('');
              setEmail('');
              setComment('');
            }}><h3>Reset</h3></button>
            <button id="right" type='submit'><h3>Submit</h3></button>
          </div>

        </form>
      </div>
      
    </div>
  );
}

export default CustomerSatisfaction;
