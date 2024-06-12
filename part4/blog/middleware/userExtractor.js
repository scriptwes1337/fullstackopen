const jwt = require("jsonwebtoken");

const userExtractor = (req, res, next) => {
  if (req.token) {
    req.user = jwt.verify(req.token, process.env.SECRET)
  } else {
    req.user = null;
  }
  next();
};

module.exports = userExtractor;
