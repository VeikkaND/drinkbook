import axios from "axios"
const API_URL = import.meta.env.PROD
    ? import.meta.env.VITE_API_URL
    : "/api"

const getAllDrinkNames = async () => {
    const res = await axios.get(`${API_URL}/drink/names`)
    const names = res.data.map((x) => x.name)
    return names
}

const getDrinksByInput = async (input) => {
    const res = await axios.get(`${API_URL}/drink/drinks`, 
        {params: {input: input}})
    return res.data
}

const getDrinksWithSameName = async (input) => {
    const res = await axios.get(`${API_URL}/drink/name`,
        {params: {input: input}}
    )
    return res.data
}

const getAllDrinks = async () => {
    const res = await axios.get(`${API_URL}/drink/`)
    const drinks = res.data
    return drinks
}

const getDrinkById = async (name, id) => {
    const res = await axios.get(`${API_URL}/drink/id`, 
        {params: {name: name, id: id}})
    return res.data
}

const createDrink = async (
    name, ingredients, steps, color, glass, token, user) => {
        const res = await axios.post(`${API_URL}/drink/`, {
            name: name,
            ingredients: ingredients,
            steps: steps,
            color: color,
            glass: glass,
            user: user
        }, {headers: {"Authorization": `Bearer ${token}`}})
        return res.data
}

const starDrink = async (id, token, user) => {
    const res = await axios.put(`${API_URL}/drink/id/star`, {
        drink_id: id,
        user: user
    }, {headers: {"Authorization": `Bearer ${token}`}})
    return res.data
}

const getTop5 = async () => {
    const res = await axios.get(`${API_URL}/drink/top5`)
    return res.data
}

const getDrinksWithIngredient = async (name) => {
    const res = await axios.get(`${API_URL}/drink/ingredient`, {
        params: {ingredient: name}
    })
    return res.data
}

export default {getAllDrinkNames, 
    getDrinksByInput, 
    getAllDrinks, 
    getDrinkById,
    createDrink,
    starDrink,
    getTop5,
    getDrinksWithIngredient,
    getDrinksWithSameName
}