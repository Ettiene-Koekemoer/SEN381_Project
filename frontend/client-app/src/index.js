import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import DashboardTech from './pages/DashboardTech';
import DashboardClient from './pages/DashboardClient';
import Login from './pages/Login';
import Signup from './pages/Signup';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboardTech" element={<DashboardTech />} />
        <Route path="/dashboardClient" element={<DashboardClient />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
