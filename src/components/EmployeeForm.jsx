import React, { useState, useEffect } from 'react';
import './EmployeeForm.css';

const EmployeeForm = ({ onAddEmployee, onUpdateEmployee, editingEmployee }) => {
  // Initialize state for employee form fields
  const [employee, setEmployee] = useState({ name: '', email: '', role: '', department: '', password: '' });

  // UseEffect hook to update form fields if editingEmployee changes
  useEffect(() => {
    if (editingEmployee) {
      setEmployee(editingEmployee); // Populate form fields with existing employee data
    } else {
      setEmployee({ name: '', email: '', role: '', department: '', password: '' }); // Reset form fields
    }
  }, [editingEmployee]);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value }); // Update state with new value
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (employee.name && employee.email && employee.role && employee.department && employee.password) {
      if (editingEmployee) {
        onUpdateEmployee(employee); // Update existing employee
      } else {
        onAddEmployee({ ...employee, id: Date.now().toString() }); // Add new employee
      }
      setEmployee({ name: '', email: '', role: '', department: '', password: '' }); // Reset form fields
    }
  };

  return (
    <form onSubmit={handleSubmit} className="employee-form">
      <input
        type="text"
        name="name"
        value={employee.name}
        onChange={handleChange}
        placeholder="Name"
        required
        className="form-input"
      />
      <input
        type="email"
        name="email"
        value={employee.email}
        onChange={handleChange}
        placeholder="Email"
        required
        className="form-input"
      />
      <input
        type="text"
        name="role"
        value={employee.role}
        onChange={handleChange}
        placeholder="Role"
        required
        className="form-input"
      />
      <input
        type="text"
        name="department"
        value={employee.department}
        onChange={handleChange}
        placeholder="Department"
        required
        className="form-input"
      />
      <input
        type="text"
        name="password"
        value={employee.password}
        onChange={handleChange}
        placeholder="Password"
        required
        className="form-input"
      />
      <button type="submit" className="form-button">{editingEmployee ? 'Update Employee' : 'Add Employee'}</button>
    </form>
  );
};

export default EmployeeForm;
