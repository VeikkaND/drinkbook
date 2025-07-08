import axios from "axios"
const API_URL = import.meta.env.PROD
    ? import.meta.env.VITE_API_URL
    : "/api"

const getUser = async (token, email) => {
    const res = await axios.get(`${API_URL}/user`, 
        {params: {email: email}, 
        headers: {"Authorization": `Bearer ${token}`}}
    )
    return res.data
}

const getStarred = async (email) => {
    const res = await axios.get(`${API_URL}/user/starred`,
        {params: {email: email}}
    )
    return res.data
}

const getCreated = async (email) => {
    const res = await axios.get(`${API_URL}/user/created`,
        {params: {email: email}}
    )
    return res.data
}

export default {
    getUser,
    getStarred,
    getCreated
}