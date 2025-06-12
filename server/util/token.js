require("dotenv").config()
const jwt = require("jsonwebtoken")

const generateToken = (name) => {
    const token = jwt.sign({name: name}, process.env.JWT_KEY)
    return token
}

const verifyToken = (req, res, next) => {
    const authorization = req.headers.authorization
    if(authorization) {
        const token = authorization.replace("Bearer ", "")
        console.log("token: ", token)
        req.decoded_token = jwt.verify(token, process.env.JWT_KEY)
    }
    next()
}

module.exports = {generateToken, verifyToken}