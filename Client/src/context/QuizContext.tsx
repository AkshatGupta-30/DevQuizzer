/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import Category from "../oops/models/Category";
import axios, { AxiosError } from "axios";
import Question from "../oops/models/Question";
import handleAxiosError from "../helpers/AxiosError";

interface ContextInterface {
	category: Category;
	questions: Question[];
	currQ: number;
	setCurrQ: Dispatch<SetStateAction<number>>;
	myAns: number[];
	setMyAns: Dispatch<SetStateAction<number[]>>;
	formattedTime: string;
	startQuiz: boolean;
	setStartQuiz: Dispatch<SetStateAction<boolean>>;
	bankLength: number;
	bankPage: number;
	setBankPage: Dispatch<SetStateAction<number>>;
}

const defaultState = {
	category: Category.empty(),
	questions: [],
	currQ: -1,
	setCurrQ: () => {},
	myAns: [],
	setMyAns: () => {},
	formattedTime: "",
	startQuiz: false,
	setStartQuiz: () => {},
	bankLength: 20,
	bankPage: 0,
	setBankPage: () => {},
} as ContextInterface;

export const QuizzContext = createContext(defaultState);

const QuizzContextProvider = ({ category, children }: { category: Category; children?: React.ReactNode }) => {
	const [questions, setQuestions] = useState<Question[]>([]);
	const [currQ, setCurrQ] = useState<number>(defaultState.currQ);
	const [myAns, setMyAns] = useState<number[]>(defaultState.myAns);
	const [time, setTime] = useState(0);
	const [startQuiz, setStartQuiz] = useState<boolean>(defaultState.startQuiz);
	const [bankPage, setBankPage] = useState<number>(defaultState.bankPage);
	const bankLength: number = defaultState.bankLength;

	useEffect(() => {
		setBankPage(Math.floor(category.questions.length / bankLength) - 1);
		setMyAns((prevAns) => {
			const updatedAns = [...prevAns];
			category.questions.map((_, index: number) => {
				updatedAns[index] = -1;
			});
			return updatedAns;
		});
		const fetchData = async () => {
			axios
				.get("http://localhost:3001/ques/questions-by-ids", {
					params: {
						ids: category.questions,
					},
				})
				.then((response) => {
					setQuestions(Question.factoryList(response.data));
				})
				.catch((error: AxiosError) => {
					console.log(handleAxiosError(error));
				});
		};
		fetchData();
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
		questions,
		currQ,
		setCurrQ,
		myAns,
		setMyAns,
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
