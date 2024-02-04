import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const TaskDetails = () => {
  const { id } = useParams();
  const [task, setTask] = useState(null);

  useEffect(() => {
    const fetchTaskDetails = () => {
      axios.get(`http://localhost:5000/tasks/tasks/${id}`)
        .then(response => {
          setTask(response.data);
        })
        .catch(error => {
          console.error(error.message);
        });
    };

    fetchTaskDetails();
  }, [id]);

  return (
    <div className="container mt-4">
      <h2>Task Details</h2>
      {task ? (
        <div>
          <p>{task.description}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <Link to={`/update/${id}`} className="btn  btn-warning mt-3">Update Task</Link>
    </div>
  );
};

export default TaskDetails;
