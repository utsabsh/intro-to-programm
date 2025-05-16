import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiHome,
  FiFilter,
  FiDownload,
  FiUser,
  FiSettings,
  FiLogOut,
  FiChevronDown,
  FiFileText,
  FiFile,
  FiFileMinus,
  FiCheckCircle,
} from "react-icons/fi";
import "./AdminDashboard.css";

const GenerateReportPage = () => {
  const navigate = useNavigate();
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [reportType, setReportType] = useState("PDF");
  const [dateRange, setDateRange] = useState("Last 30 Days");
  const [isGenerating, setIsGenerating] = useState(false);

  const reportTypes = [
    { value: "PDF", label: "PDF Report", icon: <FiFileText size={24} /> },
    { value: "Excel", label: "Excel Spreadsheet", icon: <FiFile size={24} /> },
    { value: "CSV", label: "CSV Export", icon: <FiFileMinus size={24} /> },
  ];

  const dateRanges = [
    "Last 7 Days",
    "Last 30 Days",
    "Last 90 Days",
    "Custom Range",
  ];

  const handleLogout = () => {
    navigate("/loginselection");
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    console.log(`Generating ${reportType} report for ${dateRange}`);
    // Simulate report generation
    setTimeout(() => {
      setIsGenerating(false);
      alert(`${reportType} report generated successfully!`);
    }, 2000);
  };

  return (
    <div className="admin-dashboard">
      {/* Left Side Navigation - Same as Admin Dashboard */}
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
          <li>
            <Link to="/filter-feedback" className="nav-link">
              <FiFilter className="nav-icon" /> Filter Feedback
            </Link>
          </li>
          <li className="active">
            <Link to="/generate-report" className="nav-link">
              <FiDownload className="nav-icon" /> Generate Report
            </Link>
          </li>
        </ul>
      </nav>

      {/* Main Content */}
      <div className="admin-dashboard-content">
        <header className="admin-dashboard-header">
          <div className="header-left">
            <h1>
              <FiDownload className="header-icon" /> Generate Report
            </h1>
            <p>Create and download feedback reports</p>
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

        <div className="report-options">
          <div className="option-group">
            <h3>Report Type</h3>
            <div className="report-type-options">
              {reportTypes.map((type) => (
                <div
                  key={type.value}
                  className={`report-type-card ${
                    reportType === type.value ? "selected" : ""
                  }`}
                  onClick={() => setReportType(type.value)}
                >
                  <div className="report-icon">{type.icon}</div>
                  <span>{type.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="option-group">
            <h3>Date Range</h3>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="date-range-select"
            >
              {dateRanges.map((range, index) => (
                <option key={index} value={range}>
                  {range}
                </option>
              ))}
            </select>
          </div>

          <button
            className="generate-btn"
            onClick={handleGenerate}
            disabled={isGenerating}
          >
            {isGenerating ? (
              "Generating..."
            ) : (
              <>
                <FiCheckCircle /> Generate Report
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default GenerateReportPage;
