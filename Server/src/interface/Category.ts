import mongoose from "mongoose";

interface ICategory {
    name: string;
    image: string;
    users: mongoose.Types.ObjectId[];
    questions: mongoose.Types.ObjectId[];
}

export default ICategory