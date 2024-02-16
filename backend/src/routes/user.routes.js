const express = require("express");
const { handleAllUser, handleUserDetails } = require("../controllers/user");
const verifyJWT = require("../middlewares/verifyJWT");

const router = express.Router();

router.get("/", verifyJWT, handleAllUser);
router.get("/details", verifyJWT, handleUserDetails);

module.exports = router;
