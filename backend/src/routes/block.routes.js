const express = require("express");
const { handleNewBlocks } = require("../controllers/block");

const router = express.Router();

router.post("/new", handleNewBlocks);

module.exports = router;
