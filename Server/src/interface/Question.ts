import mongoose from "mongoose"

interface Question {
    category: mongoose.Schema.Types.ObjectId;
    ques: string;
    options: {
        one: string;
        two: string;
        three: string;
        four: string;
    };
    answer: number;
    difficulty: 'easy' | 'medium' | 'hard';
    explanation: string;
    percentCorrect: number;
    linkedIn: string;
}

export default Question