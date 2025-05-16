
import React, { useState, useRef, useEffect } from 'react';
import { PieChart, Pie, Cell } from 'recharts';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FiSearch, 
  FiBell, 
  FiChevronDown, 
  FiSettings, 
  FiLogOut,
  FiHome,
  FiMessageSquare,
  FiHelpCircle
} from 'react-icons/fi';
import './StudentDashboard.css';

const StudentDashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const pendingFeedback = 12;
  const completedFeedback = 45;
  const responseRate = 85;

  const recentActivities = [
    {
      title: "Feedback Done",
      course: "Introduction to AI",
      date: "Oct 3, 2023"
    },
    {
      title: "Feedback Done",
      course: "Data Science 101",
      date: "Sep 28, 2023"
    },
    {
      title: "Feedback Done",
      course: "Web Development Basics",
      date: "Sep 22, 2023"
    }
  ];

  const notifications = [
    {
      message: "A new teaching resource Test Report has been shared with you.",
      date: "April 6, 2025 at 23:56 PM"
    },
    {
      message: "A new teaching resource Collaboration template has been shared with you.",
      date: "April 6, 2025 at 09:00 AM"
    },
    {
      message: "A new teaching resource Self Appraisal Form has been shared with you.",
      date: "April 6, 2025 at 09:06 AM"
    },
    {
      message: "You have an assignment workshop 6 submission from Jenny Rajak for LSCG6, 25, BCS_SP_SCSQ22",
      date: "April 2, 2025 at 01:00 PM"
    }
  ];

  const feedbackData = [
    { name: 'Completed', value: completedFeedback },
    { name: 'Pending', value: pendingFeedback }
  ];

  const pendingData = [
    { name: 'Pending', value: pendingFeedback },
    { name: 'Others', value: completedFeedback }
  ];

  const responseData = [
    { name: 'Responded', value: responseRate },
    { name: 'Not Responded', value: 100 - responseRate }
  ];

  const handleLogout = () => {
    // Add your logout logic here
    console.log("User logged out");
    navigate('/loginselection');
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowProfileDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="header-left">
          <h1>SpeakUpEdu</h1>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="search-button" aria-label="Search">
              <FiSearch className="search-icon" />
            </button>
          </div>
        </div>
        
        <div className="header-right">
          <div className="notification-container">
            <button
              className="notification-icon"
              onClick={() => setShowNotifications(!showNotifications)}
              aria-label="Toggle notifications"
            >
              <FiBell className="bell-icon" />
              <span className="notification-badge">{notifications.length}</span>
            </button>

            {showNotifications && (
              <div className="notifications-dropdown">
                <h3>Notifications</h3>
                <div className="notifications-list">
                  {notifications.map((notification, index) => (
                    <div key={index} className="notification-item">
                      <p className="notification-message">{notification.message}</p>
                      <p className="notification-date">{notification.date}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="user-profile-container" ref={dropdownRef}>
            <div 
              className="user-profile" 
              onClick={() => setShowProfileDropdown(!showProfileDropdown)}
            >
              <div className="user-avatar">JD</div>
              <span className="user-name">John Doe</span>
              <FiChevronDown className={`dropdown-arrow ${showProfileDropdown ? 'rotate' : ''}`} />
            </div>

            {showProfileDropdown && (
              <div className="profile-dropdown">
                <Link to="/settings" className="dropdown-item" onClick={() => setShowProfileDropdown(false)}>
                  <FiSettings className="dropdown-icon" /> Settings
                </Link>
                
                <button className="dropdown-item" onClick={handleLogout}>
                  <FiLogOut className="dropdown-icon" /> Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <nav className="dashboard-nav">
        <ul>
          <li className="active">
            <FiHome className="nav-icon" /> Dashboard
          </li>
          <li>
            <Link to="/my-courses" className="nav-item">
              <FiMessageSquare className="nav-icon" /> Feedback
            </Link>
          </li>
          <li>
            <Link to="/contact" className="nav-item">
              <FiHelpCircle className="nav-icon" /> Contact Us
            </Link>
          </li>
        </ul>
      </nav>

      <div className="stats-container">
        <div className="stat-card">
          <h2>{pendingFeedback}</h2>
          <p>Pending Feedback</p>
          <PieChart width={100} height={100}>
            <Pie data={pendingData} innerRadius={30} outerRadius={40} dataKey="value">
              <Cell fill="#4dabf7" />
              <Cell fill="#e9ecef" />
            </Pie>
          </PieChart>
        </div>

        <div className="stat-card">
          <h2>{completedFeedback}</h2>
          <p>Completed Feedback</p>
          <PieChart width={100} height={100}>
            <Pie data={feedbackData} innerRadius={30} outerRadius={40} dataKey="value">
              <Cell fill="#2ecc71" />
              <Cell fill="#e9ecef" />
            </Pie>
          </PieChart>
        </div>

        <div className="stat-card">
          <h2>{responseRate}%</h2>
          <p>Response Rate</p>
          <PieChart width={100} height={100}>
            <Pie data={responseData} innerRadius={30} outerRadius={40} dataKey="value">
              <Cell fill="#ffc107" />
              <Cell fill="#e9ecef" />
            </Pie>
          </PieChart>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="recent-activities">
          <h2>Recent Activities</h2>
          {recentActivities.map((activity, index) => (
            <div key={index} className="activity-card">
              <h3>{activity.title}</h3>
              <p>Course: {activity.course}</p>
              <p>Submitted: {activity.date}</p>
              <button className="view-feedback-btn">View Feedback</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;