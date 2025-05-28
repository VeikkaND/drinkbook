const express = require("express")
const app = express()
const port = 3000
const drinks = require("./routes/drinks")

app.get("/", (req, res) => {
    res.send("hello world")
})

app.use(express.json())
app.use("/api/drink", drinks)

app.listen(port, () => {
    console.log(`server running on port ${port}`)
})