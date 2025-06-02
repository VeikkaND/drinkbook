require("dotenv").config
const express = require("express")
const router = express.Router()
const db = require("../util/db")
const bcrypt = require("bcrypt")

router.get("/", (req, res) => {

})

//get user by username
router.get("/user/:user", (req, res) => {
    const user = req.params.user
})

router.get("/login", async (req, res) => {
    const user_name = req.body.user_name
    const password = req.body.password

    //get password hash from db
    try {
        const data = await db.one(
            `SELECT (password) FROM users 
            WHERE users.user_name = $/user_name/;`, 
            {user_name}
        )
        const hash = data.password
        bcrypt.compare(password, hash, (err, result) => {
            if(result == true) {
                //TODO CREATE TOKEN
                res.status(200).send("login successfull")
            } else {
                res.status(401).send("wrong password")
            }
        })
    } catch (err) {
        res.status(400).send("could not find user")
    }
})

//create new user
router.post("/", (req, res) => {
    const user_name = req.body.user_name
    const password = req.body.password
    const email = req.body.email

    //hash the password and insert user into db
    const saltRounds = 10
    bcrypt.hash(password, saltRounds, async (err, hash) => {
        try {
            await db.none(
                `INSERT INTO users (user_name, password, email) 
                VALUES ($/user_name/, $/hash/, $/email/);`, 
                {user_name, hash, email}
            )
            res.status(201).send("user created")
        } catch (error) {
            res.status(400).send(error.name)
        }
    })
})

//delete user
router.delete("/:user_id", (req, res) => {
    const user_id = req.params.user_id
})

//update user
router.put("/:user_id", (req, res) => {
    const user_id = req.params.user_id
})

module.exports = router