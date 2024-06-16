// routes.jsx
import React from 'react';
import { Route, Routes, Navigate, Outlet } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import AdminDashboard from './components/AdminDashboard';
import ManagerDashboard from './components/ManagerDashboard';
import EmployeeDashboard from './components/EmployeeDashboard';

export const checkUserSession = () => {
  return JSON.parse(localStorage.getItem('currentUser'));
};

export const PrivateRoute = ({ currentUser, role }) => {
  if (currentUser && currentUser.role === role) {
    return <Outlet />;
  }
  return <Navigate to="/" />;
};

export const AppRoutes = ({ currentUser }) => (
  <Routes>
    <Route path="/" element={<LoginPage />} />
    
    {/* Admin Route */}
    <Route path="/admin" element={<PrivateRoute currentUser={currentUser} role="admin" />}>
      <Route index element={<AdminDashboard currentUser={currentUser} />} />
    </Route>
    
    {/* Manager Route */}
    <Route path="/manager" element={<PrivateRoute currentUser={currentUser} role="manager" />}>
      <Route index element={<ManagerDashboard currentUser={currentUser} />} />
    </Route>
    
    {/* Employee Route */}
    <Route path="/employee" element={<PrivateRoute currentUser={currentUser} role="employee" />}>
      <Route index element={<EmployeeDashboard currentUser={currentUser} />} />
    </Route>
    
    {/* Fallback Route */}
    <Route path="*" element={<Navigate to="/" />} />
  </Routes>
);