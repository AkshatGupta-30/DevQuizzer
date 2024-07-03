import mongoose, {Document} from "mongoose";

interface IUser extends Document {
    name: String;
    email: String;
    password: String;
    categories: {
        id: mongoose.Schema.Types.ObjectId;
        score: number;
        attempted: number;
    }[];
}

export default IUser