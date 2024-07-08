/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, Dispatch, SetStateAction, useEffect, useState } from "react";
import { QuestionStatus } from "../oops/enum/QuestionStatus";
import Category from "../oops/models/Category";

interface ContextInterface {
	quesStatus: QuestionStatus[];
	bankLength: number;
	bankPage: number;
	setBankPage: Dispatch<SetStateAction<number>>;
}

const defaultState = {
	quesStatus: [],
	bankLength: 20,
	bankPage: 0,
	setBankPage: () => {},
} as ContextInterface;

export const QuizzContext = createContext(defaultState);

const QuizzContextProvider = ({ category, children }: { category: Category; children?: React.ReactNode }) => {
	const [quesStatus, setQuesStatus] = useState<QuestionStatus[]>(defaultState.quesStatus);
	const [bankPage, setBankPage] = useState<number>(defaultState.bankPage);
	const bankLength: number = defaultState.bankLength;

	useEffect(() => {
		setQuesStatus(category.questions.map(() => QuestionStatus.NotVisited));
		setBankPage(Math.floor(category.questions.length / bankLength));
	}, [category]);

	const contextValue: ContextInterface = { quesStatus, bankLength, bankPage, setBankPage };
	return <QuizzContext.Provider value={contextValue}>{children}</QuizzContext.Provider>;
};

export default QuizzContextProvider;
