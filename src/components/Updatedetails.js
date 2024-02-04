import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const UpdateTask = () => {
  const { id } = useParams();
  const history = useHistory();
  const [task, setTask] = useState({ description: '' });

  // Fetch the existing task details when the component mounts
  useEffect(() => {
    axios.get(`http://localhost:5000/tasks/tasks/${id}`)
      .then(response => {
        setTask({ description: response.data.description });
      })
      .catch(error => {
        console.error('Error fetching task details:', error);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.put(`http://localhost:5000/tasks/tasks/${id}`, { description: task.description })
      .then(response => {
        const { message } = response.data;
        toast.info(message, { position: "bottom-right" });
        history.replace(`/`);
      })
      .catch(error => {
        console.error('Error updating task:', error);
      });
  };

  return (
    <div className="container mt-4">
      <h2>Update Task</h2>
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
        <button type="submit" className="btn btn-warning">Update Task</button>
      </form>
    </div>
  );
};

export default UpdateTask;
