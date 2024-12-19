import React from "react";
import BlogsContainer from "../Pages/BlogsContainer";
import Dashboard from "./Dashboard";
import "../styles/MainContainer.scss";
import BlogForm from "../Pages/BlogForm";
// import Ebook from "../Pages/Ebook";
import LetsTalkComponent from "../Pages/Contact";
import Setting from "./Setting";
import AccountSettings from "./AccountSettings";

const MainContainer = ({ currentContainer,updateContainer }) => {
  const renderContainer = (updateContainer) => {
    switch (currentContainer) {
      case "Dashboard":
        return <Dashboard />;
      case "Blogs":
        return <BlogsContainer updateContainer={updateContainer} />;
      case 'BlogForm':
        return <BlogForm updateContainer={updateContainer}/>;
        case 'Contact':
          return <LetsTalkComponent/>;
          case 'settings':
          return <Setting/>;
          case 'account':
          return <AccountSettings/>;
      // case "Ebook":
      //   return <Ebook />;
      // case "Contact":
      //   return <Contact />;
      default:
        return <Dashboard />;
    }
  };

  return <div className="mainContainer">{renderContainer(updateContainer)}</div>;
};

export default MainContainer;
  