const ErrorHandler = require("../utils/utilityClasses");
const allowedOrigins = require("./allowedOrigins");

const corsOptions = {
	origin: (origin, callback) => {
		console.log("Origin", origin);
		if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
			callback(null, true);
		} else {
			callback(new ErrorHandler(404, "Not allowed by CORS"));
		}
	},
	optionsSuccessStatus: 200,
};

module.exports = corsOptions;
