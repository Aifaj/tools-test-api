const router = require("express").Router();
const { register, login } = require("../controllers/authController");
const { verifyToken, isAdmin } = require("../middleware/auth");

router.post("/register", register);
router.post("/login", login);

router.get("/profile", verifyToken, (req, res) => {
  res.json({ success: true, user: req.user });
});

router.get("/admin", verifyToken, isAdmin, (req, res) => {
  res.json({ success: true, msg: "Welcome Admin" });
});

module.exports = router;
