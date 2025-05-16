const express = require('express');
const router = express.Router();
const {
  registerStudent,
  loginStudent
} = require('../controllers/studentController');

// @route   POST /api/students/register
router.post('/register', registerStudent);

// @route   POST /api/students/login
router.post('/login', loginStudent);

module.exports = router;
