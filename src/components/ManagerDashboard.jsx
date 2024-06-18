import React, { useState, useEffect } from 'react';
import EmployeeForm from './EmployeeForm';
import TodoList from './TodoList';
import './TodoList.css';
import axios from 'axios';

const ManagerDashboard = ({ currentUser }) => {
  // State to store tasks and employees
  const [tasks, setTasks] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [editingEmployee, setEditingEmployee] = useState(null);

  // Load employees and tasks on component mount
  useEffect(() => {
    loadEmployees();
    loadTasks();
  }, []);

  // Function to load mock employees data
  const loadEmployees = () => {
    const storedEmployees = [
      // { id: '1', name: 'Elewa', email: 'elewa@gmail.com', role: 'Developer', department: 'Engineering', password: '12345' },
      // { id: '2', name: 'Interview', email: 'interview@gmail.com', role: 'Designer', department: 'Design', password: '67890' },
    ];
    setEmployees(storedEmployees);
  };

  // Function to load mock tasks data
  const loadTasks = () => {
    const storedTasks = [
      // { id: '1', name: 'Task 1', dueDate: '2024-06-20', assignee: '1', status: '' },
      // { id: '2', name: 'Task 2', dueDate: '2024-06-22', assignee: '2', status: '' },
    ];
    setTasks(storedTasks);
    localStorage.setItem('tasks', JSON.stringify(storedTasks)); // Store tasks in local storage
  };

  // Function to handle adding a new task
  const handleAddTask = (newTask) => {
    setTasks([...tasks, newTask]);
    localStorage.setItem('tasks', JSON.stringify([...tasks, newTask]));
  };

  // Function to handle adding a new employee
  const handleAddEmployee = async (newEmployee) => {
    setEmployees([...employees, newEmployee]);
    
    const user = localStorage.getItem('user');
    if (user) {
      const parsedUser = JSON.parse(user);
      localStorage.setItem('user', JSON.stringify([...parsedUser, newEmployee]));
    } else {
      localStorage.setItem('user', JSON.stringify([newEmployee]));
    }
    alert('New employee added successfully');
  };

  // Function to handle deleting a task
  const handleDeleteTask = (index) => {
    const updatedTaskList = [...tasks];
    updatedTaskList.splice(index, 1);
    setTasks(updatedTaskList);
    localStorage.setItem('tasks', JSON.stringify(updatedTaskList)); // Update tasks in local storage
  };

  // Function to set the employee to be edited
  const handleEditEmployee = (employee) => {
    setEditingEmployee(employee);
  };

  // Function to handle deleting an employee
  const handleDeleteEmployee = (employeeId) => {
    const updatedEmployees = employees.filter(employee => employee.id !== employeeId);
    setEmployees(updatedEmployees);
  };

  // Function to handle updating an employee
  const handleUpdateEmployee = (updatedEmployee) => {
    const updatedEmployees = employees.map(employee => 
      employee.id === updatedEmployee.id ? updatedEmployee : employee
    );
    setEmployees(updatedEmployees);
    setEditingEmployee(null); // Reset editing employee state
  };

  return (
    <div>
      <h1>Manager Dashboard</h1>

      <section>
        <h2>{editingEmployee ? 'Edit Employee' : 'Add Employee'}</h2>
        <EmployeeForm 
          onAddEmployee={handleAddEmployee} 
          onUpdateEmployee={handleUpdateEmployee} 
          editingEmployee={editingEmployee} 
        />
      </section>

      <section>
        <h2>Employees</h2>
        <ul>
          {employees.map(employee => (
            <li key={employee.id}>
              {employee.name} - {employee.email} - {employee.role} - {employee.department}
              <button className="edit-employee-button" onClick={() => handleEditEmployee(employee)}>Edit</button>
              <button className="delete-employee-button" onClick={() => handleDeleteEmployee(employee.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Assign Tasks</h2>
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
