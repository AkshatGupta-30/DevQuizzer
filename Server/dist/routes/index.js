"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AdminRoutes_1 = __importDefault(require("./AdminRoutes"));
const CategoryRoutes_1 = __importDefault(require("./CategoryRoutes"));
const QuestionRoutes_1 = __importDefault(require("./QuestionRoutes"));
const Router = express_1.default.Router();
Router.get("/", (req, res) => {
    res.send("Dev Quizzer server");
});
Router.use("/admin", AdminRoutes_1.default);
Router.use("/category", CategoryRoutes_1.default);
Router.use("/ques", QuestionRoutes_1.default);
exports.default = Router;
