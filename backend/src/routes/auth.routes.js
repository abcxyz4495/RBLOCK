const express = require("express");
const {
	handleLogin,
	handleNewUser,
	handleLogout,
	handleRefreshToken,
} = require("../controllers/auth");

const router = express.Router();

router.post("/register", handleNewUser);
router.post("/login", handleLogin);
router.get("/logout", handleLogout);
router.get("/refresh", handleRefreshToken);

module.exports = router;
