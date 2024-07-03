import mongoose, { Document } from "mongoose";

export interface ICategoryBody {
    id: String;
    name: String;
    image: String;
}

interface ICategory extends Document {
    id: String;
    name: String;
    image: String;
    questions: String[];
}

export default ICategory