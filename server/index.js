const express = require("express")
const app = express()
const port = 3000
const drinks = require("./routes/drinks")
const users = require("./routes/users")
const ingredients = require("./routes/ingredient")
const auth = require("./routes/auth")
const oauth = require("./routes/oauth")

app.use(express.json())
app.use("/drink", drinks)
app.use("/user", users)
app.use("/ingredient", ingredients)
app.use("/auth", auth)
app.use("/google/callback", oauth)

app.listen(port, () => {
    console.log(`server running on port ${port}`)
})