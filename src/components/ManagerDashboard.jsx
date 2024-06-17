import React, { useState, useEffect } from 'react';
import EmployeeForm from './EmployeeForm';
import TodoList from './TodoList';
import './TodoList.css';
import axios from 'axios';

const ManagerDashboard = ({ currentUser }) => {
  const [tasks, setTasks] = useState([]);
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    loadEmployees();
    loadTasks();
  }, []);

  const loadEmployees = () => {
    // Mock employees data
    const storedEmployees = [
      { id: '1', name: 'John Doe', email: 'john.doe@example.com', role: 'Developer', department: 'Engineering' },
      { id: '2', name: 'Jane Smith', email: 'jane.smith@example.com', role: 'Designer', department: 'Design' },
    ];
    setEmployees(storedEmployees);
  };

  const loadTasks = () => {
    // Mock tasks data
    const storedTasks = [
      { id: '1', name: 'Task 1', dueDate: '2024-06-20', assignee: '1', status: '' },
      { id: '2', name: 'Task 2', dueDate: '2024-06-22', assignee: '2', status: ''  },
    ];
    setTasks(storedTasks);
    localStorage.setItem('tasks', JSON.stringify(storedTasks))
  };

  const handleAddTask = (newTask) => {
    setTasks([...tasks, newTask]);
    localStorage.setItem('tasks', JSON.stringify(tasks))
  };

  const handleAddEmployee = async (newEmployee) => {
    setEmployees([...employees, newEmployee]);
    const response = await axios.post('http://localhost:3001/api/users',{...newEmployee})
    if(response){
      alert('New employee added successfully')
    }
  };

  const handleDeleteTask = (index) => {
    const updatedTaskList = [...tasks];
    updatedTaskList.splice(index, 1);
    setTasks(updatedTaskList);
  };

  return (
    <div>
      <h1>Manager Dashboard</h1>

      <section>
        <h2>Add Employee</h2>
        <EmployeeForm onAddEmployee={handleAddEmployee} />
      </section>

      <section>
        <h2>Employees</h2>
        <ul>
          {employees.map(employee => (
            <li key={employee.id}>{employee.name} - {employee.email} - {employee.role} - {employee.department}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Add Task</h2>
        <TodoList employees={employees} onAddTask={handleAddTask} />
      </section>

      <section>
        <h2>Tasks</h2>
        <div className="todo-grid">
          {tasks.map((task, index) => (
            <div key={task.id} className="todo-item">
              <div>{task.name}</div>
              <div>Due: {task.dueDate}</div>
              <div>Assigned to: {employees.find(emp => emp.id === task.assignee)?.name || 'Unassigned'}</div>
              <button className="delete-todo-button" onClick={() => handleDeleteTask(index)}>
                Delete
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ManagerDashboard;