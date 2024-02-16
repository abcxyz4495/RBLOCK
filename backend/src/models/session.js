const mongoose = require("mongoose");

const schema = new mongoose.Schema({
	name: { type: String, required: true },
	pdfURL: { type: String, required: [true, "Pdf URL not found"] },
	videoURL: { type: String, required: [true, "Video URL not found"] },
});

module.exports = mongoose.model("Session", schema);
