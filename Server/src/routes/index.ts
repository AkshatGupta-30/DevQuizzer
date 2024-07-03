import express, { Router as R, Request, Response } from "express";
import AdminRouter from "./AdminRoutes";

const Router: R = express.Router();

Router.get("/", (req: Request, res: Response) => {
	res.send("Dev Quizzer server");
});

Router.use("/admin", AdminRouter);

export default Router;
