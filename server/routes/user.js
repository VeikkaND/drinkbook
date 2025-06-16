require("dotenv").config()
const express = require("express")
const router = express.Router()
const db = require("../util/db")

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