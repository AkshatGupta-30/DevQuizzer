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
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const DbConnect = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // await mongoose.connect(process.env.MONGO_LOCAL_URL!);
        yield mongoose_1.default.connect(process.env.MONGO_GLOBAL_URL + "/" + process.env.DATABASE_NAME);
        console.log("MongoDb Connected Succesfully");
    }
    catch (err) {
        console.log("Error in connecting to MongoDB server");
        console.log(err);
        process.exit(1);
    }
});
exports.default = DbConnect;
