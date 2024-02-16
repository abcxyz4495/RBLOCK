const mongoose = require("mongoose");

const schema = new mongoose.Schema({
	name: { type: String, required: true },
	sessions: [
		{
			type: mongoose.SchemaTypes.ObjectId,
			ref: "Session",
			unique: [true, "ID already exists"],
		},
	],
});

module.exports = mongoose.model("Block", schema);
