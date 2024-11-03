import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styling/Login.css';
import logo from '../images/finalLogo.png';
import arrow from '../images/arrow.png';

function Login({ accountType }) {
  const goToDashboard = () => {
    window.location.href = '/';
  };

  const [formData, setFormData] = useState({
    email: '',  
    password: '',
  });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const navigate = useNavigate();

  const GoToSignup = () => {
    navigate('/signup');
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        email: formData.email, 
        password: formData.password,
        isTechnician: accountType === 'technician',
      };

      const response = await axios.post('https://localhost:7031/api/auth/login', payload);
      if (response.data) { 
        setSuccessMessage('Login successful!'); 
        setIsLoggedIn(true); 
        
        // Redirect based on account type
        if (accountType === 'technician') {
          navigate('/dashboardTech'); 
        } else {
          navigate('/dashboardClient'); 
        }
      } else {
        setError('Login failed. Please check your email and password.');
        document.querySelectorAll('.login-input').forEach(input => input.style.border = "2px solid red");
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
    }
  };

  return (
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
        <h1>Login</h1>
      </header>
      <form id='login-form' onSubmit={handleSubmit}>
        <img id="logo" src={logo} alt="Logo" />
        
        <input
          className='login-input'
          name="email" 
          placeholder="Email" 
          onChange={handleChange}
        />
        <input
          className='login-input'
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
        />
        
        <button id='login-button' type="submit">Log In</button>
        <button id='login-signup-button' type="button" onClick={GoToSignup}>Sign Up</button>
      </form>
      {error && <p className="error">{error}</p>}
      {successMessage && <p className="success">{successMessage}</p>}
    </div>
  );
}

export default Login;
