import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './StudentSignup.css';

const StudentSignup = ({ onBackClick, onLoginClick }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const group = e.target.group.value;

    if (password !== e.target.confirmPassword.value) {
      setError('Passwords do not match.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/api/students/register', {
        name,
        email,
        password,
        group,
      });

      // On success, store the token, name, and id and redirect
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('studentName', response.data.student.name);
      localStorage.setItem('studentId', response.data.student._id);
      localStorage.setItem('studentGroup', response.data.student.group);

      setShowSuccess(true);
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
    } catch (err) {
      console.log(err); // Add this line
      setError(err.response?.data?.message || err.message || 'Unknown Error');
    }
    // } catch (err) {
    //   setError(err.response ? err.response.data.message : 'Error');
    // }
  };

  const handleLoginClick = () => {
    if (onLoginClick) {
      onLoginClick();
    } else {
      navigate('/student-login');
    }
  };

  const handleBackClick = () => {
    if (onBackClick) {
      onBackClick();
    } else {
      navigate('/');
    }
  };

  if (showSuccess) {
    return (
      <div className="success-message">
        <div className="success-content">
          <span className="success-icon">✅</span>
          <h2>Account Created Successfully!</h2>
          <p>Redirecting to dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="signup-container">
      <h2 className="signup-title">Create New Account</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label className="input-label">Full Name</label>
          <input 
            name="name"
            type="text" 
            placeholder="Enter your full name" 
            className="signup-input"
            required
          />
        </div>
        
        <div className="input-group">
          <label className="input-label">Email Address</label>
          <input 
            name="email"
            type="email" 
            placeholder="Enter your email" 
            className="signup-input"
            required
          />
        </div>
        
        <div className="input-group">
          <label className="input-label">Group</label>
          <input 
            name="group"
            type="text" 
            placeholder="Enter your group name" 
            className="signup-input"
            required
          />
        </div>
        
        <div className="input-group">
          <label className="input-label">Password</label>
          <div className="password-input-container">
            <input 
              name="password"
              type={showPassword ? "text" : "password"} 
              placeholder="Create a password" 
              className="signup-input"
              required
              minLength="6"
            />
            <button 
              type="button" 
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>
          <p className="input-hint">Password must be at least 6 characters</p>
        </div>
        
        <div className="input-group">
          <label className="input-label">Confirm Password</label>
          <div className="password-input-container">
            <input 
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"} 
              placeholder="Confirm your password" 
              className="signup-input"
              required
              minLength="6"
            />
            <button 
              type="button" 
              className="password-toggle"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? "🙈" : "👁️"}
            </button>
          </div>
        </div>
        
        {error && <p className="error-message">{error}</p>}
        
        <button type="submit" className="signup-button">Create Account</button>
      </form>
      
      <div className="signup-footer">
        <p className="footer-text">
          Already have an account?{' '}
          <button type="button" onClick={handleLoginClick} className="footer-link">
            Log In
          </button>
        </p>
        <button type="button" onClick={handleBackClick} className="back-button">
          Back to Selection
        </button>
      </div>
    </div>
  );
};

export default StudentSignup;
