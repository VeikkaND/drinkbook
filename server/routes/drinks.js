require("dotenv").config()
const express = require("express")
const router = express.Router()
const pgp = require("pg-promise")()
const db = pgp(`postgres://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`)

//get drinks
router.get("/", async (req, res) => {
    const drinks = await db.any("SELECT * FROM drink")
    res.send(drinks)
})

//new drink
router.post("/", (req, res) => {
    const drink = req.body
    console.log(drink)
})

//update drink
router.put("/", (req, res) => {

})

//delete drink
router.delete("/", (req, res) => {

})

module.exports = router