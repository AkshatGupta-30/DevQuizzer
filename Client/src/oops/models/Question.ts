import { QuesReqContextInterface } from "../../context/QuestionRequestContext";
import { QuestionStatus } from "../enum/QuestionStatus";
import { DifficultyType, getDifficulty } from "../enum/Types";

class Question {
	id: string;
	categoryId: string;
	ques: string;
	options: string[];
	answer: number;
	difficulty: DifficultyType;
	explanation: string;
	percentCorrect: number;
	linkedIn: string;
	questionStatus: QuestionStatus;

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
		this.explanation = params.explaination;
		this.percentCorrect = params.percentCorrect;
		this.linkedIn = params.linkedIn;
		this.questionStatus = QuestionStatus.NotVisited;
	}

	public toString(): string {
		return JSON.stringify({
			categoryID: this.categoryId,
			ques: JSON.stringify(this.ques),
			options: this.options,
			answer: this.answer,
			explanation: this.explanation,
			difficulty: this.difficulty.toString(),
			percentCorrect: this.percentCorrect,
			linkedIn: this.linkedIn,
		});
	}

	public static addQues(data: QuesReqContextInterface["ques"]): Question {
		console.log(data);
		return new Question({
			id: "",
			answer: data.answer,
			categoryId: data.category,
			difficulty: getDifficulty(data.difficulty),
			explaination: data.explaination,
			linkedIn: data.linkedIn,
			options: [data.option1, data.option2, data.option3, data.option4],
			percentCorrect: 0,
			ques: data.question,
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
			ques: "",
		});
	}
}

export default Question;
