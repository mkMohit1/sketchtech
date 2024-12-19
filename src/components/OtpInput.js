import React, { useState } from 'react';
import axios from 'axios';

const OtpInput = ({ phoneNumber }) => {
  const [otp, setOtp] = useState('');

  const handleSubmit = async () => {
    if (otp) {
      try {
        await axios.post('http://localhost:3000/verify-otp', { phoneNumber, otp });
        alert('Authentication successful!');
      } catch (error) {
        console.error('Invalid OTP:', error);
        alert('Invalid OTP. Please try again.');
      }
    } else {
      alert('Please enter the OTP');
    }
  };

  return (
    <div>
      <input
        type="text"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        placeholder="Enter OTP"
      />
      <button onClick={handleSubmit}>Verify OTP</button>
    </div>
  );
};

export default OtpInput;
