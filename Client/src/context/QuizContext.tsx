/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { QuestionStatus } from "../oops/enum/QuestionStatus";
import Category from "../oops/models/Category";

interface ContextInterface {
	category: Category;
	quesStatus: QuestionStatus[];
	formattedTime: string;
	startQuiz: boolean;
	setStartQuiz: Dispatch<SetStateAction<boolean>>;
	bankLength: number;
	bankPage: number;
	setBankPage: Dispatch<SetStateAction<number>>;
}

const defaultState = {
	category: Category.empty(),
	quesStatus: [],
	formattedTime: "",
	startQuiz: false,
	setStartQuiz: () => {},
	bankLength: 20,
	bankPage: 0,
	setBankPage: () => {},
} as ContextInterface;

export const QuizzContext = createContext(defaultState);

const QuizzContextProvider = ({ category, children }: { category: Category; children?: React.ReactNode }) => {
	const [quesStatus, setQuesStatus] = useState<QuestionStatus[]>(defaultState.quesStatus);
	const [time, setTime] = useState(0);
	const [startQuiz, setStartQuiz] = useState<boolean>(false);
	const [bankPage, setBankPage] = useState<number>(defaultState.bankPage);
	const bankLength: number = defaultState.bankLength;

	useEffect(() => {
		setQuesStatus(category.questions.map(() => QuestionStatus.NotVisited));
		setBankPage(Math.floor(category.questions.length / bankLength));
	}, [category]);

	useEffect(() => {
		if (startQuiz) {
			const startTime = Date.now();
			let animationFrameId: number;

			const updateTimer = () => {
				setTime(Date.now() - startTime);
				animationFrameId = requestAnimationFrame(updateTimer);
			};

			animationFrameId = requestAnimationFrame(updateTimer);

			return () => {
				cancelAnimationFrame(animationFrameId);
			};
		}
	}, [startQuiz]);

	const formattedTime: string = useMemo(() => {
		const hours = String(Math.floor((time / 3600000) % 60)).padStart(2, "0");
		const minutes = String(Math.floor((time / 60000) % 60)).padStart(2, "0");
		const seconds = String(Math.floor((time / 1000) % 60)).padStart(2, "0");
		return `${hours}:${minutes}:${seconds}`;
	}, [time]);

	const contextValue: ContextInterface = {
		category,
		quesStatus,
		formattedTime,
		startQuiz,
		setStartQuiz,
		bankLength,
		bankPage,
		setBankPage,
	};
	return <QuizzContext.Provider value={contextValue}>{children}</QuizzContext.Provider>;
};

export default QuizzContextProvider;
