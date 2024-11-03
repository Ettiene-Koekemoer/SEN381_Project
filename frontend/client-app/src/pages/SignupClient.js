import React, { useState } from "react";
import axios from "axios";
import '../styling/SignUp.css';
import logo from '../images/finalLogo.png';
import arrow from '../images/arrow.png';
import { useNavigate } from "react-router-dom";

const SignupClient = () => {
  const goToDashboard = () => {
    window.location.href = '/dashboardClient';
  };

  const [client, setClient] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    confirmPassword: ""
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClient((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (client.password !== client.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await axios.post("https://localhost:7031/api/auth/register/client", client);
      if (response.status === 201) {
        setSuccess(true);
        setError("");
        setClient({
          name: "",
          email: "",
          phone: "",
          address: "",
          password: "",
          confirmPassword: ""
        });
        navigate('/login'); // Redirect to login after successful signup
      }
    } catch (error) {
      setError("An error occurred during registration. Please try again.");
    }
  };

  return (
    <div className="App">
      <header className="nav">
        <button onClick={goToDashboard} className="dashboard-button">
          <img src={arrow} alt="Arrow" width="50" height="50" backgroundColor="white" />
        </button>
        <h1>Client Signup</h1>
      </header>
      
      <form onSubmit={handleSubmit} id="signup-form">
        <img id="logo" src={logo} alt="Logo" />
        <h2 id="client-subheading">Enter New Client Details</h2>

        <div id="input-container">
          <div id="input-one"> 
            <input className="signup-input" type="text" name="name" value={client.name} onChange={handleChange} required placeholder="Name" />
          </div>
          <div id="input-two">
            <input className="signup-input" type="email" name="email" placeholder="Email" value={client.email} onChange={handleChange} required />
          </div>
          <div id="input-three">
            <input className="signup-input" type="text" name="phone" placeholder="Phone" value={client.phone} onChange={handleChange} required />
          </div>
          <div id="input-four">
            <input className="signup-input" type="text" name="address" placeholder="Address" value={client.address} onChange={handleChange} required />
          </div>
          <div id="input-five">
            <input className="signup-input" type="password" name="password" placeholder="Password" value={client.password} onChange={handleChange} required />
          </div>
          <div id="input-six">
            <input className="signup-input" type="password" name="confirmPassword" placeholder="Confirm Password" value={client.confirmPassword} onChange={handleChange} required />
          </div>
        </div>
        
        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && <p className="success-message" style={{ color: "green" }}>Registration successful!</p>}
        
        <button id="signup-button" type="submit">Register</button>
      </form>
    </div>
  );
};

export default SignupClient;
