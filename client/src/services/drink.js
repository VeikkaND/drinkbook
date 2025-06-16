import axios from "axios"

const getAllDrinkNames = async () => {
    const res = await axios.get("/api/drink/names")
    const names = res.data.map((x) => x.name)
    return names
}

const getDrinksByInput = async (input) => {
    const res = await axios.get("/api/drink/drinks", 
        {params: {input: input}})
    return res.data
}

const getDrinksWithSameName = async (input) => {
    const res = await axios.get("/api/drink/name",
        {params: {input: input}}
    )
    return res.data
}

const getAllDrinks = async () => {
    const res = await axios.get("/api/drink/")
    const drinks = res.data
    return drinks
}

const getDrinkById = async (name, id) => {
    const res = await axios.get(`/api/drink/id`, 
        {params: {name: name, id: id}})
    return res.data
}

const createDrink = async (
    name, ingredients, steps, color, glass, token, user) => {
        const res = await axios.post(`/api/drink/`, {
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
    const res = await axios.put(`/api/drink/id/star`, {
        drink_id: id,
        user: user
    }, {headers: {"Authorization": `Bearer ${token}`}})
    return res.data
}

const getTop5 = async () => {
    const res = await axios.get(`/api/drink/top5`)
    return res.data
}

const getDrinksWithIngredient = async (name) => {
    const res = await axios.get(`/api/drink/ingredient`, {
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