import express, { Router, Request, Response } from "express";
import dotenv from "dotenv";
import { QuestionRequest } from "../models/Question";

dotenv.config();

const AdminRouter: Router = express.Router();

AdminRouter.post("/", async (req: Request, res: Response) => {
	try {
		const token: String = req.body.token;
		if (token === process.env.ADMIN_TOKEN) {
			return res.status(200).json({ status: 200 });
		}
		return res.status(402).json({ status: 402, message: "Invalid Token" });
	} catch (error) {
		console.log(`Invalid Token : ${error}`);
		return res.status(500).json({ error: error });
	}
});

AdminRouter.post("/ques-req", async (req: Request, res: Response) => {
	try {
		const data = req.body;
		const newReq = new QuestionRequest(data);
		await newReq.save();
		console.log(`Request sent successfully`);
		return res.status(200).json({ status: 200, message: `Request sent successfully` });
	} catch (err) {
		console.log(`Error in Sending Request : ${err}`);
		return res.status(500).json({ error: err });
	}
});

export default AdminRouter;
