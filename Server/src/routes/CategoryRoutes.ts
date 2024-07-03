import express, { Router, Request, Response } from "express";
import dotenv from "dotenv";
import { ICategoryBody } from "../interface/Category";
import Category from "../models/Category";

dotenv.config();

const CategoryRouter: Router = express.Router();

CategoryRouter.get("/", async (req, res) => {
	try {
		const response = await Category.find();
		res.status(200).json({ results: response });
	} catch (error) {
		console.log("error: " + error);
		res.status(500).json({ status: 500, error: error });
	}
});

CategoryRouter.post("/add", async (req: Request, res: Response) => {
	try {
		const data: ICategoryBody[] = req.body;
		const newCategories = [];
		for (const category of data) {
			const isCategoryPresent = await Category.findOne({ name: category.name });
			if (isCategoryPresent) continue;
			const newLang = new Category(category);
			newCategories.push(newLang);
		}
		const response = await Category.insertMany(newCategories);
		console.log(newCategories.length + " Data Saved");
		res.status(200).json({ status: 200, results: response });
	} catch (error) {
		console.log(`Error in Saving Languages : ${error}`);
		return res.status(500).json({ status: 500, error: error });
	}
});

export default CategoryRouter;