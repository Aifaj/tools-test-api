const User = require("../models/user");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const userExist = await User.findOne({ where: { email } });

    if (userExist) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashed,
      role
    });

    res.json({ success: true, msg: "User registered", user });

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: err.message });
  }
};


exports.login = async (req, res) => {
  try {
    console.log("Login request received", process.env.JWT_SECRET);
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({
        success: false,
        msg: "User not found"
      });
    }

    const match = await bcrypt.compare(
      password,
      user.password
    );

    if (!match) {
      return res.status(401).json({
        success: false,
        msg: "Invalid password"
      });
    }

    const accessToken = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "2m"
      }
    );

    const refreshToken = jwt.sign(
      {
        id: user.id
      },
      process.env.REFRESH_SECRET,
      {
        expiresIn: "7d"
      }
    );

    res.cookie(
      "accessToken",
      accessToken,
      {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 2 * 60 * 1000
      }
    );

    res.cookie(
      "refreshToken",
      refreshToken,
      {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000
      }
    );

    return res.status(200).json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (err) {

    return res.status(500).json({
      success: false,
      msg: err.message
    });

  }
};

exports.refreshToken = async (
  req,
  res
) => {

  try {

    const refreshToken =
      req.cookies.refreshToken;

    if (!refreshToken) {

      return res.status(401).json({
        success: false,
        msg: "Refresh token missing"
      });

    }

    const decoded =
      jwt.verify(
        refreshToken,
        process.env.REFRESH_SECRET
      );

    const user =
      await User.findByPk(
        decoded.id
      );

    if (!user) {

      return res.status(404).json({
        success: false,
        msg: "User not found"
      });

    }

    const newAccessToken =
      jwt.sign(
        {
          id: user.id,
          email: user.email,
          role: user.role
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "2m"
        }
      );

    res.cookie(
      "accessToken",
      newAccessToken,
      {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 2 * 60 * 1000
      }
    );

    return res.status(200).json({
      success: true
    });

  } catch (err) {

    return res.status(401).json({
      success: false,
      msg: "Invalid refresh token"
    });

  }
};


exports.getAdmins = async (req, res) => {
  try {

    const admins = await User.findAll({
      where: {
        role: "admin"
      }
    });

    res.status(200).json({
      success: true,
      data: admins
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message
    });

  }
};

exports.getUsers = async (req, res) => {
  try {

    const users = await User.findAll({
      where: {
        role: "user"
      }
    });

    res.status(200).json({
      success: true,
      data: users
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message
    });

  }
};


exports.logout = (req, res) => {

  res.clearCookie(
    "accessToken"
  );

  res.clearCookie(
    "refreshToken"
  );

  return res.status(200).json({
    success: true,
    msg: "Logged out successfully"
  });

};