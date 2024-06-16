// App.jsx
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar';
import { AppRoutes, checkUserSession } from './routes';

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const user = checkUserSession();
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  return (
    <Router>
      <Navbar currentUser={currentUser} setCurrentUser={setCurrentUser} />
      <AppRoutes currentUser={currentUser} />
    </Router>
  );
}

export default App;