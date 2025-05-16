// src/Routes.js
import { Routes, Route } from 'react-router-dom';
import LoginSelection from './components/LoginSelection/LoginSelection';
import StudentDashboard from './components/StudentDashboard/StudentDashboard';

export const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<LoginSelection />} />
    <Route path="/dashboard" element={<StudentDashboard />} />
  </Routes>
);