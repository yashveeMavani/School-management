const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config/auth.config");

exports.verifyRole = (roles) => {
  return (req, res, next) => {
    const token = req.headers["authorization"];
    if (!token) return res.status(403).send("No token provided");

    try {
      const decoded = jwt.verify(token.split(" ")[1], SECRET_KEY); 
      req.userId = decoded.id; 
      req.role = decoded.role; 
      if (!roles.includes(req.role)) {
        return res
          .status(403)
          .send({ message: "Access Denied: Insufficient Permissions" });
      }
      next();
    } catch (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
  };
};
