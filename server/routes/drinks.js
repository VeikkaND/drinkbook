require("dotenv").config()
const express = require("express")
const router = express.Router()
const db = require("../util/db")

//get ALL drinks
router.get("/", async (req, res) => {
    try {
        const drinks = await db.any("SELECT * FROM drink;")
        res.status(200).send(drinks)
    } catch (err) {
        res.status(400).send(err.name)
    }
    
})

//get all different drink names
router.get("/names", async (req, res) => {
    try {
        const names = await db.any(
            "SELECT (name) FROM drink GROUP BY name;"
        )
        res.status(200).send(names)
    } catch (err) {
        res.status(400).send(err.name)
    }
})

//get all matching drinks with input string
router.get("/drinks", async (req, res) => {
    const input = req.query.input
    const filter = '%' + input.toLowerCase() + '%'
    try {
        const drinks = await db.any(
            `SELECT * FROM drink 
            WHERE LOWER(drink.name) LIKE $/filter/;`
            ,{filter}
        )
        res.status(200).send(drinks)
    } catch (err) {
        console.log(err)
        res.status(400).send("not found")
    }
})

//get drinks by name
//TODO delete, or change address?
/*
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
*/

//get drink by id
router.get("/id", async (req, res) => {
    const drink_name = req.query.drink
    const drink_id = req.query.id
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
    const color = req.body.color
    const glass = req.body.glass
    const ingredients = req.body.ingredients
    const ingredient_names = ingredients.map(
        (i) => i.name.toLowerCase())
    
    try {
        //TODO !! create ingredient in db if it doesn't exist !!

        //find all ingredient IDs
        const ingredient_ids = await db.any(
            `SELECT (ingredient_id) FROM ingredient 
            WHERE ingredient.name IN ($/ingredient_names:csv/);`, 
            {ingredient_names}
        )
        //insert new drink into db
        const data = await db.one(
            `INSERT INTO drink (name, steps, color, glass) 
            VALUES ($/name/, $/steps/, $/color/, $/glass/) 
            RETURNING drink_id;`, 
            {name, steps, color, glass}
        )
        //insert all ingredients in drink to db (drink_ingredient)
        for(let i = 0; i < ingredient_ids.length; i++) {
            console.log(ingredient_ids[i])
            await db.none(
                `INSERT INTO drink_ingredient
                (drink_id, ingredient_id, amount, unit)
                VALUES ($/drink_id/, $/ingredient_id/,
                $/amount/, $/unit/);`, 
                {drink_id: data.drink_id, 
                    ingredient_id: ingredient_ids[i].ingredient_id, 
                    amount: ingredients[i].amount, 
                    unit: ingredients[i].unit
                }
            )
        }
        res.status(201).send("drink created")
    } catch(err) {
        res.status(400).send(err.name)
    }
})

//update drink
router.put("/", (req, res) => {

})

//delete drink
router.delete("/", async (req, res) => {
    const id = req.body.id
    try {
        await db.none(
            `DELETE FROM drink WHERE drink_id = $/id/;`, {id}
        )
        res.status(200).send(id)
    } catch (err) {
        console.log(err)
        res.status(400).send(err.name)
    }
})

module.exports = router