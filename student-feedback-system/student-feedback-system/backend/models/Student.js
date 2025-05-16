// const mongoose = require('mongoose');

// const studentSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   password: {
//     type: String,
//     required: true,
//   },
//   courses: [{
//     type: String,  // Or ObjectId if you create a Course model later
//   }],
// }, { timestamps: true });

// module.exports = mongoose.model('Student', studentSchema);

const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },

  email: {
    type: String,
    required: true,
    unique: true, // ensures no duplicate emails
    lowercase: true,
    trim: true,
  },

  password: {
    type: String,
    required: true,
  },

  group: {
    type: String,
    required: true,
    trim: true,
  },
}, {
  timestamps: true, // automatically adds createdAt and updatedAt fields
});

module.exports = mongoose.model('Student', studentSchema);
