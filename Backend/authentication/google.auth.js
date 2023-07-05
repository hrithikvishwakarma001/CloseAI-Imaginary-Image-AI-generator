import Google from "passport-google-oauth2";
const GoogleStrategy = Google.Strategy;
import bcrypt from "bcrypt";
import passport from "passport";
import generator from "generate-password";
import jwt from "jsonwebtoken";
import { User_owner } from "../mongodb/models/user.js";
// var GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID:
        "460600247291-0mm4uhnd76o3sk2st8m1184f86qirpos.apps.googleusercontent.com",
      clientSecret: "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",
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
          const checkuser=await User_owner.findOne({email})
          if(!checkuser){
            return done(null, profile);
          }
        const user = await User_owner.insertMany([
          {
            name: given_name,
            email,
            password: hash,
            avatar: profile.picture,
          },
        ]);
        // console.log(user);
        return done(null, profile);
      });
      // console.log(profile)
    }
  )
);

export { passport };
