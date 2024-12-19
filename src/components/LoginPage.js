import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/LoginPage.scss";
import images from "../ImagePath";
import PopupNewUser from "./PopupNewUser";
 

const LoginPage = ({handleUpdateLogin}) => {
  const [otp, setOtp] = useState("");
  const [enteredOtp, setEnteredOtp] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isUser, setIsUser] = useState(false);
  const [userID, setUserID] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [loginWithWhatsapp, setLoginWithWhatsapp] = useState(false);
  const [otpFieldVisible, setOtpFieldVisible] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  //const navigate = useNavigate();

  const generateOtp = () => {
    let otp = "";
    for (let i = 0; i < 4; i++) {
      otp += Math.floor(Math.random() * 9) + 1;
    }
    return otp;
  };

  const handleSendOtp = async (event) => {
    console.log('mk start');
    event.preventDefault();
    if (!/^\d{10}$/.test(mobileNumber)) {
      setErrorMessage("Please enter a valid mobile number.");
      return;
    }
    const allUserResponse = await fetch('https://server-lmhc.onrender.com/users');
    const allUsers = await allUserResponse.json();
    console.log(allUsers.length);
    const existingUser = allUsers.length>0? allUsers.find((user) => user.mobileNumber === mobileNumber):'';
    console.log(existingUser);
    if(!existingUser){
          setIsUser(true);
          return;
    }
    const newOtp = generateOtp();
    setOtp(newOtp);
    console.log(newOtp);
    try {
      console.log("Sending OTP to:", mobileNumber);

      const response = await axios.post(
        `https://server-lmhc.onrender.com/send-otp`,
        { mobileNumber: mobileNumber, otp: newOtp }
      );

      if (response.status === 200) {
        setSuccessMessage("OTP sent successfully via Voice OTP.");
        setErrorMessage("");
        setOtpFieldVisible(true);
        setOtpSent(true);
        sessionStorage.setItem("whatsappOtp", newOtp);
        sessionStorage.setItem("User/Admin", existingUser.isAdmin);
        setUserID(existingUser._id);
        console.log("OTP sent and stored in local storage:", newOtp);
      } else {
        setErrorMessage("Failed to send OTP. Please try again.");
      }
    } catch (error) {
      setErrorMessage("Failed to send OTP. Please try again.");
      console.error(
        "Error sending OTP:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const handleSubmitOtp = async (event) => {
    event.preventDefault();
    const storedOtp = sessionStorage.getItem("whatsappOtp");

    if (enteredOtp === storedOtp) {
      const formattedMobileNumber = mobileNumber.replace(/^(\+91|91|0)/, "");
      sessionStorage.setItem("loggedInUserMobileNumber", formattedMobileNumber);
      setSuccessMessage("Login successful!");
      const isAdmin = sessionStorage.getItem("User/Admin");
      setErrorMessage("");
      handleUpdateLogin(isAdmin, userID);
      // navigate("/dashboard/home");
    } else {
      setErrorMessage("Invalid OTP. Please try again.");
      setSuccessMessage("");
    }
  };

  const handleLoginWithWhatsapp = (event) => {
    event.preventDefault(); // Prevent form submission
    setLoginWithWhatsapp(true);
    setOtpFieldVisible(false); // Hide OTP field
    setOtpSent(false); // Reset OTP sent status
    setErrorMessage(""); // Clear any error messages
    setSuccessMessage(""); // Clear any success messages
  };

  const handleRequestOtpWithWhatsapp = async (event) => {
    event.preventDefault();
    if (!/^\d{10}$/.test(mobileNumber)) {
      setErrorMessage("Please enter a valid mobile number.");
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/send-auth-whatsapp-message`,
        { to: `${mobileNumber}` }
      );

      if (response.status === 200) {
        setSuccessMessage("OTP sent successfully via WhatsApp.");
        setErrorMessage("");
        setOtpFieldVisible(true);
        setOtpSent(true);
        const { otp: receivedOtp } = response.data;

        sessionStorage.setItem("whatsappOtp", receivedOtp);
        const formattedMobileNumber = mobileNumber.replace(/^(\+91|91|0)/, "");
        sessionStorage.setItem("loggedInUserMobileNumber", formattedMobileNumber);
        console.log("OTP received and stored in local storage:", receivedOtp);
        console.log(
          "Mobile number stored in local storage:",
          formattedMobileNumber
        );
      } else {
        setErrorMessage("Failed to send OTP via WhatsApp. Please try again.");
      }
    } catch (error) {
      setErrorMessage("Failed to send OTP via WhatsApp. Please try again.");
      console.error(
        "Error sending OTP via WhatsApp:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const handleVoiceOtpLoginClick = (event) => {
    event.preventDefault(); // Prevent form submission
    setLoginWithWhatsapp(false);
    setOtpFieldVisible(false); // Hide OTP input field
    setOtpSent(false); // Reset OTP sent status
    setErrorMessage(""); // Clear any error messages
    setSuccessMessage(""); // Clear any success messages
  };

  const handlePopup =async(output)=>{
    if(output){
      const user = {
        userName: "Temp",
        mobileNumber: mobileNumber
      }
      console.log("new user mk");
      const addUserResponse = await fetch('https://server-lmhc.onrender.com/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
      });
      
      if (addUserResponse.ok) {
        setUserID(addUserResponse._id);
        console.log("User registered successfully");
      } else {
        const errorData = await addUserResponse.json();
        console.error("Error registering user:", errorData.message);
      }  
      setIsUser(false);
      const newOtp = generateOtp();
      setOtp(newOtp);
      console.log(newOtp);
      try {
        console.log("Sending OTP to:", mobileNumber);
  
        const response = await axios.post(
          `https://server-lmhc.onrender.com/send-otp`,
          { mobileNumber: mobileNumber, otp: newOtp }
        );
  
        if (response.status === 200) {
          setSuccessMessage("OTP sent successfully via Voice OTP.");
          setErrorMessage("");
          setOtpFieldVisible(true);
          setOtpSent(true);
          sessionStorage.setItem("whatsappOtp", newOtp);
          sessionStorage.setItem("User/Admin", false);
          console.log("OTP sent and stored in local storage:", newOtp);
        } else {
          setErrorMessage("Failed to send OTP. Please try again.");
        }
      } catch (error) {
        setErrorMessage("Failed to send OTP. Please try again.");
        console.error(
          "Error sending OTP:",
          error.response ? error.response.data : error.message
        );
      }
    }
    setIsUser(false);
    setMobileNumber("");
  }

  return (
    <div className="user-panel">
      <div className="user-panel__left">
        <div className="user-panel__content">
          <div className="user-panel__header">
            <img src={images.imageBlack} alt="login_text" className="logo" />
            <img src={images.loginSub} alt="login_subtext" className="subtext" />
          </div>
          <form onSubmit={enteredOtp ? handleSubmitOtp : handleSendOtp}>
            <div className="user-panel__message">
              {errorMessage && !loginWithWhatsapp && (
                <p className="error">{errorMessage}</p>
              )}
              {successMessage && <p className="success">{successMessage}</p>}
            </div>

            <div className="user-panel__input">
              {!otpFieldVisible && (
                <div className="input-container">
                  <input
                    type="text"
                    placeholder="Mobile Number"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    className="input-field"
                  />
                </div>
              )}
              {otpFieldVisible && (
                <div className="input-container">
                  <input
                    type="text"
                    placeholder="OTP"
                    value={enteredOtp}
                    onChange={(e) => setEnteredOtp(e.target.value)}
                    className="input-field"
                  />
                </div>
              )}
            </div>

            <div className="user-panel__actions">
              {loginWithWhatsapp ? (
                <button
                  type="submit"
                  onClick={otpSent ? handleSubmitOtp : handleRequestOtpWithWhatsapp}
                  className="button button--otp"
                >
                  {otpSent ? "Submit OTP" : "Request OTP"}
                </button>
              ) : (
                <button type="submit" className="button button--otp">
                  {enteredOtp ? "Submit OTP" : "Request OTP"}
                </button>
              )}
            </div>

            <p className="user-panel__alternative">
              <strong>Login</strong> with Others
            </p>

            <div className="user-panel__other-login">
              {!loginWithWhatsapp ? (
                <button className="button button--whatsapp" onClick={handleLoginWithWhatsapp}>
                  <img src="https://cdn-icons-png.flaticon.com/128/3670/3670051.png" alt="Whatsapp Logo" className="icon" />
                  <span>Login with WhatsApp</span>
                </button>
              ) : (
                <button className="button button--voice" onClick={handleVoiceOtpLoginClick}>
                  <img src="https://cdn-icons-png.flaticon.com/128/3616/3616215.png" alt="Call Logo" className="icon" />
                  <span>Login with Voice OTP</span>
                </button>
              )}

              <button className="button button--google">
                <img src={images.google} alt="Google Logo" className="icon" />
                <span>Login with Google</span>
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="user-panel__right" style={{ backgroundImage: `url(${images.loginImg})` }}>
        <div className="user-panel__image" >
          <img src={images.loginPage} alt="Tab Image" className="login-image" />
        </div>
      </div>
          {isUser?<PopupNewUser handlePopup={handlePopup} mobileNumber={mobileNumber}/>:""}  
    </div>
  );
};

export default LoginPage;
