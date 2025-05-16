import React, { useState, useEffect } from "react";
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
  FiCheck,
} from "react-icons/fi";
import axios from "axios";
import "./AdminDashboard.css";

const FilterFeedbackPage = () => {
  const navigate = useNavigate();
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredFeedback, setFilteredFeedback] = useState([]);
  const [recentFeedback, setRecentFeedback] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    course: "All Courses",
    rating: "All Ratings",
    dateRange: "Last 30 Days",
    status: "All Statuses",
  });

  const courses = [
    "All Courses",
    "Distributed and Cloud Systems Programming",
    "Human - Computer Interaction",
  ];
  const ratings = [
    "All Ratings",
    "5 Stars",
    "4 Stars",
    "3 Stars",
    "2 Stars",
    "1 Star",
  ];
  const dateRanges = [
    "Last 7 Days",
    "Last 30 Days",
    "Last 90 Days",
    "Custom Range",
  ];
  const statuses = ["All Statuses", "New", "In Progress", "Reviewed"];

  useEffect(() => {
    const fetchRecentFeedback = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/dashboard/feedback"
        );
        const feedback = response.data || [];
        setRecentFeedback(feedback);
        setFilteredFeedback(feedback); // Initially display all
      } catch (error) {
        console.error("Failed to fetch feedback:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentFeedback();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, recentFeedback]);

  const handleLogout = () => {
    navigate("/loginselection");
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  // Updated handleStatusChange with PUT request to update backend
  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.put(`http://localhost:8080/api/dashboard/feedback/${id}`, {
        status: newStatus,
      });

      setFilteredFeedback((prev) =>
        prev.map((fb) => (fb._id === id ? { ...fb, status: newStatus } : fb))
      );

      setRecentFeedback((prev) =>
        prev.map((fb) => (fb._id === id ? { ...fb, status: newStatus } : fb))
      );
    } catch (error) {
      console.error("Failed to update status:", error);
      alert("Failed to update feedback status. Please try again.");
    }
  };

  const applyFilters = () => {
    let data = [...recentFeedback];

    if (filters.course !== "All Courses") {
      data = data.filter((fb) => fb.courseName === filters.course);
    }
    if (filters.rating !== "All Ratings") {
      const ratingValue = parseInt(filters.rating[0]);
      data = data.filter((fb) => fb.courseRating === ratingValue);
    }
    if (filters.status !== "All Statuses") {
      data = data.filter((fb) => fb.status === filters.status);
    }

    setFilteredFeedback(data);
    setCurrentPage(1);
  };

  const feedbackPerPage = 5;
  const totalPages = Math.ceil(filteredFeedback.length / feedbackPerPage);
  const displayedFeedback = filteredFeedback.slice(
    (currentPage - 1) * feedbackPerPage,
    currentPage * feedbackPerPage
  );

  if (loading) {
    return <div>Loading feedback...</div>;
  }

  return (
    <div className="admin-dashboard">
      <nav className="left-side-nav">
        <div className="nav-header">
          <h2>Feedback System</h2>
        </div>
        <ul>
          <li>
            <Link to="/admin-dashboard" className="nav-link">
              <FiHome className="nav-icon" /> Dashboard
            </Link>
          </li>
          <li className="active">
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
              <FiFilter className="header-icon" /> Filter Feedback
            </h1>
            <p>Filter and analyze course feedback</p>
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

        <div className="filter-container">
          {[
            {
              label: "Course",
              name: "course",
              options: courses,
              icon: <FiBook />,
            },
            {
              label: "Rating",
              name: "rating",
              options: ratings,
              icon: <FiStar />,
            },
            {
              label: "Date Range",
              name: "dateRange",
              options: dateRanges,
              icon: <FiCalendar />,
            },
            { label: "Status", name: "status", options: statuses, icon: null },
          ].map(({ label, name, options, icon }) => (
            <div className="filter-group" key={name}>
              <label>
                {icon} {label}
              </label>
              <select
                name={name}
                value={filters[name]}
                onChange={handleFilterChange}
                className="filter-select"
              >
                {options.map((option, i) => (
                  <option key={i} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          ))}
          <button className="apply-filters-btn" onClick={applyFilters}>
            <FiCheck /> Apply Filters
          </button>
        </div>

        <div className="filter-feedback-section">
          <h2>Filtered Feedback Results</h2>
          <div className="feedback-table">
            <div className="table-header">
              <div className="header-cell">
                <FiBook /> Course
              </div>
              <div className="header-cell">
                <FiStar /> Rating
              </div>
              <div className="header-cell">
                <FiCalendar /> Date
              </div>
              <div className="header-cell">Status</div>
              <div className="header-cell">Action</div>
            </div>
            {displayedFeedback.map((fb) => (
              <div className="table-row" key={fb._id}>
                <div className="table-cell" data-label="Course">
                  {fb.courseName}
                </div>
                <div className="table-cell" data-label="Rating">
                  {Array(fb.courseRating)
                    .fill()
                    .map((_, i) => (
                      <span key={i} className="star-icon">
                        ★
                      </span>
                    ))}
                </div>
                <div className="table-cell" data-label="Date">
                  {new Date(fb.createdAt).toDateString()}
                </div>
                <div className="table-cell" data-label="Status">
                  <select
                    className="status-select"
                    value={fb.status || "New"}
                    onChange={(e) => handleStatusChange(fb._id, e.target.value)}
                  >
                    {statuses.slice(1).map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="table-cell" data-label="Action">
                  <button
                    className="view-details-btn"
                    onClick={() => navigate(`/feedback-details/${fb._id}`)}
                  >
                    View Details <FiChevronRight />
                  </button>
                </div>
                <div className="feedback-preview">{fb.feedbackText}</div>
              </div>
            ))}
          </div>

          <div className="table-footer">
            <div className="showing-entries">
              Showing {(currentPage - 1) * feedbackPerPage + 1}–
              {Math.min(currentPage * feedbackPerPage, filteredFeedback.length)}{" "}
              of {filteredFeedback.length} entries
            </div>
            <div className="pagination">
              <button
                className="page-button"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              >
                <FiChevronLeft /> Previous
              </button>
              {[...Array(totalPages)].map((_, i) => (
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
              <button
                className="page-button"
                disabled={currentPage === totalPages}
                onClick={() =>
                  setCurrentPage((p) => Math.min(p + 1, totalPages))
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

export default FilterFeedbackPage;
