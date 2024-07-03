import Category from "../models/Category"; // Assuming you have a Category model
import { Question } from "../models/Question";

export async function UniqueCategoryId(): Promise<string> {
	let id: string;
	let isIdPresent: boolean;

	do {
		id = `ca${Math.floor(10000 + Math.random() * 90000)}`;
		isIdPresent = (await Category.findOne({ id: id }).exec()) !== null;
	} while (isIdPresent);

	return id;
}

export async function UniqueQuestionId(): Promise<string> {
	let id: string;
	let isIdPresent: boolean;

	do {
		id = `qu${Math.floor(10000 + Math.random() * 90000)}`;
		isIdPresent = (await Question.findOne({ id: id }).exec()) !== null;
	} while (isIdPresent);

	return id;
}
