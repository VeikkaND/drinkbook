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

//get drinks with the same name
router.get("/name", async (req, res) => {
    const input = req.query.input
    const name = input.toLowerCase()
    try {
        const drinks = await db.any(
            `SELECT * FROM drink WHERE LOWER(drink.name)
            LIKE $/name/;`,
            {name}
        )
        await Promise.all(
            drinks.map(async (drink) => {
                const drink_id = drink.drink_id
                const ingredients = await db.many(
                    `SELECT amount, unit, name FROM drink_ingredient 
                    INNER JOIN ingredient ON 
                    ingredient.ingredient_id = drink_ingredient.ingredient_id
                    WHERE drink_ingredient.drink_id = $/drink_id/;`, 
                    {drink_id}
                )
                drink.ingredients = ingredients
            })
        )
        res.status(200).send(drinks)
    } catch (err) {
        res.status(400).send(err.name)
    }
})

//get top 5 drinks by stars
router.get("/top5", async (req, res) => {
    try {
        const drinks = await db.many(
            `SELECT * FROM drink ORDER BY stars DESC limit 5`
        )
        res.status(200).send(drinks)
    } catch (err) {
        res.status(400).send(err.name)
    }
})

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

//get drinks with input ingredient
router.get("/ingredient", async (req, res) => {
    const ingredient_name = req.query.ingredient
    try {
        const obj = await db.one(
            `SELECT ingredient_id FROM ingredient 
            WHERE name = $/ingredient_name/;`, 
            {ingredient_name}
        )

        const id = obj.ingredient_id
        const drink_ids = await db.any(
            `SELECT drink_id FROM drink_ingredient 
            WHERE ingredient_id = $/id/;`, 
            {id}
        )

        const ids = drink_ids.map((_id) => _id = _id.drink_id)
        const drinks = await db.any(
            `SELECT * FROM drink 
            WHERE drink_id IN ($/ids:csv/);`, 
            {ids}
        )
        res.status(200).send(drinks)
    } catch (err) {
        res.status(400).send(err.name)
    }
})

//add a star to a drink
router.put("/id/star", async (req, res) => {
    const drink_id = req.body.drink_id
    const user = req.body.user
    const token = req.decoded_token
    
    //check if token matches with given email
    if(user.email == token.email) { 
        try {
            //check if drink is starred by user
            const starred = await db.oneOrNone(
                `SELECT * FROM users WHERE email = $/email/
                AND $/drink_id/ = ANY (starred_drinks);`, 
                {
                    email: user.email,
                    drink_id: drink_id
                }
            )

            if(!starred){
                await db.none( // add star to drink & users starred
                    `UPDATE drink SET stars = stars + 1 
                    WHERE drink_id = $/drink_id/;
                    UPDATE users SET starred_drinks = 
                    array_append(starred_drinks, $/drink_id/)
                    WHERE email = $/email/;`,
                    {drink_id, email: user.email}
                )
                res.status(200).send("add")
            } else {
                await db.none( // remove star from drink & users starred
                    `UPDATE drink SET stars = stars - 1 
                    WHERE drink_id = $/drink_id/;
                    UPDATE users SET starred_drinks = 
                    array_remove(starred_drinks, $/drink_id/)
                    WHERE email = $/email/;`,
                    {drink_id, email: user.email}
                )
                res.status(200).send("remove")
            }
        
        } catch (err) {
            res.status(400).send(err.name)
        }
    } else {
        res.status(401).send("Unauthorized")
    }
})

//new drink
router.post("/", async (req, res) => {
    const name = req.body.name
    const steps = req.body.steps
    const color = req.body.color
    const glass = req.body.glass
    const user = req.body.user
    const token = req.decoded_token
    const ingredients = req.body.ingredients
    const ingredient_names = ingredients.map(
        (i) => i.name.toLowerCase())
    
    try {
        if(user.email != token.email) {
            res.status(401).send("Unauthorized")
        }
        //create ingredient in db if it doesn't exist
        await ingredient_names.forEach(async (ing) => {
            await db.any(
                `INSERT INTO ingredient (name) VALUES ($/ing/)
                ON CONFLICT DO NOTHING;`, 
                {ing}
            )
        })

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
        await Promise.all(
            ingredients.map(async (ing, i) => {
                await db.none(
                `INSERT INTO drink_ingredient
                (drink_id, ingredient_id, amount, unit)
                VALUES ($/drink_id/, $/ingredient_id/,
                $/amount/, $/unit/);`, 
                    {
                        drink_id: data.drink_id, 
                        ingredient_id: ingredient_ids[i].ingredient_id, 
                        amount: ingredients[i].amount, 
                        unit: ingredients[i].unit
                    }
                )
            })
        )
        
        await db.none( // insert created drink id to users
            `UPDATE users SET created_drinks = 
            array_append(created_drinks, $/drink_id/)
            WHERE email = $/email/;`, 
            {
                drink_id: data.drink_id, 
                email: user.email, 
            }
        )
        res.status(201).send(data.drink_id)
    } catch(err) {
        console.log(err)
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