import React, { useEffect, useState } from 'react';
import '../styles/Contact.scss';
import images from '../ImagePath';

const LetsTalkComponent = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    mobile: '',
  });

  const [status, setStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false); // Track submission state

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    setIsSubmitting(true); // Disable button while submitting

    try {
      const response = await fetch('http://localhost:5000/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('Your message has been sent successfully!');
        setFormData({ name: '', email: '', message: '', mobile: formData.mobile }); // Reset form but keep mobile
      } else {
        const errorText = await response.text();
        setStatus(`Failed to send your message. Error: ${errorText}`);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setStatus('An error occurred. Please try again later.');
    } finally {
      setIsSubmitting(false); // Re-enable the button
    }
  };

  // Use to store the mobile number from localStorage
  useEffect(() => {
    const mobileNumber = localStorage.getItem('loggedInUserMobileNumber');
    if (mobileNumber) {
      setFormData((prevFormData) => ({ ...prevFormData, mobile: mobileNumber }));
    }
  }, []);

  console.log(formData); // Debug log

  return (
    <div className="lets-talk-component">
      <header className="header">
        <div className="logo">SN</div>
        <div className="follow-me">FOLLOW ME</div>
      </header>
      <main className="main">
        <div className="contactRight">
          <div className="BigCircle">
            <div className="SmallCircle sm1"></div>
            <div className="SmallCircle sm2"></div>
          </div>
          <img className="image1" src={images.ContactImg1} alt="contact image on right" />
          <img className="image2" src={images.ContactImg2} alt="contact image on right" />
          <img className="image3" src={images.ContactImg3} alt="contact image on right" />
        </div>
        <div className="content">
          <h1 className="title">Let's talk!</h1>
          <div className="statue-of-liberty">
            <img src={images.StatusOfLiberty} alt="Statue of Liberty" />
          </div>
          <form className="form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
              required
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email address"
              required
            />
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Message"
              required
            ></textarea>
            <button
              className="submit-button"
              type="submit"
              disabled={isSubmitting} // Disable button during submission
            >
              {isSubmitting ? 'Sending...' : "Let's talk"}
            </button>
          </form>
          {status && <p className="status-message">{status}</p>}
        </div>
      </main>
    </div>
  );
};

export default LetsTalkComponent;
