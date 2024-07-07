import axios from "axios";
import Category from "../models/Category";

class CategoryApi {
    public static async Home() {
        let response;
        await axios.get("http://localhost:3001/category")
            .then(res => {
                response = Category.FactoryGetList(res.data);
            })
            .catch(err => {
                console.log(err)
            });
        return response
	}
}

export default CategoryApi;
