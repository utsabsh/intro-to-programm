// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './AdminLogin.css';

// const AdminLogin = () => {
//   const [showSuccess, setShowSuccess] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const navigate = useNavigate();

//   const handleLogin = (e) => {
//     e.preventDefault();
//     // Add your authentication logic here
//     setShowSuccess(true);
//     setTimeout(() => {
//       navigate('/admin-dashboard');
//     }, 1500);
//   };

//   const handleBackClick = () => {
//     navigate('/');
//   };

//   if (showSuccess) {
//     return (
//       <div className="success-message">
//         <div className="success-content">
//           <span className="success-icon">✅</span>
//           <h2>Admin Login Successful</h2>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="admin-login-container">
//       <h2 className="login-title">Admin Login</h2>
      
//       <form onSubmit={handleLogin}>
//         <div className="input-group">
//           <label className="input-label">Admin Email</label>
//           <input 
//             type="email" 
//             placeholder="Enter admin email" 
//             className="login-input"
//             required
//           />
//         </div>
        
//         <div className="input-group">
//           <label className="input-label">Password</label>
//           <div className="password-input-container">
//             <input 
//               type={showPassword ? "text" : "password"} 
//               placeholder="Enter your password" 
//               className="login-input"
//               required
//             />
//             <button 
//               type="button" 
//               className="password-toggle"
//               onClick={() => setShowPassword(!showPassword)}
//             >
//               {showPassword ? "🙈" : "👁️"}
//             </button>
//           </div>
//         </div>
        
//         <div className="remember-me">
//           <input type="checkbox" id="remember" />
//           <label htmlFor="remember">Remember me</label>
//         </div>
        
//         <button type="submit" className="login-button">Login</button>
//       </form>
      
//       <div className="login-footer">
//         <button 
//           type="button" 
//           onClick={handleBackClick} 
//           className="back-button"
//         >
//           Back to Selection
//         </button>
//       </div>
//     </div>
//   );
// };

// export default AdminLogin;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminLogin.css';

const AdminLogin = () => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:8080/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setShowSuccess(true);
        setTimeout(() => {
          navigate('/admin-dashboard');
        }, 1500);
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Server error. Please try again later.');
    }
  };

  const handleBackClick = () => {
    navigate('/');
  };

  if (showSuccess) {
    return (
      <div className="success-message">
        <div className="success-content">
          <span className="success-icon">✅</span>
          <h2>Admin Login Successful</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-login-container">
      <h2 className="login-title">Admin Login</h2>

      <form onSubmit={handleLogin}>
        <div className="input-group">
          <label className="input-label">Admin Email</label>
          <input
            type="email"
            placeholder="Enter admin email"
            className="login-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <label className="input-label">Password</label>
          <div className="password-input-container">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              className="login-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? '🙈' : '👁️'}
            </button>
          </div>
        </div>

        <div className="remember-me">
          <input type="checkbox" id="remember" />
          <label htmlFor="remember">Remember me</label>
        </div>

        {error && <p style={{ color: 'red', marginTop: '8px' }}>{error}</p>}

        <button type="submit" className="login-button">
          Login
        </button>
      </form>

      <div className="login-footer">
        <button type="button" onClick={handleBackClick} className="back-button">
          Back to Selection
        </button>
      </div>
    </div>
  );
};

export default AdminLogin;
