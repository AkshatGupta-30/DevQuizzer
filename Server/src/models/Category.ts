import mongoose, { Schema, model, Document } from "mongoose";
import ICategory from "../interface/Category";

const CategorySchema = new Schema<ICategory>({
	id: {type: String, required: true, unique: true},
	name: { type: String, required: true },
	image: { type: String, required: true },
	color: { type: String, required: true },
	questions: [String ],
});

const Category = model<ICategory & Document>("Category", CategorySchema);
export default Category;
