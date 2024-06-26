import Mongoose from "mongoose";

const userSchema = new Mongoose.Schema({
	name: String,
	password: String,
});

export const User = Mongoose.model("User", userSchema);
