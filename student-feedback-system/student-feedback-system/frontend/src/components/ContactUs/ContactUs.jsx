// import React, { useState } from 'react';
// import './ContactUs.css';

// const ContactUs = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     subject: '',
//     message: ''
//   });

//   const [isSubmitted, setIsSubmitted] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Here you would typically send the form data to your backend
//     console.log('Form submitted:', formData);
//     setIsSubmitted(true);
//     setFormData({
//       name: '',
//       email: '',
//       subject: '',
//       message: ''
//     });
    
//     // Reset submission status after 3 seconds
//     setTimeout(() => {
//       setIsSubmitted(false);
//     }, 3000);
//   };

//   return (
//     <div className="contact-us-container">
//       <div className="contact-header">
//         <h1>Contact Us</h1>
//         <p>Have questions or feedback? We'd love to hear from you!</p>
//       </div>

//       <div className="contact-content">
//         <div className="contact-info">
//           <div className="info-card">
//             <div className="info-icon">
//               <i className="fas fa-map-marker-alt"></i>
//             </div>
//             <h3>Our Location</h3>
//             <p>123 Education Street, Learning City, LC 12345</p>
//           </div>

//           <div className="info-card">
//             <div className="info-icon">
//               <i className="fas fa-envelope"></i>
//             </div>
//             <h3>Email Us</h3>
//             <p>support@speakupedu.com</p>
//           </div>

//           <div className="info-card">
//             <div className="info-icon">
//               <i className="fas fa-phone-alt"></i>
//             </div>
//             <h3>Call Us</h3>
//             <p>+1 (555) 123-4567</p>
//           </div>
//         </div>

//         <div className="contact-form-container">
//           <h2>Send Us a Message</h2>
//           {isSubmitted && (
//             <div className="success-message">
//               Thank you for your message! We'll get back to you soon.
//             </div>
//           )}
//           <form onSubmit={handleSubmit} className="contact-form">
//             <div className="form-group">
//               <label htmlFor="name">Your Name</label>
//               <input
//                 type="text"
//                 id="name"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 required
//                 placeholder="Enter your name"
//               />
//             </div>

//             <div className="form-group">
//               <label htmlFor="email">Your Email</label>
//               <input
//                 type="email"
//                 id="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 required
//                 placeholder="Enter your email"
//               />
//             </div>

//             <div className="form-group">
//               <label htmlFor="subject">Subject</label>
//               <input
//                 type="text"
//                 id="subject"
//                 name="subject"
//                 value={formData.subject}
//                 onChange={handleChange}
//                 required
//                 placeholder="What's this about?"
//               />
//             </div>

//             <div className="form-group">
//               <label htmlFor="message">Your Message</label>
//               <textarea
//                 id="message"
//                 name="message"
//                 value={formData.message}
//                 onChange={handleChange}
//                 required
//                 rows="5"
//                 placeholder="Type your message here..."
//               ></textarea>
//             </div>

//             <button type="submit" className="submit-btn">
//               Send Message
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ContactUs;

import React, { useState } from 'react';
import './ContactUs.css';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Success:', data.message);
        setIsSubmitted(true);
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });

        setTimeout(() => {
          setIsSubmitted(false);
        }, 3000);
      } else {
        console.error('Error:', data.error);
        alert(data.error || 'Submission failed. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Something went wrong. Please try again later.');
    }
  };

  return (
    <div className="contact-us-container">
      <div className="contact-header">
        <h1>Contact Us</h1>
        <p>Have questions or feedback? We'd love to hear from you!</p>
      </div>

      <div className="contact-content">
        <div className="contact-info">
          <div className="info-card">
            <div className="info-icon">
              <i className="fas fa-map-marker-alt"></i>
            </div>
            <h3>Our Location</h3>
            <p>123 Education Street, Learning City, LC 12345</p>
          </div>

          <div className="info-card">
            <div className="info-icon">
              <i className="fas fa-envelope"></i>
            </div>
            <h3>Email Us</h3>
            <p>support@speakupedu.com</p>
          </div>

          <div className="info-card">
            <div className="info-icon">
              <i className="fas fa-phone-alt"></i>
            </div>
            <h3>Call Us</h3>
            <p>+1 (555) 123-4567</p>
          </div>
        </div>

        <div className="contact-form-container">
          <h2>Send Us a Message</h2>
          {isSubmitted && (
            <div className="success-message">
              Thank you for your message! We'll get back to you soon.
            </div>
          )}
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <label htmlFor="name">Your Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter your name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Your Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter your email"
              />
            </div>

            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                placeholder="What's this about?"
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Your Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="5"
                placeholder="Type your message here..."
              ></textarea>
            </div>

            <button type="submit" className="submit-btn">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
