const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const { config } = require("dotenv");

const errorMiddleware = require("./middlewares/errorMiddleware");
const corsOptions = require("./configs/corsOptions");
const credentials = require("./middlewares/credentials");
const dbConnection = require("./configs/dbConnection");

config({ path: "./.env" });

const PORT = process.env.PORT || 4000;
const app = express();
const DB_URL = process.env.ATLAS_DB_URL || "";

dbConnection(DB_URL);

app.use(credentials);
app.use(morgan("dev"));
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.use("/auth", require("./routes/auth.routes"));
app.use("/user", require("./routes/user.routes"));
app.use("/block", require("./routes/block.routes"));

app.use(errorMiddleware);

app.listen(PORT, console.log(`Server started at port ${PORT}`));
