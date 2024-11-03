import React, { useState } from "react";
import axios from "axios";
import '../styling/SignUp.css';
import logo from '../images/finalLogo.png';
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [technician, setTechnician] = useState({
    name: "",
    skillSet: "",
    location: "",
    availabilityStatus: "",
    password: "",
    confirmPassword: ""
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTechnician((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (technician.password !== technician.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await axios.post("https://localhost:7031/api/auth/register", technician);
      if (response.status === 201) {
        setSuccess(true);
        setError("");
        setTechnician({
          name: "",
          skillSet: "",
          location: "",
          availabilityStatus: "",
          password: "",
          confirmPassword: ""
        });

        // Navigate to login page upon successful registration
        navigate('/login');
      }
    } catch (error) {
      setError("An error occurred during registration. Please try again.");
    }
  };

  return (
    <div>
      <header id="signup-header">
        <h1>Technician Signup</h1>
      </header>
      
      <form onSubmit={handleSubmit} id="signup-form">
        <img id="logo" src={logo} alt="Logo" />

        <h2 id="technician-subheading">Enter New Technician Details</h2>

        <div id="input-container">
          <div id="input-one"> 
            <input className="signup-input"
              type="text"
              name="name"
              value={technician.name}
              onChange={handleChange}
              required
              placeholder="Name"
            />
          </div>
          <div id="input-two">
            <input className="signup-input"
              type="text"
              name="skillSet"
              placeholder="Skill Set"
              value={technician.skillSet}
              onChange={handleChange}
            />
          </div>
          <div id="input-three">
            <input className="signup-input"
              type="text"
              name="location"
              placeholder="Location"
              value={technician.location}
              onChange={handleChange}
            />
          </div>
          <div id="input-four">
            <input className="signup-input"
              type="text"
              name="availabilityStatus"
              placeholder="Availability Status"
              value={technician.availabilityStatus}
              onChange={handleChange}
            />
          </div>
          <div id="input-five">
            <input className="signup-input"
              type="password"
              name="password"
              placeholder="Password"
              value={technician.password}
              onChange={handleChange}
              required
            />
          </div>
          <div id="input-six">
            <input className="signup-input"
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={technician.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        
        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && <p className="success-message" style={{ color: "green" }}>Registration successful!</p>}
        
        <button id="signup-button" type="submit">Register</button>
      </form>
    </div>
  );
};

export default Signup;

