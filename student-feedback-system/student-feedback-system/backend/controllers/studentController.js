const Student = require('../models/Student');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// @desc   Register a new student
// @route  POST /api/students/register
const registerStudent = async (req, res) => {
  const { name, email, password, group } = req.body;

  try {
    // Check if all required fields are provided
    if (!name || !email || !password || !group) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if student already exists
    const studentExists = await Student.findOne({ email });
    if (studentExists) {
      return res.status(400).json({ message: 'Student already exists' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new student with group
    const student = await Student.create({
      name,
      email,
      password: hashedPassword,
      group,
    });

    // Generate JWT token
    const token = jwt.sign({ id: student._id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    // Respond with created student details
    res.status(201).json({
      student: {
        _id: student._id,
        name: student.name,
        email: student.email,
        group: student.group,
      },
      token,
    });
  } catch (err) {
    console.error('Error in registerStudent:', err);
    res.status(500).json({ message: err.message || 'Server error' });
  }
};

// @desc   Login a student
// @route  POST /api/students/login
const loginStudent = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if all fields are provided
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Find student by email
    const student = await Student.findOne({ email });
    if (!student) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: student._id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    // Respond with student info including group
    res.json({
      token,
      student: {
        _id: student._id,
        name: student.name,
        email: student.email,
        group: student.group,
      },
    });
  } catch (err) {
    console.error('Error in loginStudent:', err);
    res.status(500).json({ message: err.message || 'Server error' });
  }
};

module.exports = { registerStudent, loginStudent };
