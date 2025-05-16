import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ForgotPassword.css';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="forgot-page-container">
      <button className="forgot-page-back-button" onClick={() => navigate(-1)}>
        ← Back
      </button>
      
      <h1 className="forgot-page-title">Forgot Password</h1>
      
      {submitted ? (
        <p className="forgot-page-success-message">✓ Reset link sent!</p>
      ) : (
        <form onSubmit={handleSubmit} className="forgot-page-form">
          <input
            type="email"
            className="forgot-page-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
          <button type="submit" className="forgot-page-submit-button">
            Send Reset Link
          </button>
        </form>
      )}
    </div>
  );
};

export default ForgotPassword;