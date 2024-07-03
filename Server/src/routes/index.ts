import express, { Router as R, Request, Response } from "express";

const Router: R = express.Router();

Router.get("/", (req: Request, res: Response) => {
	res.send("Dev Quizzer server");
});

export default Router;
