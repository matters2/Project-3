console.log("Server-side JS")

const express = require("express")
const app = express()
const port = 8080
const db = require("./db/config")
const pwd = require("./models/password")
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
    passwordDigest = pwd.digest(req.body.password)
    db.query(
        "INSERT INTO users (username, email, password_digest) VALUES ($1, $2, $3);",
        [req.body.username, req.body.email, passwordDigest],
        (err, dbRes) => {
            res.json({
                username: req.body.username,
                email: req.body.email,
                password_digest: passwordDigest
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
        [
            req.body.petId,
            req.body.appType,
            req.body.location,
            req.body.apptDate,
            req.body.comments
        ],
        (err, dbRes) => {
            res.json({
                pet_id: req.body.petId,
                appt_type: req.body.appType,
                location: req.body.location,
                appt_date: req.body.apptDate,
                comments: req.body.comments
            })
        }
    )
})

app.post("/api/meds/new", (req, res) => {
    db.query(
        "INSERT INTO meds (pet_id, comments) VALUES ($1, $2);",
        [
            req.body.petId,
            req.body.comments
        ],
        (err, dbRes) => {
            res.json({
                pet_id: req.body.petId,
                comments: req.body.comments
            })
        }
    )
})





app.listen(port, () => {
    console.log(`listening on port ${port}`)
})