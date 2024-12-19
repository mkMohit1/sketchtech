import React from "react";
import "../styles/DashboardHeader.scss";
import images from "../ImagePath";
const DashboardHeader = () => {
  return (
    <header className="dashboard-header">
      {/* Left Section: Dashboard Title */}
      <div className="header-left">
        <h1>Dashboard</h1>
      </div>

      {/* Center Section: Search Bar */}
      <div className="header-center">
        <input
          type="text"
          placeholder="Search for anything..."
          className="search-bar"
        />
      </div>

      {/* Right Section: Profile & Notifications */}
      <div className="header-right">
        <button className="notification-icon">
          <i className="bell-icon">🔔</i>
        </button>
        <div className="profile">
          <img
            src={images.user}
            alt="User"
            className="profile-img"
          />
          <div className="profile-info">
            <p>Samantha</p>
            <span>Product manager</span>
          </div>
          <i className="dropdown-icon">▼</i>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
