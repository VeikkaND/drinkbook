require("dotenv").config()
const express = require("express");
const router = express.Router()
const db = require("../util/db")
const {generateToken} = require("../util/token");

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const GOOGLE_ACCESS_TOKEN_URL = process.env.GOOGLE_ACCESS_TOKEN_URL;

router.get("/", async (req, res) => {
    const {code} = req.query
    const data = { // create object for google access token
        code,
        client_id: GOOGLE_CLIENT_ID,
        client_secret: GOOGLE_CLIENT_SECRET,
        redirect_uri: "http://localhost:5173",
        grant_type: "authorization_code"
    }
    
    //fetch id token for user
    const response = await fetch(GOOGLE_ACCESS_TOKEN_URL, {
        method: "POST",
        body: JSON.stringify(data)
    })
    const access_token_data = await response.json()
    const {id_token} = access_token_data

    //fetch user info for id token
    const token_info_response = await fetch(
        `${process.env.GOOGLE_TOKEN_INFO_URL}?id_token=${id_token}`
    )
    const {email, name} = await token_info_response.json()

    let user = await db.any( // check if account exists in db
        `SELECT * FROM users WHERE email = $/email/`, {email}
    )
    if(!user[0]) { // create account if user not in db
        user = await db.one(
            `INSERT INTO users (user_name, email) 
            VALUES ($/name/, $/email/) RETURNING *`, {name, email}
        )
    }
    const token = generateToken(name, email) // generate jwt for user
    res.status(token_info_response.status).send({user, token})
})

module.exports = router