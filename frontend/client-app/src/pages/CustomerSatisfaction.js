import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
  const [serviceRequestId, setServiceRequestId] = useState(0);
  const [clientId, setClientId] = useState(0); // Store the fetched client ID

  const goToDashboard = () => {
    window.location.href = './dashboardClient';
  };

  // Fetch ClientId based on client name and surname
  const fetchClientId = async () => {
    try {
      const fullName = `${name} ${surname}`;
      const response = await axios.get(`https://localhost:7031/api/data/serviceRequests/search?name=${encodeURIComponent(fullName)}&serviceRequestId=${serviceRequestId}`);
      const id = response.data[0].clientId;
      
      if (id) {
        setClientId(Number(id)); // Set the client ID based on fetched data
      } else {
        alert('Client not found.');
      }
    } catch (error) {
      console.error('Error fetching client ID:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!serviceRequestId || !clientId) {
      alert("Please enter valid client details and service request ID.");
      //return;
    }
  
    const averageRating = Math.round((professionalismRating + timelinessRating + satisfactionRating) / 3);
    if (averageRating < 1 || averageRating > 5) {
      alert("Rating must be between 1 and 5.");
      return;
    }
      
    const payload = {
      FeedbackId: 0,
      ClientId: clientId,
      ServiceRequestId: parseInt(serviceRequestId, 10),
      Rating: averageRating,
      Comments: comment,
      DateProvided: new Date().toISOString().split('T')[0]
    };
  
    try {
      const response = await axios.post('https://localhost:7031/api/data/feedback', payload);
      alert('Your feedback has been submitted.');
      
      // Reset form
      setProfessionalismRating(0);
      setTimelinessRating(0);
      setSatisfactionRating(0);
      setName('');
      setSurname('');
      setEmail('');
      setComment('');
      setServiceRequestId(0);
      setClientId(0); 
    } catch (error) {
      console.error('Error submitting feedback:', error);
      alert(`Error submitting feedback: ${error.response?.data?.message || error.message}`);
    }
  };  

  useEffect(() => {
    if (name && surname) {
      fetchClientId();
    }
  }, [name, surname]);

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

          <label htmlFor='serviceRequestId'><h3>Service Request ID:</h3></label>
          <input
            type='text'
            id='serviceRequestId'
            name='serviceRequestId'
            value={serviceRequestId || ''}
            onChange={(e) => setServiceRequestId(e.target.value)}
            required
          />

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
              setServiceRequestId(null);
              setClientId(null); // Reset the client ID
            }}><h3>Reset</h3></button>
            <button id="right" type='submit'><h3>Submit</h3></button>
          </div>

        </form>
      </div>
      
    </div>
  );
}

export default CustomerSatisfaction;
