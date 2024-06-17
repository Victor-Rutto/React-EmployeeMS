import React, { useState, useEffect } from 'react';

const EmployeeDashboard = ({ currentUser }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = () => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
    // Load tasks assigned to the employee from local storage or API
  };

  const markTaskInProgress = (taskId) => {
    const updatedTasks = tasks.map(task => 
      task.id === taskId ? { ...task, status: 'In Progress' } : task
    );
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const markTaskCompleted = (taskId) => {
    const updatedTasks = tasks.map(task => 
      task.id === taskId ? { ...task, status: 'Completed' } : task
    );
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Employee Dashboard</h1>
      <ul style={styles.taskList}>
        {tasks.map(task => (
          <li key={task.id} style={styles.taskItem}>
            <span style={styles.taskName}>{task.name} - {task.status}</span>
            <div style={styles.buttonGroup}>
              {task.status !== 'Completed' && (
                <>
                  <button style={styles.button} onClick={() => markTaskInProgress(task.id)}>In Progress</button>
                  <button style={styles.button} onClick={() => markTaskCompleted(task.id)}>Completed</button>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    fontFamily: 'Arial, sans-serif'
  },
  title: {
    textAlign: 'center',
    color: '#333'
  },
  taskList: {
    listStyleType: 'none',
    padding: 0,
  },
  taskItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px',
    borderBottom: '1px solid #ddd',
    marginBottom: '10px',
  },
  taskName: {
    flexGrow: 1,
  },
  buttonGroup: {
    display: 'flex',
    gap: '10px',
  },
  button: {
    padding: '8px 12px',
    backgroundColor: '#007BFF',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default EmployeeDashboard;
