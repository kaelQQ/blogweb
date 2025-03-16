const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');

// Load environment variables from .env file
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({ error: err.message });
});

// MongoDB Connection with detailed logging
const connectDB = async () => {
  // Get MongoDB URI from environment variable or use default local URI
  const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/blogdb';
  
  try {
    console.log('Attempting to connect to MongoDB...');
    console.log('Using database URL:', mongoURI.replace(/\/\/([^:]+):([^@]+)@/, '//<credentials hidden>@')); // Hide credentials if present
    
    await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 5000,
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Successfully connected to MongoDB');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    console.error('Please check if:');
    console.error('1. MongoDB is installed and running');
    console.error('2. The connection URL in .env file is correct');
    console.error('3. MongoDB is listening on the default port (27017)');
    process.exit(1);
  }
};

// Connect to MongoDB
connectDB();

// Routes with error handling
app.use('/api/posts', (req, res, next) => {
  console.log('Incoming request:', {
    method: req.method,
    path: req.path,
    body: req.body,
    query: req.query
  });
  next();
}, require('./routes/posts'));

// Serve the HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
