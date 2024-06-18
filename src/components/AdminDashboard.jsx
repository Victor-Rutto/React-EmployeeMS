import React, { useState, useEffect } from 'react';

const AdminDashboard = ({ currentUser }) => {
  const [managers, setManagers] = useState([]);
  const [managerName, setManagerName] = useState('');
  const [managerEmail, setManagerEmail] = useState('');
  const [error, setError] = useState(null); // State for error handling

  useEffect(() => {
    loadManagers();
  }, []);

  // Function to load managers from local storage
  const loadManagers = () => {
    const storedManagers = JSON.parse(localStorage.getItem('managers')) || [];
    setManagers(storedManagers);
    setError(null); // Reset error state
  };

  // Function to handle the addition of a new manager
  const handleAddManager = (e) => {
    e.preventDefault();
    const newManager = {
      id: Date.now(), // Generate a unique id
      name: managerName,
      email: managerEmail,
      role: 'manager',
      password: '1234', // Default password
    };

    try {
      const updatedManagers = [...managers, newManager];
      setManagers(updatedManagers);
      localStorage.setItem('managers', JSON.stringify(updatedManagers));
      setManagerName(''); // Reset input fields
      setManagerEmail(''); // Reset input fields
      setError(null); // Reset error state
    } catch (error) {
      console.error('Error adding manager:', error);
      setError('Error adding manager. Please try again.'); // Set error message
    }
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      
      <div>
        <h2>Add Manager</h2>
        <form onSubmit={handleAddManager}>
          <input
            type="text"
            placeholder="Manager Name"
            value={managerName}
            onChange={(e) => setManagerName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Manager Email"
            value={managerEmail}
            onChange={(e) => setManagerEmail(e.target.value)}
            required
          />
          <button type="submit">Add Manager</button>
        </form>
      </div>
      
      <div>
        <h2>Managers</h2>
        {error && <p>{error}</p>} {/* Display error message if there's an error */}
        <ul>
          {managers.map(manager => (
            <li key={manager.id}>{manager.name} - {manager.email}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;
