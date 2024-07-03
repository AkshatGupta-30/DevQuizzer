import mongoose, { Document } from "mongoose";

export interface ICategoryBody {
    name: String;
    image: String;
}

interface ICategory extends Document {
    name: String;
    image: String;
    users: mongoose.Types.ObjectId[];
    questions: mongoose.Types.ObjectId[];
}

export default ICategory