require("dotenv").config()
const express = require("express")
const router = express.Router()
const pgp = require("pg-promise")()
const db = pgp(`postgres://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`)

//get ALL drinks
router.get("/", async (req, res) => {
    try {
        const drinks = await db.any("SELECT * FROM drink;")
        res.status(200).send(drinks)
    } catch (err) {
        res.status(400).send(err.name)
    }
    
})

//get drinks by name
router.get("/:drink", async (req, res) => {
    const drink_name = req.params.drink
    try {
        const drinks = await db.any(
            `SELECT * FROM drink WHERE drink.name = $/drink_name/;`, 
            {drink_name})
        res.status(200).send(drinks)
    } catch (err) {
        res.status(400).send(err)
    }
    
})

//get drink by id
router.get("/:drink/:id", async (req, res) => {
    const drink_name = req.params.drink
    const drink_id = req.params.id
    try {
        const drink = await db.one(
            `SELECT * FROM drink WHERE drink.drink_id = $/drink_id/;`, 
            {drink_id}
        )
        //find all ingredients for drink
        const ingredients = await db.many(
            `SELECT amount, unit, name FROM drink_ingredient 
            INNER JOIN ingredient ON 
            ingredient.ingredient_id = drink_ingredient.ingredient_id
            WHERE drink_ingredient.drink_id = $/drink_id/;`, 
            {drink_id}
        )
        res.status(200).send({drink, ingredients})
    } catch (err) {
        res.status(400).send(err.name)
    }
})

//new drink
router.post("/", async (req, res) => {
    const name = req.body.name
    const steps = req.body.steps
    const ingredients = req.body.ingredients
    const ingredient_names = ingredients.map(
        (i) => i.name.toLowerCase())
    console.log(name, steps, ingredients)
    console.log(ingredient_names)

    
    try {
        //find all ingredient IDs
        const ingredient_ids = await db.any(
            `SELECT (ingredient_id) FROM ingredient 
            WHERE ingredient.name IN ($/ingredient_names:csv/);`, 
            {ingredient_names}
        )
        //insert new drink into db
        const data = await db.one(
            `INSERT INTO drink (name, steps) 
            VALUES ($/name/, $/steps/) RETURNING drink_id;`, 
            {name, steps}
        )
        //insert all ingredients in drink to db
        for(let i = 0; i < ingredient_ids.length; i++) {
            console.log(ingredient_ids[i])
            await db.none(
                `INSERT INTO drink_ingredient
                (drink_id, ingredient_id, amount, unit)
                VALUES ($/drink_id/, $/ingredient_id/,
                $/amount/, $/unit/)`, 
                {drink_id: data.drink_id, 
                    ingredient_id: ingredient_ids[i].ingredient_id, 
                    amount: ingredients[i].amount, 
                    unit: ingredients[i].unit
                }
            )
        }
        
    } catch(err) {
        console.log(err)
    }
})

//update drink
router.put("/", (req, res) => {

})

//delete drink
router.delete("/", (req, res) => {

})

module.exports = router