"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const CategorySchema = new mongoose_1.Schema({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    image: { type: String, required: true },
    color: { type: String, required: true },
    questions: [String],
});
const Category = (0, mongoose_1.model)("Category", CategorySchema);
exports.default = Category;
