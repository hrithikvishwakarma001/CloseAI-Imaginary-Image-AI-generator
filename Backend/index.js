import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import connectDB from "./mongodb/connect.js";
import postRoutes from "./routes/postRoutes.js";
import closeAiRoutes from "./routes/closeAiRoutes.js";
import { user } from "./authentication/user.auth.js";
import { passport } from "./authentication/google.auth.js";
import { User_owner } from "./mongodb/models/user.js";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
// import session from 'express-session'

dotenv.config();
const app = express();
app.use(cookieParser());
app.use(
	cors({
		origin: "https://closeai.vercel.app/",
		credentials: true,
	})
);

// app.use(
// 	session({
// 	  secret: "keyboard",
// 	  resave: false,
// 	  saveUninitialized: true,
// 	  cookie: { secure: true },
// 	})
//   );

app.use(express.json({ limit: "50mb" }));

app.use("/api/v1/posts", postRoutes);
app.use("/api/v1/closeai", closeAiRoutes);

app.use("/api/test", user);

app.get("/", async (req, res) => {
	res.send("Hello World");
});

app.get(
	"/auth/google",
	passport.authenticate("google", { scope: ["email", "profile"] })
);

app.get(
	"/auth/google/callback",
	passport.authenticate("google", {
		// successRedirect: 'http://127.0.0.1:5173/',
		failureRedirect: "/",
		session: false,
	}),
	async (req, res) => {
		const { email } = req.user;
		console.log("👻 -> file: index.js:60 -> email", email);
		const user = await User_owner.findOne({ email });
		console.log("👻 -> file: index.js:60 -> user:", user);
		let jwttoken = jwt.sign(
			{
				id: user?.id,
			},
			"shhh"
		);

		res.cookie("token", jwttoken, { httpOnly: true });
		res.redirect("http://localhost:3000/");
	}
);

const start = async () => {
	try {
		connectDB;
		app.listen(8080, () => {
			console.log(`Server is running ....`);
		});
	} catch (error) {
		console.log(error);
	}
};

start();
