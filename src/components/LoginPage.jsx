import React, { useState } from 'react';
import axios from 'axios';
import './LoginPage.css';  // Import the CSS file
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();

  // State for managing login form data
  const [loginFormData, setLoginFormData] = useState({
    email: '',
    password: ''
  });

  // State for managing signup form data
  const [signupFormData, setSignupFormData] = useState({
    name: '',
    email: '',
    role: '',
    password: ''
  });

  // State for handling login form errors
  const [loginFormError, setLoginFormError] = useState('');
  
  // State for handling signup form errors
  const [signupFormError, setSignupFormError] = useState('');

  // State to toggle between login and signup forms
  const [showSignup, setShowSignup] = useState(false);

  // Handle input changes for login form
  const handleLoginInputChange = (e) => {
    setLoginFormData({
      ...loginFormData,
      [e.target.name]: e.target.value
    });
  };

  // Handle input changes for signup form
  const handleSignupInputChange = (e) => {
    setSignupFormData({
      ...signupFormData,
      [e.target.name]: e.target.value
    });
  };

  // Handle login form submission
  const handleLogin = async (e) => {
    e.preventDefault();

    // Validate form fields
    if (!loginFormData.email || !loginFormData.password) {
      setLoginFormError('Email and password are required');
      return;
    }

    let role = '';

    try {
      const user = JSON.parse(localStorage.getItem('user'));
      user.forEach((currentUser) => {
        if (currentUser.email === loginFormData.email) {
          localStorage.setItem('token', currentUser.email);
          localStorage.setItem('role', currentUser.role);
          role = currentUser.role;
        }
      });

      // Navigate to respective dashboard based on role
      switch (role) {
        case 'manager':
          navigate("/manager");
          navigate(0);
          break;
        case 'admin':
          navigate('/admin');
          navigate(0);
          break;
        case 'employee':
          navigate('/employee');
          navigate(0);
          break;
        default:
          navigate("/");
          navigate(0);
      }
    } catch (error) {
      console.error('Login error:', error);
      // Handle login error, such as displaying an error message
    }
  };

  // Handle signup form submission
  const handleSignup = async (e) => {
    e.preventDefault();

    // Validate form fields
    if (!signupFormData.name || !signupFormData.email || !signupFormData.role || !signupFormData.password) {
      setSignupFormError('All fields are required');
      return;
    }

    try {
      const user = JSON.parse(localStorage.getItem('user')) || [];
      localStorage.setItem('user', JSON.stringify([...user, signupFormData]));

      localStorage.setItem('token', signupFormData.email);
      localStorage.setItem('role', signupFormData.role);

      // Clear form fields after submission
      setSignupFormData({
        name: '',
        email: '',
        role: '',
        password: ''
      });

      setLoginFormData({
        email: '',
        password: ''
      });

      // Alert or handle success message
      alert('Signup successful!');

      // Automatically switch to login form after successful signup
      setShowSignup(false);
      
    } catch (error) {
      console.error('Signup error:', error);
      // Handle signup error, such as displaying an error message
    }
  };

  // Toggle between login and signup forms
  const toggleForm = () => {
    setShowSignup(!showSignup);
  };

  return (
    <div className="login-container">
      <p className="intro-message">Welcome to Elewa Interview assignment project</p>
      <p className="intro-message">First signup as manager/admin/employee as your role to access the system</p>

      {/* Conditional Rendering based on showSignup state */}
      {!showSignup && (
        <form onSubmit={handleLogin} className="login-form">
          <input
            type="text"
            name="email"
            placeholder="Enter your email address"
            value={loginFormData.email}
            onChange={handleLoginInputChange}
            className="input-field"
          />
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={loginFormData.password}
            onChange={handleLoginInputChange}
            className="input-field"
          />
          {loginFormError && <p className="form-error">{loginFormError}</p>}
          <button type="submit" className="button">
            Login
          </button>
          <p className="switch-form-text">
            Don't have an account? <button type="button" onClick={toggleForm} className="switch-form-link">Sign up</button>
          </p>
        </form>
      )}

      {showSignup && (
        <form onSubmit={handleSignup} className="signup-form">
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={signupFormData.name}
            onChange={handleSignupInputChange}
            className="input-field"
          />
          <input
            type="text"
            name="email"
            placeholder="Enter your email address"
            value={signupFormData.email}
            onChange={handleSignupInputChange}
            className="input-field"
          />
          <input
            type="text"
            name="role"
            placeholder="Enter your role"
            value={signupFormData.role}
            onChange={handleSignupInputChange}
            className="input-field"
          />
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={signupFormData.password}
            onChange={handleSignupInputChange}
            className="input-field"
          />
          {signupFormError && <p className="form-error">{signupFormError}</p>}
          <button type="submit" className="button">
            Sign up
          </button>
          <p className="switch-form-text">
            Already have an account? <button type="button" onClick={toggleForm} className="switch-form-link">Log in</button>
          </p>
        </form>
      )}
    </div>
  );
};

export default LoginPage;
