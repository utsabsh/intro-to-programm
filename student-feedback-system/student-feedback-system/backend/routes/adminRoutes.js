// // const express = require('express');
// // const router = express.Router();
// // const Admin = require('../models/Admin');

// // // Admin Login Route
// // router.post('/login', async (req, res) => {
// //   const { email, password } = req.body;

// //   try {
// //     const admin = await Admin.findOne({ email });

// //     if (!admin || admin.password !== password) {
// //       return res.status(401).json({ message: 'Invalid email or password' });
// //     }

// //     res.status(200).json({ message: 'Login successful' });
// //   } catch (err) {
// //     console.error('Admin login error:', err);
// //     res.status(500).json({ message: 'Server error' });
// //   }
// // });

// // module.exports = router;

// const express = require('express');
// const router = express.Router();
// const Admin = require('../models/Admin');
// const Feedback = require('../models/Feedback');

// // Admin Login Route
// router.post('/login', async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const admin = await Admin.findOne({ email });

//     if (!admin || admin.password !== password) {
//       return res.status(401).json({ message: 'Invalid email or password' });
//     }

//     res.status(200).json({ message: 'Login successful' });
//   } catch (err) {
//     console.error('Admin login error:', err);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // Get All Feedbacks for Admin Dashboard
// router.get('/feedback', async (req, res) => {
//   try {
//     const feedbacks = await Feedback.find().sort({ createdAt: -1 });
//     res.status(200).json(feedbacks);
//   } catch (err) {
//     console.error('Error fetching feedbacks:', err);
//     res.status(500).json({ message: 'Failed to fetch feedbacks' });
//   }
// });

// module.exports = router;

const express = require('express');
const router = express.Router();
const Admin = require('../models/Admin');
const Feedback = require('../models/Feedback');

// Admin Login Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });

    if (!admin || admin.password !== password) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    res.status(200).json({ message: 'Login successful' });
  } catch (err) {
    console.error('Admin login error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get All Feedbacks for Admin Dashboard
router.get('/feedback', async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });
    res.status(200).json(feedbacks);
  } catch (err) {
    console.error('Error fetching feedbacks:', err);
    res.status(500).json({ message: 'Failed to fetch feedbacks' });
  }
});

module.exports = router;
