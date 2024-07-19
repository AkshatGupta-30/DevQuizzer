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
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionRequest = exports.Question = void 0;
exports.FillQuestion = FillQuestion;
const mongoose_1 = require("mongoose");
const GenerateId_1 = require("../helpers/GenerateId");
const QuestionSchema = new mongoose_1.Schema({
    id: { type: String, required: true, unique: true },
    categoryID: { type: String, required: true },
    ques: { type: String, required: true },
    options: [String],
    answer: { type: Number, required: true },
    difficulty: { type: String, enum: ["easy", "medium", "hard"], required: true },
    explanation: { type: String, required: true },
    linkedIn: { type: String, required: true },
});
function FillQuestion(data) {
    return __awaiter(this, void 0, void 0, function* () {
        return new exports.Question({
            id: yield (0, GenerateId_1.UniqueQuestionId)(),
            categoryID: data.categoryID,
            ques: data.ques,
            options: data.options,
            answer: data.answer,
            difficulty: data.difficulty,
            explanation: data.explanation,
            linkedIn: data.linkedIn,
        });
    });
}
exports.Question = (0, mongoose_1.model)("Question", QuestionSchema);
exports.QuestionRequest = (0, mongoose_1.model)("Question Request", QuestionSchema);
