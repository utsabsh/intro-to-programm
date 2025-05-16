import './App.css';

function App() {
  return (
    <div className="login-container">
      <div className="login-box">
      <img src={process.env.PUBLIC_URL + '/logo.png'} alt="School Logo" className="logo" />
        <h1 className="welcome-text">Welcome to School Portal</h1>
        <p className="user-type-text">Please select your user type</p>
        
        <div className="buttons-container">
          <button className="login-button admin-button">Admin Login</button>
          <button className="login-button student-button">Student Login</button>
        </div>
      </div>
    </div>
  );
}

export default App;
