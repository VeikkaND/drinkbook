require("dotenv").config()
const express = require("express")
const router = express.Router()
const db = require("../util/db")

//create new ingredient
router.post("/", async (req, res) => {
    const ingredient_name = req.body.ingredient_name
    try {
        await db.none(
            `INSERT INTO ingredient (name) 
            VALUES ($/ingredient_name/);`,
            {ingredient_name}
        )
        res.status(201).send("ingredient created")
    } catch (err) {
        res.status(400).send("ingredient creation failed")
    }
})

//delete ingredient
router.delete("/", async (req, res) => {
    try {

    } catch (err) {
        
    }
})

module.exports = router
