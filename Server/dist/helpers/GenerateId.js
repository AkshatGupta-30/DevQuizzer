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
exports.UniqueCategoryId = UniqueCategoryId;
exports.UniqueQuestionId = UniqueQuestionId;
const Category_1 = __importDefault(require("../models/Category")); // Assuming you have a Category model
const Question_1 = require("../models/Question");
function UniqueCategoryId() {
    return __awaiter(this, void 0, void 0, function* () {
        let id;
        let isIdPresent;
        do {
            id = `ca${Math.floor(10000 + Math.random() * 90000)}`;
            isIdPresent = (yield Category_1.default.findOne({ id: id }).exec()) !== null;
        } while (isIdPresent);
        return id;
    });
}
function UniqueQuestionId() {
    return __awaiter(this, void 0, void 0, function* () {
        let id;
        let isIdPresent;
        do {
            id = `qu${Math.floor(10000 + Math.random() * 90000)}`;
            isIdPresent = (yield Question_1.Question.findOne({ id: id }).exec()) !== null;
        } while (isIdPresent);
        return id;
    });
}
