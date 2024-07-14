/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, Dispatch, SetStateAction, useEffect, useState } from "react";
import Category from "../oops/models/Category";
import axios, { AxiosError } from "axios";
import Question from "../oops/models/Question";
import handleAxiosError from "../helpers/AxiosError";

interface ContextInterface {
	category: Category;
    questions: Question[];
    setQuestions: Dispatch<SetStateAction<Question[]>>;
	currQ: number;
	setCurrQ: Dispatch<SetStateAction<number>>;
	myAns: number[];
	setMyAns: Dispatch<SetStateAction<number[]>>;
	startQuiz: boolean;
	setStartQuiz: Dispatch<SetStateAction<boolean>>;
	bankLength: number;
	bankPage: number;
	setBankPage: Dispatch<SetStateAction<number>>;
	checkSubmit: boolean;
	setCheckSubmit: Dispatch<SetStateAction<boolean>>;
}

const defaultState = {
	category: Category.empty(),
    questions: [],
    setQuestions: () => {},
	currQ: -1,
	setCurrQ: () => {},
	myAns: [],
	setMyAns: () => {},
	startQuiz: false,
	setStartQuiz: () => {},
	bankLength: 20,
	bankPage: 1,
	setBankPage: () => { },
	checkSubmit: false,
	setCheckSubmit: () => {}
} as ContextInterface;

export const QuizzContext = createContext(defaultState);

const QuizzContextProvider = ({ category, children }: { category: Category; children?: React.ReactNode }) => {
	const [questions, setQuestions] = useState<Question[]>([]);
	const [currQ, setCurrQ] = useState<number>(defaultState.currQ);
	const [myAns, setMyAns] = useState<number[]>(defaultState.myAns);
	const [startQuiz, setStartQuiz] = useState<boolean>(defaultState.startQuiz);
	const [bankPage, setBankPage] = useState<number>(defaultState.bankPage);
	const [checkSubmit, setCheckSubmit] = useState<boolean>(defaultState.checkSubmit)
	const bankLength: number = defaultState.bankLength;

	useEffect(() => {
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

	const contextValue: ContextInterface = {
		category,
        questions,
        setQuestions,
		currQ,
		setCurrQ,
		myAns,
		setMyAns,
		startQuiz,
		setStartQuiz,
		bankLength,
		bankPage,
		setBankPage,
		checkSubmit,
		setCheckSubmit
	};
	return <QuizzContext.Provider value={contextValue}>{children}</QuizzContext.Provider>;
};

export default QuizzContextProvider;
