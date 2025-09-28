// Script to create admin user
require('./utils/MongooseUtil');
const Models = require('./models/Models');
const mongoose = require('mongoose');

async function createAdmin() {
  try {
    // Check if admin already exists
    const existingAdmin = await Models.Admin.findOne({ username: 'admin' });
    
    if (existingAdmin) {
      console.log('Admin user already exists');
      return;
    }

    // Create new admin
    const admin = new Models.Admin({
      _id: new mongoose.Types.ObjectId(),
      username: 'admin',
      password: 'admin'
    });

    await admin.save();
    console.log('✅ Admin user created successfully!');
    console.log('Username: admin');
    console.log('Password: admin');
    
  } catch (error) {
    console.error('❌ Error creating admin:', error);
  } finally {
    mongoose.connection.close();
  }
}

createAdmin();
