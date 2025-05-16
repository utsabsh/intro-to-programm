const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
  courseName: {
    type: String,
    required: true,
    trim: true,
  },
  instructorName: {
    type: String,
    required: true,
    trim: true,
  },
  courseRating: {
    type: Number,
    required: true,
    min: 0,
    max: 5,
  },
  instructorRating: {
    type: Number,
    required: true,
    min: 0,
    max: 5,
  },
  feedbackText: {
    type: String,
    maxlength: 500,
  },
  isAnonymous: {
    type: Boolean,
    default: true,
  },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: function () {
      return !this.isAnonymous;
    },
  },
  studentName: {
    type: String,
    required: function () {
      return !this.isAnonymous;
    },
  },
  status: {
    type: String,
    enum: ["New", "In Progress", "Reviewed"],
    default: "New",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Feedback", feedbackSchema);
