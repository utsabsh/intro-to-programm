const express = require("express");
const router = express.Router();
const Feedback = require("../models/Feedback");

// @route   GET /api/dashboard
// @desc    Get admin dashboard data (recent feedback, stats)
// @access  Public or Private (use middleware if you implement auth)
router.get("/", async (req, res) => {
  try {
    // Fetch all feedbacks, newest first
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });

    // Calculate stats
    const totalFeedback = feedbacks.length;

    const averageRating =
      feedbacks.reduce((sum, feedback) => sum + feedback.rating, 0) /
      (totalFeedback || 1);

    const activeCoursesSet = new Set(feedbacks.map((fb) => fb.course));
    const activeCourses = activeCoursesSet.size;

    const submittedCount = feedbacks.filter(
      (fb) => fb.feedback && fb.feedback.trim() !== ""
    ).length;
    const responseRate =
      totalFeedback > 0
        ? ((submittedCount / totalFeedback) * 100).toFixed(0)
        : 0;

    // Get 5 most recent feedbacks
    const recentFeedback = feedbacks.slice(0, 5);

    res.status(200).json({
      totalFeedback,
      averageRating: averageRating.toFixed(1),
      activeCourses,
      responseRate: `${responseRate}%`,
      recentFeedback,
    });
  } catch (error) {
    console.error("Error fetching dashboard data:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
});
// GET /api/feedback?course=Data Structures&instructor=Prof. Michael Chen&rating=4&status=New
router.get("/feedback", async (req, res) => {
  try {
    const { course, instructor, rating, status } = req.query;
    const query = {};

    if (course && course !== "All Courses") query.course = course;
    if (instructor && instructor !== "All Instructors")
      query.instructor = instructor;
    if (rating && rating !== "All Ratings") query.rating = parseInt(rating);
    if (status && status !== "All Statuses") query.status = status;

    const feedbacks = await Feedback.find(query).sort({ createdAt: -1 });

    res.status(200).json(feedbacks);
  } catch (error) {
    console.error("Error fetching filtered feedback:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
});

router.put("/feedback/:id", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const updatedFeedback = await Feedback.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedFeedback) {
      return res.status(404).json({ message: "Feedback not found" });
    }

    res.status(200).json(updatedFeedback);
  } catch (error) {
    console.error("Error updating feedback:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
