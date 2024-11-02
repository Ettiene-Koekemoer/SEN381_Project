import React, { useState } from 'react';
import axios from 'axios';
import '../styling/SignUp.css';
import logo from '../images/finalLogo.png';
import { useNavigate } from 'react-router-dom';

function Signup() {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    
    name: '',
    surname: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('https://localhost:7031/api/auth/register', formData);
      const inputFields = document.getElementsByClassName('signup-input');
        

      for (let i = 0; i < inputFields.length; i++) {
          inputFields[i].style.border = "2px solid green"; 
      }
     
      GoToLogin();

     
    } catch (err) {
      setError(err.response.data.message || 'An error occurred');
    }
  };

  const GoToLogin = () => {
    navigate('/login');
  };

  return (
    <div className="signup-form">
      <header id='signup-header'>
      <h1>Sign Up</h1>
      </header>
      
      <form id='signup-form' onSubmit={handleSubmit}>
      <img id="logo"
                    src={logo} 
                    alt="Logo" 
                />
        
        
        <input className='signup-input' name="name" placeholder="Name" onChange={handleChange} />
        <input className='signup-input' name="surname" placeholder="Surname" onChange={handleChange} />
        <input className='signup-input' name="password" type="password" placeholder="Password" onChange={handleChange} />
        <input className='signup-input' name="confirmPassword" type="password" placeholder="Confirm Password" onChange={handleChange} />
        <button id='signup-button' type="submit">Create Account</button>
        <button id='signup-login-button' type="submit">Or Log In</button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default Signup;
