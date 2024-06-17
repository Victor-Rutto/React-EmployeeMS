import React from 'react';
import { Route, Routes, Navigate, Outlet } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import AdminDashboard from './components/AdminDashboard';
import ManagerDashboard from './components/ManagerDashboard';
import EmployeeDashboard from './components/EmployeeDashboard';
export const checkUserSession = () => {
  const user = localStorage.getItem('token')
  const role = localStorage.getItem('role')
  return {user, role}
};

export const PrivateRoute = ({ currentUser, role }) => {
  if (currentUser && currentUser?.role == role) {
    return <Outlet />;
  }
};

export const AppRoutes = ({ currentUser }) => (
  <Routes>
    <Route path="/admin" element={<PrivateRoute currentUser={currentUser} role="admin" />}>
      <Route path="" element={<AdminDashboard currentUser={currentUser} />} />
    </Route>
    <Route path="/manager" element={<PrivateRoute currentUser={currentUser} role="manager" />}>
      <Route path="" element={<ManagerDashboard currentUser={currentUser} />} />
    </Route>
    <Route path="/employee" element={<PrivateRoute currentUser={currentUser} role="employee" />}>
      <Route path="" element={<EmployeeDashboard currentUser={currentUser} />} />
    </Route>
    <Route path="/" element={<LoginPage />} />
    {/* <Route path="*" element={<Navigate to="/" />} /> */}
  </Routes>
);
