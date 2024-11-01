// middleware/authMiddleware.js

const jwt = require("jsonwebtoken");

const authMiddleware = (role) => {
  return (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(403).json({ message: "No token provided" });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded; // Store user info in request

      if (role && decoded.role !== role) {
        return res.status(403).json({ message: "Forbidden: Access denied" });
      }

      next();
    } catch (error) {
      res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
  };
};

module.exports = authMiddleware;
