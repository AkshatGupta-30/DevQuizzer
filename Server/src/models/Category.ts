import mongoose, { Schema, model, Document } from "mongoose";
import ICategory from "../interface/Category";

const CategorySchema = new Schema<ICategory>({
	name: { type: String, required: true },
	image: { type: String, required: true },
	users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
	questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }],
});

const Category = model<ICategory & Document>("Category", CategorySchema);
export default Category;
