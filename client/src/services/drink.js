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

export default {getAllDrinkNames, getDrinksByInput}