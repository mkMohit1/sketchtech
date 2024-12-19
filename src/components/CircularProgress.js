import React from "react";
import "../styles/CircularProgress.scss";

const CircularProgress = ({ value }) => {
  // Determine the color based on the progress value
  const getColor = (value) => {
    if (value === 100) return "#28a745"; // Green
    if (value > 50 && value < 100) return "#ef3935"; // Red
    if (value === 50) return "#ff9900"; // Orange
    if (value < 50) return "#ffc107"; // Yellow
  };

  return (
    <div className="circular-progress">
      <svg viewBox="0 0 36 36" className="circular-chart">
        {/* Circle Background */}
        <path
          className="circle-bg"
          d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
        />
        {/* Circle Progress */}
        <path
          className="circle"
          stroke={getColor(value)}
          strokeDasharray={`${value}, 100`}
          d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
        />
      </svg>
      <div className="percentage">{value}%</div>
    </div>
  );
};

export default CircularProgress;
