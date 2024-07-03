import axios from "axios"
import Category from "../models/Category"

class CategoryApi {
    public static async Home() {
        try {
            const response = await axios.get("http://localhost:3001/category")
            return Category.FactoryGetList(response.data)
        } catch (error) {
            console.log(error)
        }
    }
}

export default CategoryApi