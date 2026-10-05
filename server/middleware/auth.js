const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
  var token = req.cookies.token || req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, process.env.SECRET, function(err, user) {
    if (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }
    req.user = user;
    next();
  });
}

module.exports = authMiddleware;
