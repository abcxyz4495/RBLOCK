const allowedOrigins = require("../configs/allowedOrigins");

const credentials = (req, res, next) => {
	const origin = req.headers.origin;
	if (allowedOrigins.includes(origin)) {
		console.log("Allowed");
		res.header("Access-Control-Allow-Credentials", true);
	}
	next();
};

module.exports = credentials;
