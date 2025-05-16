// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import confetti from 'canvas-confetti';
// import './CourseFeedbackForm.css';

// const CourseFeedbackForm = () => {
//   const [courseRating, setCourseRating] = useState(0);
//   const [instructorRating, setInstructorRating] = useState(0);
//   const [feedbackText, setFeedbackText] = useState('');
//   const [isAnonymous, setIsAnonymous] = useState(true);
//   const [isSubmitted, setIsSubmitted] = useState(false);
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const feedbackData = {
//       courseRating,
//       instructorRating,
//       feedbackText,
//       isAnonymous,
//     };

//     // If feedback is not anonymous, include student details from localStorage
//     if (!isAnonymous) {
//       const studentId = localStorage.getItem('studentId');
//       const studentName = localStorage.getItem('studentName');

//       // Check if the student info exists in localStorage
//       if (!studentId || !studentName) {
//         alert("User identity not found. Please log in again.");
//         return;
//       }

//       feedbackData.studentId = studentId;
//       feedbackData.studentName = studentName;
//     }

//     try {
//       const response = await fetch('http://localhost:8080/api/feedback/submit', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(feedbackData),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to submit feedback');
//       }

//       // Show submission message
//       setIsSubmitted(true);
//       triggerConfetti();
//     } catch (error) {
//       console.error('Error submitting feedback:', error);
//       alert('An error occurred while submitting your feedback. Please try again.');
//     }
//   };

//   const triggerConfetti = () => {
//     confetti({
//       particleCount: 150,
//       spread: 70,
//       origin: { y: 0.6 },
//       colors: ['#4dabf7', '#2ecc71', '#ffc107', '#e74c3c'],
//     });
//   };

//   const toggleAnonymous = () => {
//     setIsAnonymous(!isAnonymous);
//   };

//   const handleBackToDashboard = () => {
//     navigate('/dashboard');
//   };

//   return (
//     <div className="feedback-container">
//       <h1 className="feedback-title">Course Feedback</h1>
//       <p className="feedback-subtitle">Share your thoughts about the course and instructor</p>

//       <div className="anonymous-toggle">
//         <button
//           type="button"
//           className={`anonymous-btn ${isAnonymous ? 'active' : ''}`}
//           onClick={toggleAnonymous}
//         >
//           <span className="toggle-switch">
//             <span className="toggle-knob" />
//           </span>
//           Anonymous Feedback
//         </button>
//         <p className="anonymous-note">Your identity will not be shared with the instructor</p>
//       </div>

//       {!isSubmitted ? (
//         <form onSubmit={handleSubmit}>
//           <div className="rating-section">
//             <label>Course Quality</label>
//             <div className="star-rating">
//               {[...Array(6)].map((_, i) => (
//                 <span
//                   key={i}
//                   className={`star ${i < courseRating ? 'filled' : ''}`}
//                   onClick={() => setCourseRating(i + 1)}
//                 >
//                   ★
//                 </span>
//               ))}
//             </div>
//           </div>

//           <div className="rating-section">
//             <label>Instructor Quality</label>
//             <div className="star-rating">
//               {[...Array(6)].map((_, i) => (
//                 <span
//                   key={i}
//                   className={`star ${i < instructorRating ? 'filled' : ''}`}
//                   onClick={() => setInstructorRating(i + 1)}
//                 >
//                   ★
//                 </span>
//               ))}
//             </div>
//           </div>

//           <div className="feedback-section">
//             <label>Your Feedback</label>
//             <p className="feedback-prompt">Share your experience with the course and instructor...</p>
//             <textarea
//               value={feedbackText}
//               onChange={(e) => setFeedbackText(e.target.value)}
//               maxLength={500}
//               placeholder="Type your feedback here..."
//             />
//             <div className="character-count">{feedbackText.length}/500</div>
//           </div>

//           <div className="form-actions">
//             <button type="button" className="cancel-btn" onClick={handleBackToDashboard}>
//               Cancel
//             </button>
//             <button type="submit" className="submit-btn">
//               Submit Feedback
//             </button>
//           </div>
//         </form>
//       ) : (
//         <div className="submission-success">
//           <div className="success-icon">✓</div>
//           <h2>Feedback Submitted!</h2>
//           <p>Thank you for your valuable feedback</p>
//           <button 
//             className="back-to-dashboard-btn"
//             onClick={handleBackToDashboard}
//           >
//             Back to Dashboard
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CourseFeedbackForm;

import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import confetti from 'canvas-confetti';
import './CourseFeedbackForm.css';

const CourseFeedbackForm = () => {
  const [courseRating, setCourseRating] = useState(0);
  const [instructorRating, setInstructorRating] = useState(0);
  const [feedbackText, setFeedbackText] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const courseName = location.state?.courseName || 'Unknown Course'; // fallback if courseName is missing

  const handleSubmit = async (e) => {
    e.preventDefault();

    const feedbackData = {
      courseRating,
      instructorRating,
      feedbackText,
      isAnonymous,
      courseName, // include courseName from route state
    };

    if (!isAnonymous) {
      const studentId = localStorage.getItem('studentId');
      const studentName = localStorage.getItem('studentName');

      if (!studentId || !studentName) {
        alert("User identity not found. Please log in again.");
        return;
      }

      feedbackData.studentId = studentId;
      feedbackData.studentName = studentName;
    }

    try {
      const response = await fetch('http://localhost:8080/api/feedback/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(feedbackData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit feedback');
      }

      setIsSubmitted(true);
      triggerConfetti();
    } catch (error) {
      console.error('Error submitting feedback:', error);
      alert('An error occurred while submitting your feedback. Please try again.');
    }
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#4dabf7', '#2ecc71', '#ffc107', '#e74c3c'],
    });
  };

  const toggleAnonymous = () => {
    setIsAnonymous(!isAnonymous);
  };

  const handleBackToDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <div className="feedback-container">
      <h1 className="feedback-title">Course Feedback</h1>
      <p className="feedback-subtitle">
        Share your thoughts about <strong>{courseName}</strong> and the instructor
      </p>

      <div className="anonymous-toggle">
        <button
          type="button"
          className={`anonymous-btn ${isAnonymous ? 'active' : ''}`}
          onClick={toggleAnonymous}
        >
          <span className="toggle-switch">
            <span className="toggle-knob" />
          </span>
          Anonymous Feedback
        </button>
        <p className="anonymous-note">Your identity will not be shared with the instructor</p>
      </div>

      {!isSubmitted ? (
        <form onSubmit={handleSubmit}>
          <div className="rating-section">
            <label>Course Quality</label>
            <div className="star-rating">
              {[...Array(6)].map((_, i) => (
                <span
                  key={i}
                  className={`star ${i < courseRating ? 'filled' : ''}`}
                  onClick={() => setCourseRating(i + 1)}
                >
                  ★
                </span>
              ))}
            </div>
          </div>

          <div className="rating-section">
            <label>Instructor Quality</label>
            <div className="star-rating">
              {[...Array(6)].map((_, i) => (
                <span
                  key={i}
                  className={`star ${i < instructorRating ? 'filled' : ''}`}
                  onClick={() => setInstructorRating(i + 1)}
                >
                  ★
                </span>
              ))}
            </div>
          </div>

          <div className="feedback-section">
            <label>Your Feedback</label>
            <p className="feedback-prompt">Share your experience with the course and instructor...</p>
            <textarea
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
              maxLength={500}
              placeholder="Type your feedback here..."
            />
            <div className="character-count">{feedbackText.length}/500</div>
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={handleBackToDashboard}>
              Cancel
            </button>
            <button type="submit" className="submit-btn">
              Submit Feedback
            </button>
          </div>
        </form>
      ) : (
        <div className="submission-success">
          <div className="success-icon">✓</div>
          <h2>Feedback Submitted!</h2>
          <p>Thank you for your valuable feedback</p>
          <button className="back-to-dashboard-btn" onClick={handleBackToDashboard}>
            Back to Dashboard
          </button>
        </div>
      )}
    </div>
  );
};

export default CourseFeedbackForm;
