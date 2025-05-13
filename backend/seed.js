
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
require('dotenv').config();

const seedUser = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  const hashedPassword = await bcrypt.hash('password123', 10);
  const user = new User({ username: 'fatima', password: hashedPassword });
  await user.save();
  console.log('User seeded');
  process.exit();
};

seedUser();
