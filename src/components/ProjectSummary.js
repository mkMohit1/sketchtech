import React from "react";
import "../styles/ProjectSummary.scss";
import CircularProgress from "./CircularProgress";

const ProjectSummary = () => {
  const projects = [
    {
      name: "Nelsa web development",
      manager: "Om prakash sao",
      dueDate: "May 25, 2023",
      status: "Completed",
      progress: 100,
    },
    {
      name: "Datascale AI app",
      manager: "Neilsan mando",
      dueDate: "Jun 20, 2023",
      status: "Delayed",
      progress: 36,
    },
    {
      name: "Media channel branding",
      manager: "Tiruvelly priya",
      dueDate: "Jul 13, 2023",
      status: "At risk",
      progress: 68,
    },
    {
      name: "Corlax iOS app development",
      manager: "Matte hannery",
      dueDate: "Dec 20, 2023",
      status: "Completed",
      progress: 100,
    },
    {
      name: "Website builder development",
      manager: "Sukumar rao",
      dueDate: "Mar 15, 2024",
      status: "On going",
      progress: 50,
    },
  ];

  return (
    <div className="project-summary">
      <div className="header">
        <h3>Project summary</h3>
        <div className="filters">
          <select>
            <option>Project</option>
          </select>
          <select>
            <option>Project manager</option>
          </select>
          <select>
            <option>Status</option>
          </select>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Project manager</th>
            <th>Due date</th>
            <th>Status</th>
            <th>Progress</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project, index) => (
            <tr key={index}>
              <td>{project.name}</td>
              <td>{project.manager}</td>
              <td>{project.dueDate}</td>
              <td className={`status ${project.status.toLowerCase().replace(" ", "-")}`}>
                {project.status}
              </td>
              <td>
                <div className="progress">
                  <CircularProgress value={project.progress}/>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectSummary;
