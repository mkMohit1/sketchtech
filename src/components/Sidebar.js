import React, { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import images from "../ImagePath";
import "../styles/SideBar.scss";

const SideBar = ({ currentContainer, updateContainer, ulList }) => {
  const [activeItem, setActiveItem] = useState(currentContainer);
  const navigate = useNavigate();

  const handleClick = (containerName) => {
    setActiveItem(containerName);
    updateContainer(containerName); // Update the parent component's state
    navigate(`/${containerName.toLowerCase()}`); // Update the URL
  };

  return (
    <div className="sideBarContainer">
      <div className="userProfile">
        <div className="userImage">
          <img src={images.user} alt="userImage" />
          <div className="sideNotification">7</div>
        </div>
        <div className="sideInfo">
          <div className="userName">Samantha</div>
          <div className="userEmail">samantha@email.com</div>
        </div>
      </div>
      <div className="sideBarlist">
        <ul>
          {ulList.map((item, index) => (
            <li
              key={index}
              onClick={() => handleClick(item)}
              className={activeItem === item ? "active" : ""}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

SideBar.propTypes = {
  currentContainer: PropTypes.string.isRequired,
  updateContainer: PropTypes.func.isRequired,
  ulList: PropTypes.array.isRequired,
};

export default SideBar;
