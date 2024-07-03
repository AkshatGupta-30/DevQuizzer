import mongoose, { Schema, Model } from "mongoose";
import IUser from "../interface/User";

const UserSchema = new Schema<IUser>({
	name: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	categories: [
		{
			id: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
			score: { type: Number, required: true },
			attempted: { type: Number, required: true },
		},
	],
});

const UserModel: Model<IUser> = mongoose.model<IUser>("User", UserSchema);
export default UserModel;
