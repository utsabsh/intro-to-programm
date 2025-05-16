// src/components/LoginSelection/LoginSelection.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginSelection.css';

const LoginSelection = () => {
  const navigate = useNavigate();

  return (
    <div className="selection-container">
      <div className="selection-box">
        <img 
          src={process.env.PUBLIC_URL + '/logo192.png'} 
          alt="School Logo" 
          className="logo" 
        />
        <h1 className="welcome-title">Welcome to School Portal</h1>
        <p className="user-type-prompt">Please select your user type</p>
        
        <div className="login-options">
          <button 
            className="login-button admin-button"
            onClick={() => navigate('/admin-login')}
          >
            Admin Login
          </button>
          <button 
            className="login-button student-button"
            onClick={() => navigate('/student-login')}
          >
            Student Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginSelection;