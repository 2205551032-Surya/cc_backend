const jwt = require('jsonwebtoken');
const secretKey = 'mySuperSecretKey123!@#'; 

const verifyToken = (request, h) => {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    return h.response({ message: 'Authorization header is missing' }).code(401).takeover();
  }

  const token = authHeader.split(' ')[1]; 

  try {
    const decoded = jwt.verify(token, secretKey);
    request.auth = { userId: decoded.userId }; 
    return h.continue;
  } catch (err) {
    return h.response({ message: 'Invalid or expired token' }).code(401).takeover();
  }
};

module.exports = { verifyToken, secretKey };
