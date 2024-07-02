import mongoose from "mongoose";

interface User {
    name: string;
    email: string;
    password: string;
    categories: {
        id: mongoose.Schema.Types.ObjectId;
        score: number;
        attempted: number;
    }[];
}

export default User