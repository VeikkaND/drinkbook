const express = require("express")
const app = express()
const port = 3000
const drinks = require("./routes/drinks")
const users = require("./routes/users")
const ingredients = require("./routes/ingredient")

app.use(express.json())
app.use("/drink", drinks)
app.use("/user", users)
app.use("/ingredient", ingredients)

app.listen(port, () => {
    console.log(`server running on port ${port}`)
})