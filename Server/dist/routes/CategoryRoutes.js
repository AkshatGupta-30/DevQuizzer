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
const Category_1 = __importDefault(require("../models/Category"));
const GenerateId_1 = require("../helpers/GenerateId");
dotenv_1.default.config();
const CategoryRouter = express_1.default.Router();
CategoryRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield Category_1.default.find();
        res.status(200).json({ results: response });
    }
    catch (error) {
        console.log("error: " + error);
        res.status(500).json({ status: 500, error: error });
    }
}));
CategoryRouter.post("/add", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const newCategories = [];
        for (const category of data) {
            const isCategoryPresent = yield Category_1.default.findOne({ name: category.name });
            if (isCategoryPresent)
                continue;
            newCategories.push(new Category_1.default({
                id: yield (0, GenerateId_1.UniqueCategoryId)(),
                name: category.name,
                image: category.image,
                color: category.color,
            }));
        }
        const response = yield Category_1.default.insertMany(newCategories);
        console.log(newCategories.length + " Data Saved");
        res.status(200).json({ status: 200, results: response });
    }
    catch (error) {
        console.log(`Error in Saving Languages : ${error}`);
        return res.status(500).json({ status: 500, error: error });
    }
}));
exports.default = CategoryRouter;
