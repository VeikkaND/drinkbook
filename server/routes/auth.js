require("dotenv").config()
const express = require("express")
const router = express.Router()

const GOOGLE_OAUTH_URL = process.env.GOOGLE_OAUTH_URL
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
const GOOGLE_CALLBACK_URL = "http://localhost:5173"
const GOOGLE_OAUTH_SCOPES = [
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/userinfo.profile"
]

router.get("/", (req, res) => {
    const state = "test"
    const scopes = GOOGLE_OAUTH_SCOPES.join(" ")
    const GOOGLE_OAUTH_CONSENT_SCREEN_URL = 
    `${GOOGLE_OAUTH_URL}?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${GOOGLE_CALLBACK_URL}&access_type=offline&response_type=code&state=${state}&scope=${scopes}`
    res.redirect(GOOGLE_OAUTH_CONSENT_SCREEN_URL)
})

module.exports = router