import axios from "axios";
import Question from "../models/Question";

class QuestionApi {
    public static async AddQuesRequest(question: Question) {
        try {
            const response = await axios.post("http://localhost:3001/admin/ques-req", question.toString())
            console.log(response)
            // return response
        } catch (error) {
            console.log(error)
        }
    }
}

export default QuestionApi