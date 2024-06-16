import React, { useState, useEffect } from 'react';

const EmployeeDashboard = ({ currentUser }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = () => {
    // Load tasks assigned to the employee from local storage or API
  };

  const markTaskInProgress = taskId => {
    // Mark a task as in progress
  };

  const markTaskCompleted = taskId => {
    // Mark a task as completed
  };

  return (
    <div>
      <h1>Employee Dashboard</h1>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            {task.title}
            <button onClick={() => markTaskInProgress(task.id)}>In Progress</button>
            <button onClick={() => markTaskCompleted(task.id)}>Completed</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmployeeDashboard;
