const User = require("../models/user");
const Session = require("../models/session");
const TryCatch = require("../utils/features");
const ErrorHandler = require("../utils/utilityClasses");

const handleAllUser = TryCatch(async (req, res, next) => {
	res.header("Access-Control-Allow-Credentials", true);
	const users = await User.find({});
	if (!users) return next(new ErrorHandler(400, "Not Found"));
	return res.status(200).json(users);
});

const handleUserDetails = TryCatch(async (req, res, next) => {
	const { userid } = req.query;
	const user = await User.findOne({ userid })
		.populate("blocks")
		.populate({
			path: "blocks",
			populate: {
				path: "sessions",
				model: "Session",
			},
		});

	if (!user)
		return next(
			new ErrorHandler(404, `No user found with the id of ${userid}`)
		);

	console.log(user);
	return res.status(200).json({ userData: user });
});

// app.get("/user/details", async (req, res, next) => {
// 	const { userid } = req.body;
// 	const user = await User.findOne({ userid })
// 		.populate("blocks")
// 		.populate({
// 			path: "blocks",
// 			populate: {
// 				path: "sessions",
// 				model: "Session",
// 			},
// 		});
// 	console.log(user);
// 	return res.status(200).json({ userData: user });
// });

module.exports = { handleAllUser, handleUserDetails };
