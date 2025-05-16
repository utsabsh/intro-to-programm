
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FiArrowLeft, 
  FiUser, 
  FiMail, 
  FiBell, 
  FiMoon, 
  FiLock,
  FiTrash2,
  FiSave
} from 'react-icons/fi';
import './AdminSettingPage.css';

const AdminSettingsPage = () => {
  const [formData, setFormData] = React.useState({
    name: 'Admin User',
    email: 'admin@university.edu',
    notifications: true,
    theme: localStorage.getItem('theme') || 'light'
  });

  // Apply theme on initial load and when changed
  useEffect(() => {
    document.documentElement.className = formData.theme;
    localStorage.setItem('theme', formData.theme);
  }, [formData.theme]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Settings saved:', formData);
    // Add your save logic here (API call, etc.)
  };

  return (
    <div className="admin-settings-container">
      <div className="admin-settings-header">
        <h1>Admin Settings</h1>
        <Link to="/admin-dashboard" className="admin-back-button">
          <FiArrowLeft /> Back to Dashboard
        </Link>
      </div>

      <div className="admin-settings-grid">
        {/* Profile Section */}
        <section className="admin-settings-card">
        <h2><FiUser /> Profile</h2>
          <form onSubmit={handleSubmit}>
            <div className="admin-form-group">
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div className="admin-form-group">
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

        {/* Preferences Section */}
        <section className="admin-settings-card">
          <h2><FiBell /> Preferences</h2>
          <div className="admin-form-group">
            <label className="admin-checkbox-label">
              <input
                type="checkbox"
                name="notifications"
                checked={formData.notifications}
                onChange={handleChange}
              />
              <span><FiBell /> Enable email notifications</span>
            </label>
          </div>

          <div className="admin-form-group">
          <label><FiMoon /> Theme</label>
            <select 
              name="theme" 
              value={formData.theme}
              onChange={handleChange}
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="system">System Default</option>
            </select>
          </div>
        </section>

        {/* Account Section */}
        <section className="admin-settings-card admin-danger-zone">
          <h2><FiLock /> Account</h2>
          <button className="admin-danger-button">
            <FiLock /> Change Password
          </button>
          <button className="admin-danger-button">
            <FiTrash2 /> Delete Account
          </button>
        </section>

        <div className="admin-save-footer">
          <button 
            type="submit" 
            className="admin-save-button"
            onClick={handleSubmit}
          >
            <FiSave /> Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};
export default AdminSettingsPage;

