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

app.post("/api/users/new", (req, res) => {
    db.query(
        "INSERT INTO users (username, email, password_digest) VALUES ($1, $2, $3);",
        ["ben","ben@email.com","hahaha"],
        (err, dbRes) => {
            res.json({
                username: "ben",
                email: "ben@email.com",
                password_digest: "hahaha"
            })
        }
    )
})
app.post("/api/pets/new", (req, res) => {
    db.query(
        "INSERT INTO pets (user_id, species, dob, name, image_url) VALUES ($1, $2, $3, $4, $5);",
        [1, "dog","2000-12-31","doggy", "dog.jpg"],
        (err, dbRes) => {
            res.json({
                user_id: 1,
                species: "dog",
                dob: "2000-12-31",
                name: "doggy",
                image_url: "dog.jpg"
            })
        }
    )
})




app.listen(port, () => {
    console.log(`listening on port ${port}`)
})