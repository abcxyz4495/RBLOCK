const { config } = require("dotenv");
const Block = require("../models/block");
const TryCatch = require("../utils/features");
const ErrorHandler = require("../utils/utilityClasses");

config({ path: "./.env" });

const handleNewBlocks = TryCatch(async (req, res, next) => {
	const { name } = req.body;
	console.log("New Block", name);
	const block = await Block.findOne({ name });
	if (block) return next(new ErrorHandler(409, "This block already exists"));

	const result = await Block.create({ name });
	if (result)
		return res.status(200).json({
			message: "Successfully created a new block",
			data: result,
		});
});

module.exports = { handleNewBlocks };
