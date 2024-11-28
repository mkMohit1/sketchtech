import React from "react";
import "../styles/MainContainer.scss";
import Setting from "./Setting";

const MainContainer=(children)=>{
    return(
        <div className="mainContainer">
            <Setting/>
        </div>
    )
};

export default MainContainer;