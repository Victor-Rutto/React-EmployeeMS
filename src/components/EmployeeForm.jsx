import React, { useState } from 'react';

const EmployeeForm = ({ onAddEmployee }) => {
  const [employee, setEmployee] = useState({ name: '', email: '', role: '', department: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (employee.name && employee.email && employee.role && employee.department) {
      onAddEmployee({ ...employee, id: Date.now().toString() });
      setEmployee({ name: '', email: '', role: '', department: '' });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={employee.name}
        onChange={handleChange}
        placeholder="Name"
      />
      <input
        type="email"
        name="email"
        value={employee.email}
        onChange={handleChange}
        placeholder="Email"
      />
      <input
        type="text"
        name="role"
        value={employee.role}
        onChange={handleChange}
        placeholder="Role"
      />
      <input
        type="text"
        name="department"
        value={employee.department}
        onChange={handleChange}
        placeholder="Department"
      />
      <button type="submit">Add Employee</button>
    </form>
  );
};

export default EmployeeForm;