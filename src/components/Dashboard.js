import React from "react";
import "../styles/Dashboard.scss";
import DashboardHeader from "./DasboardHeader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faClock,faUser} from "@fortawesome/free-regular-svg-icons";
import {faBriefcase,faSignal} from "@fortawesome/free-solid-svg-icons";
import ProjectSummary from "./ProjectSummary";
import OverallProgress from "./OverallProgress";
import TaskList from "./TaskList";

const Dashboard = () => {
  return (
    <div className="dashboard">
        <DashboardHeader/>
      <div className="dashboard-overview">
        <div className="card">
        <FontAwesomeIcon icon={faSignal} style={{backgroundColor:"#d398e7",color:"white",padding:7,borderRadius:'50%'}} />
          <h4>Total Revenue</h4>
          <p>$53,009.89</p>
          <span><span style={{color:"#289839"}}>&#8599;</span>12% increase from last month</span>
        </div>
        <div className="card">
        <FontAwesomeIcon icon={faBriefcase} style={{backgroundColor:"#e89271",color:"white",padding:7,borderRadius:'50%'}} />
          <h4>Projects</h4>
          <p>95 / 100</p>
          <span><span style={{color:"#ef3935"}}>&#8600;</span>10% decrease from last month</span>
        </div>
        <div className="card">
        <FontAwesomeIcon icon={faClock} style={{backgroundColor:"#70a1e5",color:"white",padding:7,borderRadius:'50%'}} />
          <h4>Time Spent</h4>
          <p>1022 / 1300 Hrs</p>
          <span><span style={{color:"#289839"}}>&#8599;</span>2% increase from last month</span>
        </div>
        <div className="card">
        <FontAwesomeIcon icon={faUser} style={{backgroundColor:"#f0c274",color:"white",padding:7,borderRadius:'50%'}} />
          <h4>Resources</h4>
          <p>101 / 120</p>
          <span><span style={{color:"#289839"}}>&#8599;</span>2% increase from last month</span>
        </div>
      </div>
      <div className="dashboard-details">
        <ProjectSummary />
        <OverallProgress />
      </div>
      <TaskList />
    </div>
  );
};

export default Dashboard;
