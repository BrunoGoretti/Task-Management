import React, { useEffect, useState } from "react";

function TaskList() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/tasks")
      .then((response) => response.json())
      .then((data) => setTasks(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="background-container">
      <div className="task-list-container">
        <h2>Task List</h2>
        <table className="task-table">
          <thead>
            <tr>
              <th>Task Name</th>
              <th>Description</th>
              <th>Completed</th>
              <th>Created At</th> 
              <th>Completed At</th> 
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task._id}>
                <td>{task.task_name}</td>
                <td>{task.task_description}</td>
                <td>{task.is_completed ? "Yes" : "No"}</td>
                <td>{task.created_at}</td> 
                <td>{task.completed_at}</td> 
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TaskList;
