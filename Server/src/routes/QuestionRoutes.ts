import express, { Router as R, Request, Response } from "express";
import mongoose from "mongoose";
import { Question } from "../models/Question";
import Category from "../models/Category";
import { UniqueQuestionId } from "../helpers/GenerateId";

const QuestionRouter: R = express.Router();

QuestionRouter.post("/add", async (req: Request, res: Response) => {
	try {
		const data = req.body;
		const catID: String = data.categoryID;
		const isCat = await Category.findOne({ id: catID });
		if (!isCat) {
			return res.status(404).json({ error: `Category ${catID} not found in database` });
		}

		const questions = data.questions;
		const newQuesIds: String[] = [];
		for (const ques of questions) {
			const newQues = new Question({ ...ques, categoryID: isCat.id, id: await UniqueQuestionId() });
			await newQues.save();
			newQuesIds.push(newQues.id);
		}

		isCat.questions.push(...newQuesIds);
		await isCat.save();
		res.status(200).json({
			status: 200,
			message: `${newQuesIds.length} Questions added successfully in ${catID}`,
		});
	} catch (error) {
		console.log(`Error in Saving Questions : ${error}`);
		res.status(500).json({ status: 500, message: error });
	}
});

QuestionRouter.get("/:category", async (req: Request, res: Response) => {
	try {
		const category = req.params.category;
		const response = await Category.findOne({ name: category }).populate("questions");
		if (!response) {
			return res.status(404).json({ status: 404, error: `Category ${category} not found` });
		}
		res.status(200).json({ status: 200, results: response.questions });
	} catch (error) {
		console.log("error: " + error);
		res.status(500).json({ status: 500, message: error });
	}
});

QuestionRouter.get("/", async (req, res) => {
	try {
		const response = await Question.find();
		res.status(200).json({ results: response });
	} catch (error) {
		console.log("error: " + error);
		res.status(500).json({ status: 500, message: error });
	}
});

export default QuestionRouter;
