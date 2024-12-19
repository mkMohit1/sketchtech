import React, { useState } from 'react';
import axios from 'axios';

const PhoneNumberInput = ({ onOtpSent }) => {
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSubmit = async () => {
    if (phoneNumber) {
      try {
        await axios.post('http://localhost:3000/send-otp', { phoneNumber });
        onOtpSent(phoneNumber);
      } catch (error) {
        console.error('Error sending OTP:', error);
      }
    } else {
      alert('Please enter a valid phone number');
    }
  };

  return (
    <div>
      <input
        type="text"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        placeholder="Enter phone number"
      />
      <button onClick={handleSubmit}>Send OTP</button>
    </div>
  );
};

export default PhoneNumberInput;
