const mongoose = require("mongoose");

const schema = new mongoose.Schema({
	userid: {
		type: String,
		unique: true,
		required: [true, "UserID is required"],
	},
	password: {
		type: String,
		required: [true, "Password is required"],
	},
	blocks: [
		{
			type: mongoose.SchemaTypes.ObjectId,
			ref: "Block",
			unique: [true, "ID already exists"],
		},
	],
	refreshToken: {
		type: String,
		default: "",
	},
});

module.exports = mongoose.model("User", schema);
