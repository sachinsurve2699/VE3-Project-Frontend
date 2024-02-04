import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/tasks/tasks')
      .then(response => {
        setTasks(response.data);
      })
      .catch(error => {
        console.error('Error fetching tasks:', error);
      });
  }, []);

  const handleDelete = (taskId) => {
    axios.delete(`http://localhost:5000/tasks/tasks/${taskId}`)
      .then(() => {
        setTasks(tasks.filter(task => task.task_id !== taskId));
        toast.error('Task deleted successfully', { position: "bottom-right" });
      })
      .catch(error => {
        console.error('Error deleting task:', error);
      });
  };

  return (
    <div className="container mt-4">
      <h2>Task List</h2>
      <ul className="list-group">
        {tasks.map((task, index) => (
          <li key={task.task_id} className="list-group-item d-flex justify-content-between align-items-center">
            <Link to={`/tasks/${task.task_id}`} className="text-decoration-none">
              <h4>{`Task ${index + 1}`}</h4>
            </Link>
            <button className="btn btn-danger" onClick={() => handleDelete(task.task_id)}>Delete</button>
          </li>
        ))}
      </ul>
      <Link to="/add" className="btn btn-primary mt-3">Add New Task</Link>
    </div>
  );
};

export default TaskList;
