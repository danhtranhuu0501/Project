//CLI: npm install mongoose --save
const mongoose = require('mongoose');
const MyConstants = require('./MyConstants');

// Build connection URI
const uri = `mongodb+srv://${MyConstants.DB_USER}:${MyConstants.DB_PASS}@${MyConstants.DB_SERVER}/${MyConstants.DB_DATABASE}?retryWrites=true&w=majority`;

console.log('🔗 Connecting to MongoDB...');
console.log('Server:', MyConstants.DB_SERVER);
console.log('Database:', MyConstants.DB_DATABASE);
console.log('User:', MyConstants.DB_USER);

// Connection options
const options = {
  serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  bufferMaxEntries: 0, // Disable mongoose buffering
  bufferCommands: false, // Disable mongoose buffering
};

mongoose.connect(uri, options)
.then(() => { 
  console.log('✅ Connected to MongoDB successfully!');
  console.log('✅ Database:', MyConstants.DB_DATABASE);
})
.catch((err) => { 
  console.error('❌ MongoDB connection failed:');
  console.error('❌ Error name:', err.name);
  console.error('❌ Error message:', err.message);
  console.error('❌ Error code:', err.code);
  
  // Don't exit process, let server continue running
  console.log('⚠️  Server will continue without database connection');
});

// Handle connection events
mongoose.connection.on('connected', () => {
  console.log('✅ Mongoose connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('❌ Mongoose connection error:', err.name, err.message);
});

mongoose.connection.on('disconnected', () => {
  console.log('⚠️  Mongoose disconnected from MongoDB');
});

mongoose.connection.on('reconnected', () => {
  console.log('🔄 Mongoose reconnected to MongoDB');
});

// Graceful shutdown
process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('Mongoose connection closed through app termination');
    process.exit(0);
  });
});