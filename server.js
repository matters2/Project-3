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

app.use(express.static('public'))

////////// MIDDLEWARE ///////////


app.get("/", (req,res) => {
    res.send("hello world")
})

app.post("/api/users/new", (req, res) => {
    db.query(
        "INSERT INTO users (username, email, password_digest) VALUES ($1, $2, $3);",
        [req.body.username, req.body.email, req.body.password],
        (err, dbRes) => {
            res.json({
                username: req.body.username,
                email: req.body.email,
                password_digest: req.body.password
            })
        }
    )
})

app.post("/api/pets/new", (req, res) => {
    db.query(
        "INSERT INTO pets (user_id, species, dob, name, image_url) VALUES ($1, $2, $3, $4, $5);",
        [
        req.body.userId,
        req.body.species,
        req.body.dob,
        req.body.name,
        req.body.image_url
        ],

        (err, dbRes) => {
            res.json({
                user_id: 1,
                species: req.body.species,
                dob: req.body.dob,
                name: req.body.name,
                image_url: req.body.image_url
            })
        }
    )
})

app.post("/api/appointments/new", (req, res) => {
    db.query(
        "INSERT INTO appointments (pet_id, appt_type, location, appt_date, comments) VALUES ($1, $2, $3, $4, $5);",
        [1, "vet","melbourne","2020-05-20", "checkup, dog is sick"],
        (err, dbRes) => {
            res.json({
                pet_id: 1,
                appt_type: "vet",
                location: "melbourne",
                appt_date: "2020-05-20",
                comments: "checkup, dog is sick"
            })
        }
    )
})


app.post("/api/meds/new", (req, res) => {
    db.query(
        "INSERT INTO meds (pet_id, comments) VALUES ($1, $2);",
        [1,"Worming tablets"],
        (err, dbRes) => {
            res.json({
                pet_id: 1,
                comments: "Worming Tablets"
            })
        }
    )
})





app.listen(port, () => {
    console.log(`listening on port ${port}`)
})