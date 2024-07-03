import mongoose, {Document} from "mongoose"

interface IQuestion extends Document {
    category: mongoose.Schema.Types.ObjectId;
    ques: String;
    options: {
        one: String;
        two: String;
        three: String;
        four: String;
    };
    answer: number;
    difficulty: 'easy' | 'medium' | 'hard';
    explanation: String;
    percentCorrect: number;
    linkedIn: String;
}

export default IQuestion