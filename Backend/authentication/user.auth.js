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
    return res.send({ msg: "User with this email address already present" });
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
    res.status(401).send({ msg: "email not matched" });
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
    const user = await User_owner.findOne({ email });
    if (user) {
      return res.send({ msg: "user exist try login or forget password" });
    }
    bcrypt.compare(userotp, otp.otp, async function (err, result) {
      if (result) {
        bcrypt.hash(password, 6, async function (err, hash) {
          const updateuser = await User_owner.insertMany([
            { name, email, password: hash },
          ]);
          let newuserarray = updateuser[0];
          const jwttoken = jwt.sign(
            {
              id: newuserarray._id,
            },
            "shhh"
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
  const a = req.cookies["token"];
  jwt.verify(a, "shhh", async function (err, decoded) {
    const { id } = decoded;
    const user = await User_owner.findById(id);
    return res.send(user);
  });
});

export { user };
