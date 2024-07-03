import mongoose, { model, Schema, Document } from "mongoose";
import IQuestion from "../interface/Question";

const QuestionSchema = new Schema<IQuestion>({
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    ques: { type: String, required: true },
    options: {
        one: { type: String, required: true },
        two: { type: String, required: true },
        three: { type: String, required: true },
        four: { type: String, required: true }
    },
    answer: { type: Number, required: true },
    difficulty: { type: String, enum: ['easy', 'medium', 'hard'], required: true },
    explanation: { type: String, required: true },
    percentCorrect: { type: Number, required: true },
    linkedIn: { type: String, required: true }
});

const QuestionModel = model<IQuestion & Document>('Question', QuestionSchema);
export default QuestionModel;