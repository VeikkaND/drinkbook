const express = require("express")
const app = express()
const port = 3000
const drinks = require("./routes/drinks")
const ingredients = require("./routes/ingredient")
const auth = require("./routes/auth")
const oauth = require("./routes/oauth")
const user = require("./routes/user")
const cors = require("cors")
const {verifyToken} = require("./util/token")

app.use(express.json(), verifyToken)
app.use(cors())
app.use("/drink", drinks)
app.use("/ingredient", ingredients)
app.use("/auth", auth)
app.use("/google/callback", oauth)
app.use("/user", user)

app.listen(port, "0.0.0.0" , () => {
    console.log(`server running on port ${port}`)
})