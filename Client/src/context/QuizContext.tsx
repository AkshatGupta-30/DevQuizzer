/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, Dispatch, SetStateAction, useEffect, useState } from "react";
import { QuestionStatus } from "../oops/enum/QuestionStatus";
import Category from "../oops/models/Category";

interface ContextInterface {
    category: Category;
    quesStatus: QuestionStatus[];
    startQuiz: boolean;
    setStartQuiz: Dispatch<SetStateAction<boolean>>;
	bankLength: number;
	bankPage: number;
	setBankPage: Dispatch<SetStateAction<number>>;
}

const defaultState = {
    category: Category.empty(),
    quesStatus: [],
    startQuiz: false,
    setStartQuiz: () => {},
	bankLength: 20,
	bankPage: 0,
	setBankPage: () => {},
} as ContextInterface;

export const QuizzContext = createContext(defaultState);

const QuizzContextProvider = ({ category, children }: { category: Category; children?: React.ReactNode }) => {
    const [quesStatus, setQuesStatus] = useState<QuestionStatus[]>(defaultState.quesStatus);
    const [startQuiz, setStartQuiz] = useState<boolean>(false);
	const [bankPage, setBankPage] = useState<number>(defaultState.bankPage);
	const bankLength: number = defaultState.bankLength;

	useEffect(() => {
		setQuesStatus(category.questions.map(() => QuestionStatus.NotVisited));
		setBankPage(Math.floor(category.questions.length / bankLength));
	}, [category]);

	const contextValue: ContextInterface = { category, quesStatus, startQuiz, setStartQuiz, bankLength, bankPage, setBankPage };
	return <QuizzContext.Provider value={contextValue}>{children}</QuizzContext.Provider>;
};

export default QuizzContextProvider;
