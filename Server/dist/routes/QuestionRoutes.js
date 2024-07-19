"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Question_1 = require("../models/Question");
const Category_1 = __importDefault(require("../models/Category"));
const GenerateId_1 = require("../helpers/GenerateId");
const QuestionRouter = express_1.default.Router();
QuestionRouter.post("/add", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const catID = data.categoryID;
        const isCat = yield Category_1.default.findOne({ id: catID });
        if (!isCat) {
            return res.status(404).json({ error: `Category ${catID} not found in database` });
        }
        const questions = data.questions;
        const newQuesIds = [];
        for (const ques of questions) {
            const newQues = new Question_1.Question({
                id: yield (0, GenerateId_1.UniqueQuestionId)(),
                categoryID: isCat.id,
                ques: ques.ques,
                options: ques.options,
                answer: ques.answer,
                difficulty: ques.difficulty,
                explanation: ques.explanation,
                percentCorrect: ques.percentCorrect,
                linkedIn: ques.linkedIn,
            });
            yield newQues.save();
            newQuesIds.push(newQues.id);
        }
        isCat.questions.push(...newQuesIds);
        yield isCat.save();
        res.status(200).json({
            status: 200,
            message: `${newQuesIds.length} Questions added successfully in ${catID}`,
        });
    }
    catch (error) {
        console.log(`Error in Saving Questions : ${error}`);
        res.status(500).json({ status: 500, message: error });
    }
}));
QuestionRouter.get("/questions-by-ids", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ids = req.query.ids;
        const idList = ids.split(",");
        const questions = yield Question_1.Question.find({ id: { $in: idList } }, { _id: 0 });
        res.status(200).json({ status: 200, results: questions });
    }
    catch (error) {
        console.log("error: " + error);
        res.status(500).json({ status: 500, message: error });
    }
}));
QuestionRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield Question_1.Question.find();
        res.status(200).json({ results: response });
    }
    catch (error) {
        console.log("error: " + error);
        res.status(500).json({ status: 500, message: error });
    }
}));
exports.default = QuestionRouter;
