import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';  // Import the CSS file

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('employee');
  const navigate = useNavigate();

  const handleLogin = () => {
    const user = { id: Date.now(), name: username, role };
    localStorage.setItem('currentUser', JSON.stringify(user));
    navigate(`/${role}`);  // Use template literal to concatenate role into the path
  };

  return (
    <div className="login-container">
      <h1 className="login-title">Login</h1>
      <input
        type="text"
        placeholder="Enter your name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="login-input"
      />
      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="login-select"
      >
        <option value="admin">Admin</option>
        <option value="manager">Manager</option>
        <option value="employee">Employee</option>
      </select>
      <button onClick={handleLogin} className="login-button">
        Submit
      </button>
    </div>
  );
};

export default LoginPage;
