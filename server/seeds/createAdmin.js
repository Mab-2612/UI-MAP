const mongoose = require('mongoose');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('🔌 Connected to DB...');

    // 1. Check if admin exists
    const existingAdmin = await User.findOne({ email: "admin@ui.edu.ng" });
    if (existingAdmin) {
      console.log('⚠️ Admin user already exists.');
      process.exit();
    }

    // 2. Create Admin
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("admin123", salt); // PASSWORD IS "admin123"

    const newAdmin = new User({
      username: "Super Admin",
      email: "admin@ui.edu.ng",
      password: hashedPassword,
      role: "admin" // <--- CRITICAL: This allows access
    });

    await newAdmin.save();
    console.log('✅ Admin User Created! (Email: admin@ui.edu.ng / Pass: admin123)');
    
    mongoose.connection.close();
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

createAdmin();