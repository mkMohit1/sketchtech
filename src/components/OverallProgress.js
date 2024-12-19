import React from 'react';
import '../styles/OverallProgress.scss';

const OverallProgress = ({ totalProjects, completed, delayed, ongoing }) => {
  const totalCompleted = completed;
  const totalDelayed = delayed;
  const totalOngoing = ongoing;
  const totalCompleted_Percentage = (totalCompleted / totalProjects) * 100;

  return (
    <div className="overall-progress">
      <div className="progress-circle">
        <div className="progress-text">
          <span>{totalCompleted_Percentage.toFixed(0)}%</span>
        </div>
        <div
          className="progress-bar"
          style={{
            background: `conic-gradient(
              #34d399 0%,
              #34d399 ${totalCompleted_Percentage}%,
              #d1d5db ${totalCompleted_Percentage}%,
              #d1d5db 100%
            )`,
          }}
        />
      </div>
      <div className="project-info">
        <p>Total Projects: 95</p>
        <p>Completed: 26</p>
        <p>Delayed:35</p>
        <p>Ongoing: 35</p>
      </div>
    </div>
  );
};

export default OverallProgress;