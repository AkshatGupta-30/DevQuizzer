import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const DbConnect = async () => {
    try {
        // await mongoose.connect(process.env.MONGO_LOCAL_URL!);
		await mongoose.connect(process.env.MONGO_GLOBAL_URL! + "/" + process.env.DATABASE_NAME!);
		console.log("MongoDb Connected Succesfully");
	} catch (err) {
		console.log("Error in connecting to MongoDB server");
		console.log(err);
		process.exit(1);
	}
};

export default DbConnect;
