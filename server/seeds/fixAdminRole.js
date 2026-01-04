const mongoose = require('mongoose');
const User = require('../models/User');
const path = require('path');

// Connect to .env
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const fixAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('🔌 Connected to DB...');

    const email = "admin@ui.edu.ng";

    // 1. Find the user
    const user = await User.findOne({ email });

    if (!user) {
      console.log(`❌ User ${email} not found! Please create the account first.`);
      process.exit();
    }

    // 2. Force Update Role
    user.role = "admin";
    await user.save();

    console.log(`✅ SUCCESS! User '${user.username}' is now an ADMIN.`);
    console.log(`🔑 Role set to: ${user.role}`);
    
    mongoose.connection.close();
    process.exit();
  } catch (err) {
    console.error('❌ Error:', err);
    process.exit(1);
  }
};

fixAdmin();