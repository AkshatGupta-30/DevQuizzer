import { createContext, useEffect, useState } from "react";
import { QuestionStatus } from "../enum/QuestionStatus";
import Category from "../models/Category";

interface ContextInterface {
	quesStatus: QuestionStatus[];
}

const defaultState = {
	quesStatus: [],
} as ContextInterface;

export const QuizzContext = createContext(defaultState);

const QuizzContextProvider = ({ category, children }: { category: Category; children?: React.ReactNode }) => {
	const [quesStatus, setQuesStatus] = useState<QuestionStatus[]>(defaultState.quesStatus);

    useEffect(() => {
		setQuesStatus(category.questions.map(() => QuestionStatus.NotVisited));
	}, [category]);

	const contextValue: ContextInterface = { quesStatus };
	return <QuizzContext.Provider value={contextValue}>{children}</QuizzContext.Provider>;
};

export default QuizzContextProvider;
