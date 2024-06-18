import React, { useState } from 'react';

const TodoList = ({ employees, onAddTask }) => {
  const [task, setTask] = useState({ name: '', dueDate: '', assignee: '' }); 

  // Function to handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value }); // Update task state with new values
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    if (task.name && task.dueDate) { // Check if task name and due date are provided
      onAddTask({ ...task, id: Date.now().toString() }); // Call onAddTask function with updated task object
      setTask({ name: '', dueDate: '', assignee: '' }); // Clear input fields after adding task
    }
  };

  return (
    <form onSubmit={handleSubmit}> {/* Form with onSubmit handler */}
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
          <option key={emp.id} value={emp.id}>{emp.name}</option> // Populate select options with employee names
        ))}
      </select>
      <button type="submit">Assign a  Task</button> {/* Submit button to add task */}
    </form>
  );
};

export default TodoList;
