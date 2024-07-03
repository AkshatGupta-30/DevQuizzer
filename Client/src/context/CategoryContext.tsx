import React from "react";
import Category from "../models/Category";
import CategoryApi from "../services/CategoryApi";

type props = { children?: React.ReactNode };

interface ContextInterface {
	categories: Category[];
	onMounted: () => void;
}

const defaultState = {
	categories: [],
	onMounted: () => {},
} as ContextInterface;

export const CategoryContext = React.createContext(defaultState);

const CategoryContextProvider = ({ children }: props) => {
	const [categories, setCategories] = React.useState<Category[]>([]);

    const onMounted = async () => {
        const cats = await CategoryApi.Home();
        setCategories(cats!)
    };

	const contextValue: ContextInterface = { categories, onMounted };
	return <CategoryContext.Provider value={contextValue}>{children}</CategoryContext.Provider>;
};

export default CategoryContextProvider;
