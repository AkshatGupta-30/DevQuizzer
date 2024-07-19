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
const dotenv_1 = __importDefault(require("dotenv"));
const Question_1 = require("../models/Question");
dotenv_1.default.config();
const AdminRouter = express_1.default.Router();
AdminRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.body.token;
        if (token === process.env.ADMIN_TOKEN) {
            return res.status(200).json({ status: 200 });
        }
        return res.status(402).json({ status: 402, message: "Invalid Token" });
    }
    catch (error) {
        console.log(`Invalid Token : ${error}`);
        return res.status(500).json({ error: error });
    }
}));
AdminRouter.post("/ques-req", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const newReq = new Question_1.QuestionRequest(yield (0, Question_1.FillQuestion)(data));
        yield newReq.save();
        return res.status(200).json({ status: 200, message: `Request sent successfully` });
    }
    catch (err) {
        console.log(`Error in Sending Request : ${err}`);
        return res.status(500).json({ status: 500, error: err });
    }
}));
exports.default = AdminRouter;
