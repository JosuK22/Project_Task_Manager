const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

// Load environment variables from .env file
dotenv.config();

// Display NODE_ENV environment variable
console.log(`NODE_ENV: ${process.env.NODE_ENV}`);

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.log('Uncaught Exception 💥');
  console.error(err.name, err.message);
  process.exit(1);
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ Connected to database');
})
.catch(err => {
  console.error('Error connecting to MongoDB:', err.message);
  process.exit(1);
});

// Start the server
const PORT = process.env.PORT || 5000; // Default to 3000 if PORT is not specified
const server = app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.log('Unhandled Rejection 💥');
  console.error(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
