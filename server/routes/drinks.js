require("dotenv").config()
const express = require("express")
const router = express.Router()
const pgp = require("pg-promise")()
const db = pgp(`postgres://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`)

//get ALL drinks
router.get("/", async (req, res) => {
    const drinks = await db.any("SELECT * FROM drink;")
    res.send(drinks)
})

//get drinks by name
router.get("/:drink", async (req, res) => {
    const drink_name = req.params.drink
    const drinks = await db.any(
        `SELECT * FROM drink WHERE drink.name = '${drink_name}';`)
    res.send(drinks)
})

//get drink by id
router.get("/:drink/:id", async (req, res) => {
    const drink_name = req.params.drink
    const drink_id = req.params.id
    try {
        const drink = await db.one(
            `SELECT * FROM drink WHERE drink.drink_id = ${drink_id};`
        )
        //find all ingredients for drink
        const ingredients = await db.many(
            `SELECT amount, unit, name FROM drink_ingredient 
            INNER JOIN ingredient ON 
            ingredient.ingredient_id = drink_ingredient.ingredient_id
            WHERE drink_ingredient.drink_id = ${drink_id};`
        )
        res.status(200).send({drink, ingredients})
    } catch (err) {
        res.status(400).send(err.name)
    }
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