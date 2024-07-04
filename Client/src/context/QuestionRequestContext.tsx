import React, { useEffect, useState } from "react";

type props = { children?: React.ReactNode };

interface ContextInterface {
	ques: {
		category: string;
		question: string;
		option1: string;
		option2: string;
		option3: string;
		option4: string;
		answer: number;
		difficulty: string;
		explaination: string;
		linkedIn: string;
	};
	changedValues: (ev: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
	submit: () => void;
}

const defaultState = {
	ques: {
		category: "Category",
		question: "",
		option1: "",
		option2: "",
		option3: "",
		option4: "",
		answer: 0,
		difficulty: "Difficulty",
		explaination: "",
		linkedIn: "",
	},
	changedValues: () => {},
	submit: () => {},
} as ContextInterface;

export const QuestionRequestContext = React.createContext(defaultState);

const QuestionRequestContextProvider = ({ children }: props) => {
	const [ques, setQ] = useState<ContextInterface["ques"]>(defaultState.ques);

	useEffect(() => clearData(), []);

	const changedValues = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		setQ({
			...ques,
			[event.target.name]: event.target.value,
		});
	};

	function clearData() {
		console.log("Cleared")
		setQ(defaultState.ques);
	}

	const submit = () => {};

	const contextValue: ContextInterface = { ques, changedValues, submit };
	return <QuestionRequestContext.Provider value={contextValue}>{children}</QuestionRequestContext.Provider>;
};

export default QuestionRequestContextProvider;
