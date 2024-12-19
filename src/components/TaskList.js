import React from 'react';
import "../styles/TaskLisk.scss";

const TaskList = () => {
  const tasks = [
    {
      title: 'Create a user flow of social application design',
      status: 'Approved',
    },
    {
      title: 'Create a user flow of social application design',
      status: 'In review',
    },
    {
      title: 'Landing page design for Fintech project of singapore',
      status: 'In review',
    },
    {
      title: 'Interactive prototype for app screens of deltainme project',
      status: 'On going',
    },
    {
      title: 'Interactive prototype for app screens of deltainme project',
      status: 'Approved',
    }
  ];

  return (
    <div className="taskListContainer">
      <h2>Today's Task</h2>
      <div className="filters">
        <li>All</li>
        <li>Important</li>
        <li>Notes</li>
        <li>Links</li>
      </div>
      <div className="tasks">
        {tasks.map((task, index) => (
          <div className="task" key={index}>
            <label className="custom-checkbox">
              <input type="checkbox" />
              <span className="checkmark"></span>
            </label>
            <span className="task-title">{task.title}</span>
            <span className={`status ${task.status.toLowerCase().replace(' ', '-')}`}>
              {task.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;
