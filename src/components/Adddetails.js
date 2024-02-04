import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const AddTask = () => {
  const history = useHistory();
  const [task, setTask] = useState({ description: '' });
  const userId = sessionStorage.getItem('userid');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    axios.post('http://localhost:5000/tasks/tasks', { user_id: userId, description: task.description })
      .then(response => {
        const { message } = response.data;
        console.log(message);
        toast.success(message, { position: "bottom-right" });
        history.replace(`/`);
      })
      .catch(error => {
        console.error('Error adding new task:', error);
      });
  };

  return (
    <div className="container mt-4">
      <h2>Add New Task</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description:</label>
          <input
            type="text"
            className="form-control"
            id="description"
            value={task.description}
            onChange={(e) => setTask({ ...task, description: e.target.value })}
          />
        </div>
        <button type="submit" className="btn btn-primary">Add Task</button>
      </form>
    </div>
  );
};

export default AddTask;
