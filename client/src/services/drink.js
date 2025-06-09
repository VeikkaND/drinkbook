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
    name, ingredients, steps, color, glass) => {
        //TODO add user to drink details in db
        const res = await axios.post(`/api/drink/`, {
            name: name,
            ingredients: ingredients,
            steps: steps,
            color: color,
            glass: glass
        })
        console.log(res.data)
}

const starDrink = async (id) => {
    const res = await axios.put(`/api/drink/id/star`, {
        drink_id: id
    })
}

const getTop5 = async () => {
    const res = await axios.get(`/api/drink/top5`)
    return res.data
}

export default {getAllDrinkNames, 
    getDrinksByInput, 
    getAllDrinks, 
    getDrinkById,
    createDrink,
    starDrink,
    getTop5
}