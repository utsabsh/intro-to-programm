import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiHome,
  FiFilter,
  FiDownload,
  FiUser,
  FiSettings,
  FiLogOut,
  FiChevronDown,
  FiBook,
  FiStar,
  FiCalendar,
  FiChevronRight,
  FiChevronLeft,
} from "react-icons/fi";
import "./AdminDashboard.css";
import axios from "axios";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [recentFeedback, setRecentFeedback] = useState([]);
  const [loading, setLoading] = useState(true);

  const totalPages = 10;

  useEffect(() => {
    const fetchRecentFeedback = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/dashboard");
        setRecentFeedback(response.data.recentFeedback || []);
      } catch (error) {
        console.error("Failed to fetch feedback:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentFeedback();
  }, []);

  const handleLogout = () => {
    navigate("/loginselection");
  };

  return (
    <div className="admin-dashboard">
      <nav className="left-side-nav">
        <div className="nav-header">
          <h2>Feedback System</h2>
        </div>
        <ul>
          <li className="active">
            <Link to="/admin-dashboard" className="nav-link">
              <FiHome className="nav-icon" /> Dashboard
            </Link>
          </li>
          <li>
            <Link to="/filter-feedback" className="nav-link">
              <FiFilter className="nav-icon" /> Filter Feedback
            </Link>
          </li>
          <li>
            <Link to="/generate-report" className="nav-link">
              <FiDownload className="nav-icon" /> Generate Report
            </Link>
          </li>
        </ul>
      </nav>

      <div className="admin-dashboard-content">
        <header className="admin-dashboard-header">
          <div className="header-left">
            <h1>
              <FiBook className="header-icon" /> Admin Dashboard
            </h1>
            <p>Analyze and manage course feedback</p>
          </div>
          <div className="header-right">
            <div
              className="profile-menu"
              onClick={() => setShowProfileDropdown(!showProfileDropdown)}
            >
              <div className="user-avatar">
                <FiUser />
              </div>
              <span className="user-name">Admin</span>
              <FiChevronDown
                className={`dropdown-arrow ${
                  showProfileDropdown ? "rotate" : ""
                }`}
              />
              {showProfileDropdown && (
                <div className="profile-dropdown">
                  <Link to="/adminsetting" className="dropdown-item">
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

        <div className="stats-section">
          {[
            { value: "2,547", label: "Total Feedback", icon: <FiBook /> },
            { value: "4.8", label: "Average Rating", icon: <FiStar /> },
            { value: "24", label: "Active Courses", icon: <FiBook /> },
            { value: "78%", label: "Response Rate", icon: <FiUser /> },
          ].map((stat, index) => (
            <div
              key={index}
              className={`stat-card ${hoveredCard === index ? "hovered" : ""}`}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="stat-icon">{stat.icon}</div>
              <h2>{stat.value}</h2>
              <p>{stat.label}</p>
              {hoveredCard === index && (
                <div className="stat-hover-effect"></div>
              )}
            </div>
          ))}
        </div>

        <div className="feedback-section">
          <h2>
            <FiFilter className="section-icon" /> Recent Feedback
          </h2>
          {loading ? (
            <p>Loading feedback...</p>
          ) : (
            <div className="feedback-table">
              <div className="table-header">
                <div className="header-cell">
                  <FiBook /> Course
                </div>
                <div className="header-cell">
                  <FiUser /> Instructor
                </div>
                <div className="header-cell">
                  <FiStar /> Rating
                </div>
                <div className="header-cell">
                  <FiCalendar /> Date
                </div>
                <div className="header-cell">Action</div>
              </div>
              {recentFeedback.map((feedback) => (
                <div className="table-row" key={feedback._id}>
                  <div className="table-cell" data-label="Course">
                    <FiBook className="cell-icon" /> {feedback.courseName}
                  </div>
                  <div className="table-cell" data-label="Instructor">
                    <FiUser className="cell-icon" />{" "}
                    {feedback.instructorName || "Anonymous"}
                  </div>
                  <div className="table-cell" data-label="Rating">
                    <FiStar className="cell-icon" />
                    {Array(feedback.courseRating)
                      .fill()
                      .map((_, i) => (
                        <span key={i} className="star-icon">
                          ★
                        </span>
                      ))}
                  </div>
                  <div className="table-cell" data-label="Date">
                    <FiCalendar className="cell-icon" />{" "}
                    {new Date(feedback.createdAt).toLocaleDateString()}
                  </div>
                  <div className="table-cell" data-label="Action">
                    <button
                      className="view-details-btn"
                      onClick={() =>
                        navigate(`/feedback-details/${feedback._id}`)
                      }
                    >
                      View Details <FiChevronRight />
                    </button>
                  </div>
                  <div className="feedback-preview">
                    {feedback.feedbackText}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="table-footer">
            <div className="showing-entries">
              Showing 1–{recentFeedback.length} of {recentFeedback.length}{" "}
              entries
            </div>
            <div className="pagination">
              <button
                className="page-button"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              >
                <FiChevronLeft /> Previous
              </button>
              {[...Array(Math.min(5, totalPages))].map((_, i) => (
                <button
                  key={i}
                  className={`page-number ${
                    currentPage === i + 1 ? "active" : ""
                  }`}
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
              {totalPages > 5 && <span className="ellipsis">...</span>}
              <button
                className="page-button"
                disabled={currentPage === totalPages}
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
              >
                Next <FiChevronRight />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
