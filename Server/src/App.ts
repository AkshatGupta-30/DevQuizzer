import express, { Express, Request, Response } from "express";
import DbConnect from "./Database";
import dotenv from "dotenv";
import Router from "./routes/index";
import cors from "cors";

dotenv.config();
DbConnect();

const app: Express = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors())
app.use(Router);

const port = process.env.PORT || 3001;
app.listen(port, () => {
	console.log(`Server is running at http://localhost:${port}`);
});
