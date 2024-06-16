import React, { useState, useEffect } from 'react';

const AdminDashboard = ({ currentUser }) => {
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    loadUsers();
    loadTasks();
    loadDepartments();
  }, []);

  const loadUsers = () => {
    // Load users from local storage or API
  };

  const loadTasks = () => {
    // Load tasks from local storage or API
  };

  const loadDepartments = () => {
    // Load departments from local storage or API
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <div>
        <h2>Users</h2>
        <ul>
          {users.map(user => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Departments</h2>
        <ul>
          {departments.map(department => (
            <li key={department.id}>{department.name}</li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Tasks</h2>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>{task.title}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;
