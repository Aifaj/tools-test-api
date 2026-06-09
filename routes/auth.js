const router = require("express").Router();
const authControler = require("../controllers/authController");
const authMid = require("../middleware/auth");

router.post("/register", authControler.register);
router.post("/login", authControler.login);
router.post("/logout", authControler.logout);
router.post("/refreshToken", authControler.refreshToken)

router.get("/admins", authMid.verifyToken, authMid.isAdmin, authControler.getAdmins);
router.get("/users", authMid.verifyToken, authMid.isUser, authControler.getUsers);

module.exports = router;
