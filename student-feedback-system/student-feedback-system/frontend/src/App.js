// src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginSelection from './components/LoginSelection/LoginSelection';
import StudentLogin from './components/StudentLogin/StudentLogin';
import StudentSignup from './components/StudentSignup/StudentSignup';
import StudentDashboard from './components/StudentDashboard/StudentDashboard';
import CourseFeedbackForm from './components/CourseFeedbackForm/CourseFeedbackForm';
import MyCourses from './components/MyCourses/MyCourses';
import SettingsPage from './components/SettingsPage/SettingsPage';
import ContactUs from './components/ContactUs/ContactUs';
import ForgotPassword from './components/ForgotPassword/ForgotPassword';


import AdminLogin from './components/AdminLogin/AdminLogin';
import AdminDashboard from './components/AdminDashboard/AdminDashboard';
import FilterFeedbackPage from './components/AdminDashboard/FilterFeedbackPage';
import GenerateReportPage from './components/AdminDashboard/GenerateReportPage';
import AdminSettingPage from './components/AdminSettingPage/AdminSettingPage';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <Routes>
  <Route path="/" element={<LoginSelection />} />
  <Route path="/loginselection" element={<LoginSelection />} />
  <Route path="/student-login" element={<StudentLogin />} />
  <Route path="/student-signup" element={<StudentSignup />} />
  <Route path="/dashboard" element={<StudentDashboard />} />
  <Route path="/feedback" element={<CourseFeedbackForm />} />
  <Route path="/my-courses" element={<MyCourses />} />
  <Route path="/settings" element={<SettingsPage />} />
  <Route path="/contact" element={<ContactUs />} />
  <Route path="/forgot-password" element={<ForgotPassword />} />


  <Route path="/admin-login" element={<AdminLogin />} />
  <Route path="/admin-dashboard" element={<AdminDashboard />} />
  <Route path="/filter-feedback" element={<FilterFeedbackPage />} />
  <Route path="/generate-report" element={<GenerateReportPage />} />
  <Route path="/adminsetting" element={<AdminSettingPage />} />
</Routes>

    </div>
  );
}

export default App;