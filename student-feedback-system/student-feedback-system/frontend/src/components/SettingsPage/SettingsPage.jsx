import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FiArrowLeft, 
  FiUser, 
  FiMail, 
  FiLock,
  FiTrash2,
  FiSave
} from 'react-icons/fi';
import './SettingsPage.css';

const SettingsPage = () => {
  const [formData, setFormData] = React.useState({
    name: 'Student Name',
    email: 'student@university.edu'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Settings saved:', formData);
    // Add your save logic here (API call, etc.)
  };

  return (
    <div className="student-settings-container">
      <div className="student-settings-header">
        <h1>Student Settings</h1>
        <Link to="/dashboard" className="student-back-button">
          <FiArrowLeft /> Back to Dashboard
        </Link>
      </div>

      <div className="student-settings-grid">
        {/* Profile Section */}
        <section className="student-settings-card">
          <h2><FiUser /> Profile</h2>
          <form onSubmit={handleSubmit}>
            <div className="student-form-group">
              <label><FiUser /> Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div className="student-form-group">
              <label><FiMail /> Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </form>
        </section>

        {/* Account Section */}
        <section className="student-settings-card student-danger-zone">
          <h2><FiLock /> Account</h2>
          <button className="student-danger-button">
            <FiLock /> Change Password
          </button>
          <button className="student-danger-button">
            <FiTrash2 /> Delete Account
          </button>
        </section>

        <div className="student-save-footer">
          <button 
            type="submit" 
            className="student-save-button"
            onClick={handleSubmit}
          >
            <FiSave /> Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
