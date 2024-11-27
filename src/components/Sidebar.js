import React from "react";
import images from "../ImagePath";
import "../styles/SideBar.scss";

const SideBar =()=>{
    return(
        <div className="sideBarContainer"> 
            <div className="userProfile">
                <div className="userImage">
                    <img src={images.user} alt="userImage"/>
                    <div className="sideNotification">7</div>
                </div>
                <div className="sideInfo">
                    <div className="userName">Samantha</div>
                    <div className="userEmail">samantha@email.com</div>
                </div>
            </div>
            <div className="sideBarlist">
                    <ul>
                        <li>Dashboard</li>
                        <li>Buy More</li>
                        <li>Wallets</li>
                        <li>Support</li>
                        <li>Accounts</li>
                        <li>Settings</li>
                    </ul>
                </div>
        </div>
    );
};

export default SideBar;