import React, { useState } from "react";
import Category from "../models/Category";
import axios, { AxiosError, AxiosResponse } from "axios";
import handleAxiosError from "../helpers/AxiosError";

type props = { children?: React.ReactNode };

interface ContextInterface {
	categories: Category[];
	isLoading: boolean;
	error: string;
	onMounted: () => void;
}

const defaultState = {
	categories: [],
	isLoading: true,
	error: "",
	onMounted: () => {},
} as ContextInterface;

export const CategoryContext = React.createContext(defaultState);

const CategoryContextProvider = ({ children }: props) => {
	const [categories, setCategories] = React.useState<Category[]>(defaultState.categories);
	const [isLoading, setIsLoading] = useState<boolean>(defaultState.isLoading);
	const [error, setError] = useState<string>(defaultState.error);

	const onMounted = async () => {
		setIsLoading(true)
		await axios
			.get("http://localhost:3001/category")
			.then((res: AxiosResponse) => {
				const cats = Category.FactoryGetList(res.data);
				setCategories(cats);
				setIsLoading(false);
			})
			.catch((err: AxiosError) => {
				setIsLoading(false);
				setError(handleAxiosError(err))
			});
	};

	const contextValue: ContextInterface = { categories, isLoading, error, onMounted };
	return <CategoryContext.Provider value={contextValue}>{children}</CategoryContext.Provider>;
};

export default CategoryContextProvider;
