import React, { useState } from 'react';
import axios from 'axios';
import './LoginPage.css';  // Import the CSS file
import { redirect, useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission

    try {
      const response = await axios.post('http://localhost:3001/api/login', {
        email: formData.email,
        password: formData.password
      });

      const { email, role } = response.data[0];
      localStorage.setItem('token',  email);
      localStorage.setItem('role', role);
        //  console.log(response.data)
       // Redirect based on role after successful login
      // Example redirect to '/manager' if role is 'manager'
      // Replace '/manager' with appropriate route based on your application
      // For now, just alert the role
      // alert(role);
      switch(role){
        case 'manager':
          navigate("/manager");
          navigate(0)
          break;
        case 'admin':
          navigate('/admin')
          navigate(0)
        break;
        case 'employee':
        navigate('/employee')
        navigate(0)
        
        default:
          navigate("/");
      }
    } catch (error) {
      // console.error('Login error:', error);
      // Handle login error, such as displaying an error message
    }
  };

  return (
    <div className="login-container">
      {/* <h1 className="login-title">Login</h1> */}
      <p className="intro-message">Welcome to Elewa Interview assignment project</p>
        <form onSubmit={handleLogin} className="login-form">
        <input
          type="text"
          name="email"
          placeholder="Enter your email address"
          value={formData.email}
          onChange={handleInputChange}
          className="login-input"
        />
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleInputChange}
          className="login-input"
        />
        <button type="submit" className="login-button">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
