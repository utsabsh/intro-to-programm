// const express = require('express');
// const dotenv = require('dotenv');
// const cors = require('cors');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');

// // Route Imports
// const studentRoutes = require('./routes/studentRoutes');
// const feedbackRoutes = require('./routes/feedbackRoutes');
// const contactRoutes = require('./routes/contact');
// const adminRoutes = require('./routes/adminRoutes'); // ✅ Admin login route

// // Load environment variables
// dotenv.config();

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// // Routes
// app.use('/api/students', studentRoutes);
// app.use('/api/feedback', feedbackRoutes);
// app.use('/api/contact', contactRoutes);
// app.use('/api/admin', adminRoutes); // ✅ Integrated Admin route

// // MongoDB Connection
// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
//   .then(() => console.log('MongoDB connected'))
//   .catch(err => console.log('MongoDB connection error:', err));

// // Start Server
// const PORT = process.env.PORT || 8080;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Load environment variables from .env file
dotenv.config();

// Route Imports
const studentRoutes = require('./routes/studentRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');
const contactRoutes = require('./routes/contact');
const adminRoutes = require('./routes/adminRoutes'); 
const dashboardRoutes = require('./routes/dashboardRoutes'); // ✅ NEW: Admin Dashboard Feedback Data

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/students', studentRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/dashboard', dashboardRoutes); // ✅ NEW: Dashboard feedback API

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB connected'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// Server Listener
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
