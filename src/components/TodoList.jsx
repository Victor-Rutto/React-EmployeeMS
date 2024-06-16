import React, { useState } from 'react';

const TodoList = ({ employees, onAddTask }) => {
  const [task, setTask] = useState({ name: '', dueDate: '', assignee: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.name && task.dueDate) {
      onAddTask({ ...task, id: Date.now().toString() });
      setTask({ name: '', dueDate: '', assignee: '' });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={task.name}
        onChange={handleChange}
        placeholder="Task Name"
      />
      <input
        type="date"
        name="dueDate"
        value={task.dueDate}
        onChange={handleChange}
      />
      <select name="assignee" value={task.assignee} onChange={handleChange}>
        <option value="">Select Assignee</option>
        {employees.map(emp => (
          <option key={emp.id} value={emp.id}>{emp.name}</option>
        ))}
      </select>
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TodoList;