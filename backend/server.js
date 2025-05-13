
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

const verifyToken = require('./middlewares/authMiddleware');

app.get('/api/protected', verifyToken, (req, res) => {
  console.log('User data from token:', req.user); 

  if (req.user) {
    return res.json({ message: `Welcome ${req.user.username}! This is protected.` });
  } else {
    return res.status(400).json({ message: 'User data not found.' });
  }
});



// Connect MongoDB and Start server
mongoose.connect(process.env.MONGO_URI)
  .then(() => app.listen(5000, () => console.log('Server running on port 5000')))
  .catch(err => console.log(err));
