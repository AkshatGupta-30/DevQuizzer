import express, { Express, Request, Response } from 'express';

const app: Express = express()

app.get("/", (req: Request, res: Response) => {
    res.send("Hello, Dev Quizzer")
})

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
})