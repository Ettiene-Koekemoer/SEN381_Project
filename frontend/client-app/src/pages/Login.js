import React, { useState } from 'react';
import axios from 'axios';
import Dashboard from '../Dashboard'; 
import '../styling/Login.css'
import logo from '../images/finalLogo.png';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [formData, setFormData] = useState({
    technicianId: '',
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
      const response = await axios.post('https://localhost:7031/api/auth/login', formData);
      if (response.data) { 
        setSuccessMessage('Login successful!'); 
        setIsLoggedIn(true); 
      } else {
        setError('Login failed. Please check your Technician ID and password.');

        const inputFields = document.getElementsByClassName('login-input');
        

        for (let i = 0; i < inputFields.length; i++) {
            inputFields[i].style.border = "2px solid red"; 
        }

        
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
    }
  };

  if (isLoggedIn) {
    return <Dashboard />; 
  }

  return (
    
    <div className="login-form">
        <header id='login-header'>
        <h1 id='login-heading'>Login</h1>
        </header>
    
      <form id='login-form' onSubmit={handleSubmit}>
      <img id="logo"
                    src={logo} 
                    alt="Logo" 
                />
        <input className='login-input' name="technicianId" placeholder="Technician ID" onChange={handleChange} />
        <input className='login-input' name="password" type="password" placeholder="Password" onChange={handleChange} />

      
        
        <button id='login-button' type="submit">Log In</button>
        <button id='login-signup-button' type="submit" onClick={GoToSignup}>Sign Up</button>
      </form>
      {error && <p className="error">{error}</p>}
      {successMessage && <p className="success">{successMessage}</p>}
    </div>
  );
}

export default Login;
