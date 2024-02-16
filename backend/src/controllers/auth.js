// const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { config } = require("dotenv");
const User = require("../models/user");
const TryCatch = require("../utils/features");
const ErrorHandler = require("../utils/utilityClasses");

config({ path: "./.env" });

const handleNewUser = TryCatch(async (req, res, next) => {
	const { userid, password } = req.body;
	if (!userid || !password)
		return next(new ErrorHandler(400, "Missing fields"));

	const user = await User.findOne({ userid: userid });
	if (user) return next(new ErrorHandler(409, "userid already in use"));

	// const hashPassword = await bcrypt.hash(password, 10);

	const result = await User.create({
		userid,
		password,
	});

	res.status(201).json({ success: `New user ${userid} created!` });
});

const handleLogin = TryCatch(async (req, res, next) => {
	const { userid, password } = req.body;
	if (!userid || !password)
		return next(new ErrorHandler(400, "Missing fields"));

	const user = await User.findOne({ userid: userid });
	if (!user) return next(new ErrorHandler(401, "Invalid credentials"));

	// const match = bcrypt.compare(user.password, password);
	const match = user.password === password;
	if (!match) return next(new ErrorHandler(400, "Invalid Password"));

	const accessToken = jwt.sign(
		{ userid: user.userid },
		process.env.ACCESS_TOKEN_SECRET,
		{ expiresIn: "10m" }
	);

	const refreshToken = jwt.sign(
		{ userid: user.userid },
		process.env.REFRESH_TOKEN_SECRET,
		{ expiresIn: "10m" }
	);

	user.refreshToken = refreshToken;
	const result = await user.save();

	res.cookie("jwt", refreshToken, {
		httpOnly: true,
		secure: true,
		sameSite: "none",
		maxAge: 2 * 60 * 60 * 1000,
	});

	res.json({ accessToken });
});

const handleLogout = TryCatch(async (req, res, next) => {
	const cookies = req.cookies;
	if (!cookies?.jwt) return res.status(204);

	const refreshToken = cookies.jwt;
	const user = await User.findOne({ refreshToken });
	if (!user) {
		res.clearCookies("jwt", {
			httpOnly: true,
			sameSite: "none",
			secure: true,
		});
	}

	user.refreshToken = "";
	const result = await user.save();

	res.clearCookie("jwt", { httpOnly: true, sameSite: "none", secure: true });
	res.sendStatus(204);
});

const handleRefreshToken = TryCatch(async (req, res, next) => {
	const cookies = req.cookies;
	if (!cookies?.jwt) return res.sendStatus(401);
	const refreshToken = cookies.jwt;

	const user = await User.findOne({ refreshToken });
	if (!user) return res.sendStatus(403);

	jwt.verify(
		refreshToken,
		process.env.REFRESH_TOKEN_SECRET,
		(err, decoded) => {
			if (user.userid != decoded.userid || err)
				return res.sendStatus(403);
			const accessToken = jwt.sign(
				{ userid: user.userid },
				process.env.ACCESS_TOKEN_SECRET,
				{
					expiresIn: "30m",
				}
			);
			res.json({ accessToken });
		}
	);
});

module.exports = {
	handleNewUser,
	handleLogin,
	handleLogout,
	handleRefreshToken,
};
