import mongoose from "mongoose";

const userschema = mongoose.Schema({
	name: { type: String, require: true },
	email: {
		type: String,
		require: true,
		unique: true,
	},
	password: {
		type: String,
		select: false,
	},
	avatar: { type: String },
});

const User_owner = mongoose.model("user", userschema);

export { User_owner };
