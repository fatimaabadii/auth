
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));

// Protected example route
const verifyToken = require('./middlewares/authMiddleware');
app.get('/api/protected', verifyToken, (req, res) => {
  res.json({ message: `Welcome ${req.user.username}! This is protected.` });
});

// Connect MongoDB and Start server
mongoose.connect(process.env.MONGO_URI)
  .then(() => app.listen(5000, () => console.log('Server running on port 5000')))
  .catch(err => console.log(err));
