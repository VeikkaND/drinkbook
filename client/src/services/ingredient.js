import axios from "axios";
const API_URL = import.meta.env.PROD
    ? import.meta.env.VITE_API_URL
    : "/api"

const getAllIngredientNames = async () => {
    const res = await axios.get(`${API_URL}/ingredient/all`)
    const ingredients = res.data.map((obj) => obj = obj.name)
    return ingredients
}

export default {
    getAllIngredientNames
}