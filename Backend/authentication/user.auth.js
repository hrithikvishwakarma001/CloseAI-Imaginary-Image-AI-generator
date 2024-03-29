import { Otp } from "../mongodb/models/otp.model.js";
import { User_owner } from "../mongodb/models/user.js";
import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import otpGenerator from "otp-generator";
import { passport } from "./google.auth.js";

const user = express.Router();

const transporter = nodemailer.createTransport({
	host: "smtp.gmail.com",
	port: 465,
	secure: true,
	auth: {
		user: "closeaicat@gmail.com",
		pass: "pvcejsjhwbcpjcle",
	},
});

user.post("/genotp", async (req, res) => {
	const { email, name, password } = req.body;
	const userpresence = await User_owner.findOne({ email });
	if (userpresence)
		return res.status(409).send({
			msg: "User with this email address already present",
		});
	const jwttoken = jwt.sign(
		{
			email,
			name,
			password,
		},
		"shhh"
	);
	let randomotp = otpGenerator.generate(6, {
		upperCaseAlphabets: false,
		specialChars: false,
		lowerCaseAlphabets: false,
	});
	let info = await transporter.sendMail({
		to: email,
		from: "pete.kemmer@ethereal.email",
		subject: "no-reply-close-ai",
		text: `Verify Yourself with this code ${randomotp} for CLOSEAI web APP`,
	});
	let thehashotp = randomotp;
	bcrypt.hash(thehashotp, 10, async function (err, hash) {
		const newotpuser = await Otp.insertMany([
			{ email, otp: hash, onejwt: jwttoken },
		]);
		res.send(newotpuser[0]._id);
	});
});

user.post("/create", async (req, res) => {
	const { _id, userotp } = req.body;
	const otp = await Otp.findOne({ _id });
	if (!otp) {
		return res.status(401).send({ msg: "email not matched" });
	}
	//   console.log(otp);
	//   return
	const { onejwt, expireat } = otp;
	console.log(expireat, Date.now());
	if (expireat <= Date.now()) {
		return res.send({ msg: "token expired" });
	}
	jwt.verify(onejwt, "shhh", async function (err, decoded) {
		const { email, name, password } = decoded;
		console.log(email, name, password);               
		const user = await User_owner.findOne({ email });
		if (user) {
			return res.send({ msg: "user exist try login or forget password" });
		}
		bcrypt.compare(userotp, otp.otp, async function (err, result) {
			if (result) {
				bcrypt.hash(password, 6, async function (err, hash) {
					const newUser = await new User_owner({
						email,
						name,
						password: hash,
					});
					newUser.save();
					const jwttoken = jwt.sign(
						{ 
							_id: newUser._id, email, name },
						"shhh",
						{ expiresIn: "720h" }
					);

					res.send({ msg: jwttoken });
				});
			} else {
				res.status(401).send({ msg: "unauth" });
			}
		});
	});
});

user.get("/getinfo", async (req, res) => {
	const a = req.cookies.token;
	console.log('👻 -> file: user.auth.js:102 -> user.get -> a:', a)
	jwt.verify(a, "shhh", async function (err, decoded) {
		if (err) return res.status(401).send({ success: false, msg: "unauth" });
		const { id } = decoded;
		const user = await User_owner.findById(id);
		if (!user)
			return res.status(401).send({ success: false, msg: "unauth" });
		if (user.password) delete user.password;
		return res.send({ success: true, user });
	});
});

user.get("/logout", (req, res) => {
	res.cookie("token", null, { httpOnly: true });
	res.send({ msg: "Token deleted" });
});

export { user };
