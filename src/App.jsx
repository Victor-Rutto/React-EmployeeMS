// App.jsx

import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom'; // Import BrowserRouter for routing
import Navbar from './components/Navbar'; // Import Navbar component
import { AppRoutes, checkUserSession } from './routes'; // Import AppRoutes component and checkUserSession function from routes

function App() {
  const [currentUser, setCurrentUser] = useState(null); // State to hold current user

  useEffect(() => {
    // useEffect to run once on component mount
    const user = checkUserSession(); // Check if user session exists in localStorage
    console.log(user); // Log user session information to console (for debugging)
    if (user) {
      setCurrentUser(user); // Set currentUser state to the retrieved user session
    }
  }, []); // Empty dependency array ensures useEffect runs only once on mount

  return (
    <Router> {/* Router component to provide routing context */}
      <Navbar currentUser={currentUser} setCurrentUser={setCurrentUser} /> {/* Navbar component with currentUser and setCurrentUser props */}
      <AppRoutes currentUser={currentUser} /> {/* AppRoutes component with currentUser prop */}
    </Router>
  );
}

export default App;
