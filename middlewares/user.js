//create auth middleware
const jwt = require("jsonwebtoken");
const config = process.env;

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  if (!token) {
    return res.status(401).json({
      status: "error",
      message: "Auth failed",
    });
  }

  const decoded = jwt.verify(token, config.TOKEN_KEY);
  req.auth = decoded;

  // try {
  //   const decoded = jwt.verify(token, config.TOKEN_KEY);
  //   if (decoded.data.user.level === 'user') {
  //     req.auth = decoded;
  //   } else {
  //     return res.status(401).json({
  //       status: "error",
  //       message: "Auth failed",
  //     });
  //   }
  // } catch (err) {
  //   return res.status(401).json({
  //     status: "error",
  //     message: "Auth failed 3",
  //     err: err,
  //   });
  // }
  return next();
}

module.exports = verifyToken;