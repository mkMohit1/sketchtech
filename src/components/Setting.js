import React, { useState } from "react";
import images from "../ImagePath";
import "../styles/Setting.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEnvelope,
  faPenToSquare,
} from "@fortawesome/free-regular-svg-icons";
import {
  faArrowRight,
  faArrowUpFromBracket,
  faCheck,
  faChevronDown,
  faChevronUp,
  faPhone,
  faShareNodes,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import PaymentSettings from "./PaymentSettings";

export default function Setting() {
  const [bgImage, setBgImage] = useState(images.backgroundImage);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [avatar, setAvatar] = useState(images.user); // State for the avatar image

  // Toggle dropdown icon
  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // Handle avatar upload
  const handleAvatarUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setAvatar(reader.result); // Update the avatar state
      };
      reader.readAsDataURL(file); // Convert file to base64
    }
  };

  // Handle background image upload
  const handleBackgroundUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setBgImage(reader.result); // Update the background image state
      };
      reader.readAsDataURL(file); // Convert file to base64
    }
  };
  return (
    <div className="settingContainer">
      {/* Header Section */}
      <div className="settingHeader">
        <div
          className="headerImage"
          style={{
            backgroundImage: `url(${bgImage})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
          <div className="updateBgImage">
            {/* Label links the FontAwesome icon to the file input */}
            <label htmlFor="backgroundUploadInput" style={{ cursor: "pointer" }}>
              <FontAwesomeIcon icon={faPenToSquare} style={{ color: "white" }} />
            </label>
            <input
              type="file"
              accept="image/*"
              id="backgroundUploadInput"
              style={{ display: "none" }}
              onChange={handleBackgroundUpload}
            />
          </div>
          <div className="userImage">
            <img src={avatar} alt="user" />
          </div>
        </div>
        <div className="headerBottom">
          <div className="userDetails">
            <div className="userName">Mohit Kumar</div>
            <div className="userEmail">mk@gmail.com</div>
          </div>
          <div className="additionFeature">
            <div className="shareicon">
              <div className="share">
                Share{" "}
                <FontAwesomeIcon
                  icon={faShareNodes}
                  style={{ color: "white", marginLeft: "2px" }}
                />
              </div>
              <div className="profile">
                View Profile{" "}
                <FontAwesomeIcon
                  icon={faArrowRight}
                  style={{ color: "white", marginLeft: "2px" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Body Section */}
      <div className="settingBody">
        <div className="personalInfo">
          <div className="infoTitle">
            <div className="infoHeader">Personal Info</div>
            <div className="infodetail">
              You can change your personal information settings here.
            </div>
          </div>
          <div className="infoContent">
            {/* Name Field */}
            <div className="infoItem name">
              <div className="infoLabel">Full Name</div>
              <div className="infoValue">
                <FontAwesomeIcon
                  icon={faUser}
                  style={{
                    top: "9px",
                    width: "20px",
                    left: "6px",
                    position: "absolute",
                  }}
                />
                <input type="text" defaultValue="Azusa Nakano" />
              </div>
            </div>

            {/* Email Field */}
            <div className="infoItem email">
              <div className="infoLabel">Email Address</div>
              <div className="infoValue">
                <FontAwesomeIcon
                  icon={faEnvelope}
                  style={{
                    top: "9px",
                    width: "20px",
                    left: "6px",
                    position: "absolute",
                  }}
                />
                <input type="email" defaultValue="elementary221b@gmail.com" />
              </div>
            </div>

            {/* Phone Field */}
            <div className="infoItem phone">
              <div className="infoLabel">Phone Number</div>
              <div className="infoValue">
                <FontAwesomeIcon
                  icon={faPhone}
                  style={{
                    top: "10px",
                    width: "20px",
                    left: "6px",
                    position: "absolute",
                  }}
                />
                <input type="tel" defaultValue="+91 (123) 456-9878" />
              </div>
            </div>

            {/* Account Type Dropdown */}
            <div className="infoItem account">
              <div className="infoLabel">Account Type</div>
              <div className="infoValue">
                <div
                  className="account"
                  onClick={handleDropdownToggle}
                  style={{
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                  }}
                >
                  <FontAwesomeIcon
                    icon={dropdownOpen ? faChevronUp : faChevronDown}
                    style={{
                      top: "20px",
                      width: "20px",
                      right: "6px",
                      position: "absolute",
                    }}
                  />
                  <select defaultValue="Regular">
                    <option value="Regular">Regular</option>
                    <option value="Pro">Pro</option>
                    <option value="Enterprise">Enterprise</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Avatar Upload */}
            <div className="infoItem avtar">
              <div className="infoLabel">Change Avatar</div>
              <div className="infoValue">
                <div className="avatarPreview">
                  <img src={avatar} alt="User Avatar" />
                </div>
                <div className="avatarUpload">
                  <input
                    type="file"
                    accept="image/*"
                    id="avatarUploadInput"
                    style={{ display: "none" }}
                    onChange={handleAvatarUpload}
                  />
                  <label htmlFor="avatarUploadInput" className="uploadLabel">
                    <FontAwesomeIcon
                      icon={faArrowUpFromBracket}
                      style={{ fontSize: 30 }}
                    />
                    <div className="avatartext">
                      Click here to upload your file or drag.
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <PaymentSettings/>
        <hr />
      </div>
      {/* footer section */}
      <div className="settingFooter">
        <div className="btn">
          Cancel{" "}<FontAwesomeIcon icon={faX}/>
        </div>
        <div className="btn">
          Save{" "}<FontAwesomeIcon icon={faCheck}/>
        </div>
      </div>
    </div>
  );
}
