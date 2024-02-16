const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {
	// console.log("Reached verification step");
	const authHeader = req.headers.authorization || req.headers.Authorization;
	// console.log(req.headers);
	if (!authHeader?.startsWith("Bearer ")) return res.sendStatus(401);

	const token = authHeader.split(" ")[1];
	jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
		if (err) {
			console.log(err.message);
			return res.sendStatus(403);
		}
		req.userid = decoded.userid;
		// console.log("UserID", req.userid);
		next();
	});
};

module.exports = verifyJWT;
