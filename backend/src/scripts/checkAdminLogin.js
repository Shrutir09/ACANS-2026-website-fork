
require('dotenv').config({
  path: require('path').join(__dirname, '../../.env')
});

const connectDB = require('../config/db');
const User = require('../models/User');
const bcrypt = require('bcrypt');

async function checkAdminLogin() {
  try {
    await connectDB();

    const email = process.env.ADMIN_EMAIL.toLowerCase().trim();
    const password = process.env.ADMIN_PASSWORD;

    const user = await User.findOne({ email }).select('+password');

    console.log('\n--- ADMIN LOGIN DIAGNOSTICS ---');

    console.log('Admin found:', !!user);

    if (!user) return;

    console.log('Role:', user.role);
    console.log('Password hash exists:', !!user.password);
    console.log(
      'Bcrypt hash format:',
      /^\$2[aby]\$12\$/.test(user.password)
    );

    const passwordMatches = await bcrypt.compare(
      password,
      user.password
    );

    console.log('Password matches .env:', passwordMatches);

    console.log('--- END DIAGNOSTICS ---\n');

  } catch (error) {
    console.error('Diagnostic error:', error.message);
  } finally {
    const mongoose = require('mongoose');
    await mongoose.disconnect();
  }
}

checkAdminLogin();
