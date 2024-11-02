import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styling/Login.css';
import logo from '../images/finalLogo.png';

function Login() {
  const [formData, setFormData] = useState({
    userId: '',
    password: '',
    isTechnician: true, // Default to technician
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

  const toggleUserType = () => {
    setFormData({ ...formData, isTechnician: !formData.isTechnician });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://localhost:7031/api/auth/login', formData);
      if (response.data) { 
        setSuccessMessage('Login successful!'); 
        setIsLoggedIn(true); 
        // Redirect based on user type
        if (formData.isTechnician) {
          navigate('/dashboard-tech'); // Redirect to Technician Dashboard
        } else {
          navigate('/dashboard-client'); // Redirect to Client Dashboard
        }
      } else {
        setError('Login failed. Please check your ID and password.');
        const inputFields = document.getElementsByClassName('login-input');
        for (let i = 0; i < inputFields.length; i++) {
            inputFields[i].style.border = "2px solid red"; 
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <div className="login-form">
      <header id='login-header'>
        <h1 id='login-heading'>Login</h1>
      </header>
      <form id='login-form' onSubmit={handleSubmit}>
        <img id="logo" src={logo} alt="Logo" />
        
        <div className="user-type-toggle">
          <button type="button" onClick={toggleUserType}>
            {formData.isTechnician ? "Switch to Client" : "Switch to Technician"}
          </button>
          <p>Login as {formData.isTechnician ? "Technician" : "Client"}</p>
        </div>
        
        <input
          className='login-input'
          name="userId"
          placeholder={`${formData.isTechnician ? 'Technician' : 'Client'} ID`}
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
