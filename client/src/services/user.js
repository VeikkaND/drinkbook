import axios from "axios"

const getUser = async (token, email) => {
    const res = await axios.get("/api/user", 
        {params: {email: email}, 
        headers: {"Authorization": `Bearer ${token}`}}
    )
    return res.data
}

const getStarred = async (email) => {
    const res = await axios.get("/api/user/starred",
        {params: {email: email}}
    )
    return res.data
}

const getCreated = async (email) => {
    const res = await axios.get("/api/user/created",
        {params: {email: email}}
    )
    return res.data
}

export default {
    getUser,
    getStarred,
    getCreated
}