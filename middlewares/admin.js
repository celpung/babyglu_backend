//create auth middleware
const jwt = require('jsonwebtoken');
const config = process.env;

const verifyToken = (req, res, next) => {
  const autHeader = req.headers['authorization'];
  const token = autHeader && autHeader.split(' ')[1];
  if (token == null)
    return res.sendStatus(401).json({
      status: 'error',
      message: 'Auth failed',
    });
  jwt.verify(token, config.TOKEN_KEY, (err, decoded) => {
    if (err)
      return res.sendStatus(403).json({
        status: 'error',
        message: 'Auth failed',
      });
    req.email = decoded.email;
    return next();
  });
};

module.exports = verifyToken;
