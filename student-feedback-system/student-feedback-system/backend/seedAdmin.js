const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Admin = require('./models/Admin');

// Load .env config
dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('MongoDB connected');
  seedAdmin();
})
.catch(err => {
  console.error('MongoDB connection error:', err);
});

// Seed function
const seedAdmin = async () => {
  const existingAdmin = await Admin.findOne({ email: 'admin@example.com' });

  if (existingAdmin) {
    console.log('Admin already exists');
    mongoose.disconnect();
    return;
  }

  const newAdmin = new Admin({
    email: 'admin@example.com',
    password: 'admin123', // Plaintext for now (bcrypt can be added later)
  });

  await newAdmin.save();
  console.log('Admin created successfully');
  mongoose.disconnect();
};
