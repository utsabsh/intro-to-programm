// controllers/adminController.js
const Feedback = require('../models/Feedback');

// Get recent feedback (paginated)
exports.getRecentFeedback = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    const feedbacks = await Feedback.find()
      .sort({ date: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Feedback.countDocuments();

    res.status(200).json({
      success: true,
      data: feedbacks,
      total,
      page: Number(page),
      totalPages: Math.ceil(total / limit)
    });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Server error' });
  }
};
