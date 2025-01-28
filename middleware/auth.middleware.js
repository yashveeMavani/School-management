const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.JWT_SECRET;

exports.verifyToken = (req, res, next) => {

  const token = req.headers["authorization"];

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  try {
    const decoded = jwt.verify(token.split(" ")[1], SECRET_KEY); 
    req.userId = decoded.id; 
    req.role = decoded.role; 
    next(); 
  } catch (err) {
    return res.status(401).send({ message: "Unauthorized!" });
  }
};

exports.verifyRole = (roles) => {
  return (req, res, next) => {
    this.verifyToken(req, res, () => {
      if (!roles.includes(req.role)) {
        return res.status(403).send({ message: "Access Denied: Insufficient Permissions" });
      }
      next(); 
    });
  };
};
