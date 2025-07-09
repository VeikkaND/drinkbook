require("dotenv").config()
const bcrypt = require("bcrypt")
const express = require("express")
const router = express.Router()
const db = require("../util/db")
const { generateToken } = require("../util/token")

router.get("/", async (req, res) => {
    const id = req.query.id
    const email = req.query.email
    const token = req.decoded_token
    // TODO verify token
    if(email != token.email) {
        res.status(403).send("Forbidden")
    }
    try {
        const data = await db.one(
            `SELECT * FROM users WHERE email = $/email/;`, 
            {email}
        )
        res.status(200).send(data)
    } catch (err) {
        res.status(400).send(err.name)
    }
})

router.post("/register", async (req, res) => {
    const name = req.body.name
    const email = req.body.email
    const password = req.body.password

    console.log(name, email, password)

    try {
        const saltRounds = 10
        bcrypt.hash(password, saltRounds, async (err, hash) => {
            const user = await db.one(
                `INSERT INTO users (user_name, email, password) 
                VALUES ($/name/, $/email/, $/hash/) RETURNING *`, 
                {name, email, hash}
            )
            const token = generateToken(user.user_name, user.email)
            const u = {
                token: token,
                user_name: user.user_name,
                user_id: user.user_id,
                email: user.email
            }
            res.status(200).send(u)
        })
    } catch (err) {
        res.status(400).send(err)
    }
    
})

router.post("/login", async (req, res) => {
    const name = req.body.name
    const password = req.body.password
    try {
        //get hash from DB
        const user = await db.one(
            `SELECT * FROM users WHERE user_name = $/name/;`, 
            {name}
        )
        console.log("user found: ", user)
        bcrypt.compare(password, user.password, (err, match) => {
            if(match) {
                //generate jwt for user
                const token = generateToken(user.user_name, user.email)
                const u = {
                    token: token,
                    user_name: user.user_name,
                    user_id: user.user_id,
                    email: user.email
                }
                res.status(200).send(u)
            } else {
                res.status(401).send("wrong password")
            }
        })
    } catch (err) {
        console.log(err)
        res.status(400).send(err)
    }

    
})

router.get("/starred", async (req, res) => {
    const email = req.query.email
    try {
        const starred_res = await db.any(
            `SELECT starred_drinks FROM users
            WHERE email = $/email/;`,
            {email}
        )
        const starred_ids = starred_res[0].starred_drinks
        const drinks = await db.many(
            `SELECT * FROM drink
            WHERE drink_id IN ($/ids:csv/);`,
            {ids: starred_ids}
        )
        res.status(200).send(drinks)
    } catch (err) {
        res.status(400).send(err.name)
    }
})

router.get("/created", async (req, res) => {
    const email = req.query.email
    try {
        const created_res = await db.any(
            `SELECT created_drinks FROM users
            WHERE email = $/email/;`,
            {email}
        )
        const created_ids = created_res[0].created_drinks
        const drinks = await db.many(
            `SELECT * FROM drink
            WHERE drink_id IN ($/ids:csv/);`,
            {ids: created_ids}
        )
        res.status(200).send(drinks)
    } catch (err) {
        res.status(400).send(err.name)
    }
})

module.exports = router