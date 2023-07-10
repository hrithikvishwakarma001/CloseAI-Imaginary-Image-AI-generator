import Google from "passport-google-oauth2";
import bcrypt from "bcrypt";
import passport from "passport";
import generator from "generate-password";
import jwt from "jsonwebtoken";
import { User_owner } from "../mongodb/models/user.js";
// var GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
import * as dotenv from "dotenv";

dotenv.config();
const GoogleStrategy = Google.Strategy;
passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			callbackURL: "http://localhost:8080/auth/google/callback",
			passReqToCallback: true,
		},
		function (request, accessToken, refreshToken, profile, done) {
			const { given_name, picture, email } = profile;

			var passwords = generator.generate({
				length: 18,
				uppercase: false,
			});

			bcrypt.hash(passwords, 10, async function (err, hash) {
				// console.log(hash, err);
				const checkuser = await User_owner.findOne({ email });
				if (!checkuser) {
					return done(null, profile);
				}
				const user = await User_owner.insertMany([
					{
						name: profile.displayName,
						email,
						password: hash,
						avatar: profile.picture,
					},
				]);
				return done(null, profile);
			});
			console.log({ profile });
		}
	)
);

export { passport };
