import express, { Express, Request, Response } from 'express';
import DbConnect from './Database';
import dotenv from "dotenv";

dotenv.config();
DbConnect();

const app: Express = express()

app.get("/", (req: Request, res: Response) => {
    res.send("Hello, Dev Quizzer")
})

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
})