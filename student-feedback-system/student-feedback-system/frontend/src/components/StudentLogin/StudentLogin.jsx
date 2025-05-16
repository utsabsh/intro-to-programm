import React, { useState } from 'react';
import { useNavigate} from 'react-router-dom';
import axios from 'axios';
import './StudentLogin.css';

const StudentLogin = () => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSignupClick = () => {
    navigate('/student-signup');
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const response = await axios.post('http://localhost:8080/api/students/login', {
        email,
        password,
      });

      // On success, store the token, name, and id and redirect
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('studentName', response.data.student.name);
      localStorage.setItem('studentId', response.data.student._id);

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

  const handleBackClick = () => {
    navigate('/loginselection');
  };
  
  const handleForgotClick = () => {
    navigate('/forgot-password');
  };

  if (showSuccess) {
    return (
      <div className="success-message">
        <div className="success-content">
          <span className="success-icon">✅</span>
          <h2>Successfully Logged In</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="login-page-container">
      <div className="student-login-container">
        <h2 className="login-title">Student Login</h2>
        
        <form onSubmit={handleLoginSubmit}>
          <div className="input-group">
            <label className="input-label">Email Address</label>
            <input 
              name="email"
              type="email" 
              placeholder="Enter your email" 
              className="login-input"
              required
            />
          </div>
          
          <div className="input-group">
            <label className="input-label">Password</label>
            <div className="password-input-container">
              <input 
                name="password"
                type={showPassword ? "text" : "password"} 
                placeholder="Enter your password" 
                className="login-input"
                required
              />
              <button 
                type="button" 
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
            <button 
              type="button" 
              className="forgot-password-link"
              onClick={handleForgotClick}
            >
              Forgot Password?
            </button>
          </div>
          
          {error && <p className="error-message">{error}</p>}
          
          <div className="remember-me">
            <input type="checkbox" id="remember" />
            <label htmlFor="remember">Remember me</label>
          </div>
          <button type="submit" className="login-button">Login</button>
        </form>
        
        <div className="login-footer">
          <p className="footer-text">
            Don't have an account?{' '}
            <button type="button" onClick={handleSignupClick} className="footer-link">
              Sign Up
            </button>
          </p>
          <button type="button" onClick={handleBackClick} className="back-button">
            Back to Selection
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentLogin;
