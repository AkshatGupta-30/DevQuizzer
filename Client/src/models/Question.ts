import { DifficultyType } from "../enum/Types";

class Question {
	id: string;
	categoryId: string;
	ques: string;
	options: string[];
	answer: number;
	difficulty: DifficultyType;
	explaination: string;
	percentCorrect: number;
	linkedIn: string;

	constructor(params: {
		id: string;
		categoryId: string;
		ques: string;
		options: string[];
		answer: number;
		difficulty: DifficultyType;
		explaination: string;
		percentCorrect: number;
		linkedIn: string;
	}) {
		this.id = params.id;
		this.categoryId = params.categoryId;
		this.ques = params.ques;
		this.options = params.options;
		this.answer = params.answer;
		this.difficulty = params.difficulty;
		this.explaination = params.explaination;
		this.percentCorrect = params.percentCorrect;
		this.linkedIn = params.linkedIn;
	}

	public toString(): string {
		return JSON.stringify({
			categoryID: this.categoryId,
			ques: JSON.stringify(this.ques),
			options: this.options,
			answer: this.answer,
			explanation: this.explaination,
			difficulty: this.difficulty.toString(),
			percentCorrect: this.percentCorrect,
			linkedIn: this.linkedIn,
		});
	}

	public static empty(): Question {
		return new Question({
			id: "",
			answer: 0,
			categoryId: "",
            difficulty: DifficultyType.Easy,
            explaination: "",
            linkedIn: "",
            options: [],
            percentCorrect: 0,
            ques: ""
		});
	}
}

export default Question;
