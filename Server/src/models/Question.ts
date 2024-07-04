import mongoose, { model, Schema, Document } from "mongoose";
import IQuestion from "../interface/Question";
import { UniqueQuestionId } from "../helpers/GenerateId";

const QuestionSchema = new Schema<IQuestion>({
	id: { type: String, required: true, unique: true },
	categoryID: { type: String, required: true },
	ques: { type: String, required: true },
	options: [String],
	answer: { type: Number, required: true },
	difficulty: { type: String, enum: ["easy", "medium", "hard"], required: true },
	explanation: { type: String, required: true },
	percentCorrect: { type: Number, required: true },
	linkedIn: { type: String, required: true, unique: true },
});

export async function FillQuestion(data: any) {
	return new Question({
		id: await UniqueQuestionId(),
		categoryID: data.categoryID,
		ques: data.ques,
		options: data.options,
		answer: data.answer,
		difficulty: data.difficulty,
		explanation: data.explanation,
		percentCorrect: data.percentCorrect,
		linkedIn: data.linkedIn,
	});
}

export const Question = model<IQuestion & Document>("Question", QuestionSchema);
export const QuestionRequest = model<IQuestion & Document>("Question Request", QuestionSchema);
