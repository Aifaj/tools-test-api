const jwt = require("jsonwebtoken");

exports.verifyToken = ( req, res, next) => {

  const token = req.cookies.accessToken;

  if (!token) {

    return res.status(401).json({
      msg: "No token provided"
    });

  }

  try {

    const decoded =jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();

  } catch (err) {

    if (err.name === "TokenExpiredError") {

      return res.status(401).json({
        msg: "Token expired"
      });

    }

    return res.status(403).json({
      msg: "Invalid token"
    });

  }
};

exports.isAdmin = (req, res, next) => {

  if (req.user.role !== "admin") {

    return res.status(403).json({
      msg: "Admin access only"
    });

  }

  next();
};

exports.isUser = (req, res, next) => {

  if (req.user.role !== "user") {

    return res.status(403).json({
      msg: "User access only"
    });

  }

  next();
};