const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Access Denied' });

  try {
    // Verify token and store the decoded data in req.user
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    
    // Log the verified user data (for debugging)
    console.log('User data from token:', verified); 
    

    // Add the verified token's content to the request object
    req.user = verified;  // This will include both 'id' and 'username' if set properly
    
    next();
  } catch (err) {
    res.status(400).json({ message: 'Invalid Token' });
  }
};

module.exports = verifyToken;
