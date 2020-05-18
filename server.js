console.log("Server-side JS")

const express = require("express")
const app = express()
const port = 8080
const db = require("./db/config")
const morgan = require('morgan');
const bodyParser = require('body-parser');

////////// MIDDLEWARE ///////////

app.use(morgan("combined"))

app.use(bodyParser.json()) // reads params from body

// app.use(express.static("public"))

////////// MIDDLEWARE ///////////


app.get("/", (req,res) => {
    res.send("hello world")
})






app.listen(port, () => {
    console.log(`listening on port ${port}`)
})