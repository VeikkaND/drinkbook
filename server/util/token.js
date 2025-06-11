require("dotenv").config()
const jwt = require("jsonwebtoken")

const generateToken = (name) => {
    const token = jwt.sign({name: name}, process.env.JWT_KEY)
    return token
}

module.exports = {generateToken}