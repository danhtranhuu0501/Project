//CLI: npm install mongoose --save
const mongoose = require('mongoose');
const MyConstants = require('./MyConstants');

const uri = 'mongodb+srv://' + MyConstants.DB_USER + ':' + MyConstants.DB_PASS + '@' + MyConstants.DB_SERVER + '/' + MyConstants.DB_DATABASE + '?retryWrites=true&w=majority';

mongoose.connect(uri)
.then(() => { 
  console.log('✅ Connected to MongoDB: ' + MyConstants.DB_SERVER + '/' + MyConstants.DB_DATABASE); 
})
.catch((err) => { 
  console.error('❌ MongoDB connection error:', err); 
});

// Handle connection events
mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected from MongoDB');
});

// Graceful shutdown
process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('Mongoose connection closed through app termination');
    process.exit(0);
  });
});