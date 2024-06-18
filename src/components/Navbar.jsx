import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css'; // Import CSS file

const Navbar = ({ currentUser, setCurrentUser }) => {
  const navigate = useNavigate(); // Hook from react-router-dom for navigation

   // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token from localStorage
    localStorage.removeItem('role');  // Remove role from localStorage
    setCurrentUser(null);             // Set currentUser state to null (indicating logout)
    navigate('/');                    // Navigate to the root route after logout
  };

  return (
    <nav className="navbar">
      <ul>
        {!currentUser ? (
          <li><Link to="/">Login</Link></li>
        ) : (
          <>
            {currentUser.role === 'admin' && <li><Link to="/admin">Admin Dashboard</Link></li>}
            {currentUser.role === 'manager' && <li><Link to="/manager">Manager Dashboard</Link></li>}
            {currentUser.role === 'employee' && <li><Link to="/employee">Employee Dashboard</Link></li>}
          </>
        )}
      </ul>
      {currentUser && (
        <ul>
          <li><button onClick={handleLogout}>Logout</button></li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
