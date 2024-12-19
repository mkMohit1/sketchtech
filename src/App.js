import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import MainContainer from "./components/MainContainer";
import SideBar from "./components/Sidebar";
import "font-awesome/css/font-awesome.min.css";
import LoginPage from "./components/LoginPage";

function App() {
  const [userSignIn, setUserSignIn] = useState(false);
  const [userRole, setUserRole] = useState("");
  const [ulList, setUlList] = useState([]);
  const [currentUserID, setCurrentUserID]= useState(null);
  const currentUrl = window.location.href.split("/");
  console.log(currentUrl[currentUrl.length-1]);
  const [currentContainer, setCurrentContainer] = useState(currentUrl.length>0?currentUrl[currentUrl.length-1]:"Dashboard");

  useEffect(() => {
    const isAdmin = localStorage.getItem("User/Admin");
    const user = localStorage.getItem("loggedInUserMobileNumber");
    const fetchUser = async()=>{
        try {
          const allUserResponse = await fetch('https://server-lmhc.onrender.com/users');
          const allUsers = await allUserResponse.json();
          console.log(allUsers);
          setCurrentUserID()
        } catch (error) {
          console.log(error);
        }
    };
    fetchUser();
    if (user) {
      setUserSignIn(true);
      if (isAdmin == 'true') {
        setUserRole("admin");
        setUlList(["Dashboard", "Blogs", "Ebook", "Media", "Contact", "Careers"]);
      } else {
        setUserRole("user");
        setUlList(["Dashboard", "Buy More", "Wallet", "Support", "Account", "Settings"]);
      }
    }
  }, []);

  const handleUpdateLogin = (role) => {
    setUserSignIn(true);
    if (role === "admin") {
      setUserRole("admin");
      setUlList(["Dashboard", "Blogs", "Ebook", "Media", "Careers"]);
    } else {
      setUserRole("user");
      setUlList(["Dashboard", "Buy More", "Wallet", "Support", "Account", "Settings","Contact"]);
    }
  };

  const updateContainer = (containerName) => {
    setCurrentContainer(containerName); // Update the selected container
  };

  return (
    <Router>
      <div className="App">
        {userSignIn ? (
          <>
            <SideBar
              ulList={ulList}
              currentContainer={currentContainer}
              updateContainer={updateContainer}
            />
            <div className="main-content">
              <MainContainer currentContainer={currentContainer} updateContainer={updateContainer} />
            </div>
          </>
        ) : (
          <LoginPage handleUpdateLogin={handleUpdateLogin} />
        )}
      </div>
    </Router>
  );
}

export default App;
