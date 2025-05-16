// const express = require('express');
// const router = express.Router();
// const Feedback = require('../models/Feedback');

// // @route   POST /api/feedback/submit
// // @desc    Submit course feedback
// router.post('/submit', async (req, res) => {
//   try {
//     const { courseRating, instructorRating, feedbackText, isAnonymous, studentName, studentId } = req.body;

//     // If not anonymous, ensure studentName and studentId are present
//     if (!isAnonymous) {
//       if (!studentName || !studentId) {
//         return res.status(400).json({ error: 'Student identity required for non-anonymous feedback' });
//       }
//     }

//     // Create feedback document
//     const feedback = new Feedback({
//       courseRating,
//       instructorRating,
//       feedbackText,
//       isAnonymous,
//       studentName: isAnonymous ? undefined : studentName, // Store name only if not anonymous
//       studentId: isAnonymous ? undefined : studentId, // Store ID only if not anonymous
//     });

//     // Save the feedback to the database
//     await feedback.save();

//     res.status(200).json({ message: 'Feedback submitted successfully' });
//   } catch (error) {
//     console.error('Error submitting feedback:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// module.exports = router;

const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback');

// @route   POST /api/feedback/submit
// @desc    Submit course feedback
router.post('/submit', async (req, res) => {
  try {
    const {
      courseName,
      courseRating,
      instructorRating,
      feedbackText,
      isAnonymous,
      studentName,
      studentId
    } = req.body;

    if (!courseName) {
      return res.status(400).json({ error: 'Course name is required' });
    }

    if (!isAnonymous && (!studentName || !studentId)) {
      return res.status(400).json({ error: 'Student identity required for non-anonymous feedback' });
    }

    const feedback = new Feedback({
      courseName,
      courseRating,
      instructorRating,
      feedbackText,
      isAnonymous,
      studentName: isAnonymous ? undefined : studentName,
      studentId: isAnonymous ? undefined : studentId,
    });

    await feedback.save();
    res.status(200).json({ message: 'Feedback submitted successfully' });
  } catch (error) {
    console.error('Error submitting feedback:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
