import { createContext } from "react";

interface ContextInterface {}

const defaultState = {} as ContextInterface;

export const QuizzContext = createContext(defaultState);

const QuizzContextProvider = ({ children }: { children?: React.ReactNode }) => {
	const contextValue: ContextInterface = {};
	return <QuizzContext.Provider value={contextValue}>{children}</QuizzContext.Provider>;
};

export default QuizzContextProvider;
