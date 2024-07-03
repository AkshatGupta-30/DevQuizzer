import express, { Router as R, Request, Response } from "express";
import AdminRouter from "./AdminRoutes";
import CategoryRouter from "./CategoryRoutes";
import QuestionRouter from "./QuestionRoutes";

const Router: R = express.Router();

Router.get("/", (req: Request, res: Response) => {
	res.send("Dev Quizzer server");
});

Router.use("/admin", AdminRouter);
Router.use("/category", CategoryRouter)
Router.use("/ques", QuestionRouter)

export default Router;
