import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css'; // Import CSS file

const Navbar = ({ currentUser, setCurrentUser }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
    navigate('/');
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
