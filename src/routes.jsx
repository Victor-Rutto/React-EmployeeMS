import React from 'react';
import { Route, Routes, Navigate, Outlet } from 'react-router-dom'; // Import necessary components and functions from react-router-dom
import LoginPage from './components/LoginPage'; // Import LoginPage component
import AdminDashboard from './components/AdminDashboard'; // Import AdminDashboard component
import ManagerDashboard from './components/ManagerDashboard'; // Import ManagerDashboard component
import EmployeeDashboard from './components/EmployeeDashboard'; // Import EmployeeDashboard component

// Function to check user session from localStorage
export const checkUserSession = () => {
  const user = localStorage.getItem('token'); // Get token from localStorage
  const role = localStorage.getItem('role'); // Get role from localStorage
  return { user, role }; // Return user object with token and role
};

// Component for rendering private routes based on current user's role
export const PrivateRoute = ({ currentUser, role }) => {
  // Check if currentUser exists and matches the specified role
  if (currentUser && currentUser?.role === role) {
    return <Outlet />; // Render nested routes using Outlet when user matches role
  }
  // Also handles unauthorized access
};

// Component for rendering application routes
export const AppRoutes = ({ currentUser }) => (
  <Routes> {/* Root Routes component */}
    {/* Route for admin dashboard */}
    <Route path="/admin" element={<PrivateRoute currentUser={currentUser} role="admin" />}>
      <Route path="" element={<AdminDashboard currentUser={currentUser} />} /> {/* Nested Route for AdminDashboard */}
    </Route>
    {/* Route for manager dashboard */}
    <Route path="/manager" element={<PrivateRoute currentUser={currentUser} role="manager" />}>
      <Route path="" element={<ManagerDashboard currentUser={currentUser} />} /> {/* Nested Route for ManagerDashboard */}
    </Route>
    {/* Route for employee dashboard */}
    <Route path="/employee" element={<PrivateRoute currentUser={currentUser} role="employee" />}>
      <Route path="" element={<EmployeeDashboard currentUser={currentUser} />} /> {/* Nested Route for EmployeeDashboard */}
    </Route>
    <Route path="/" element={<LoginPage />} /> {/* Route for Login Page */}
    
    
  </Routes>
);

export default AppRoutes; // Export AppRoutes component as default
