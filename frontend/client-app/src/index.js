import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import DashboardTech from './pages/DashboardTech';
import DashboardClient from './pages/DashboardClient';
import Login from './pages/Login';
import SignupTech from './pages/SignupTech'; 
import SignupClient from './pages/SignupClient';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup/tech" element={<SignupTech />} /> 
        <Route path="/signup/client" element={<SignupClient />} />
        <Route path="/dashboardTech" element={<DashboardTech />} />
        <Route path="/dashboardClient" element={<DashboardClient />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
