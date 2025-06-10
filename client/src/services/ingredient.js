import axios from "axios";

const getAllIngredientNames = async () => {
    const res = await axios.get(`/api/ingredient/all`)
    const ingredients = res.data.map((obj) => obj = obj.name)
    return ingredients
}

export default {
    getAllIngredientNames
}