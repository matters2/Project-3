var express = require('express')
var router = express.Router()
const db = require("../db/config")


router.post("/api/pets/new", (req, res) => {
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
}) // creates new pet


router.patch("/api/pets/edit", (req, res) => {
    db.query(
        "UPDATE pets SET species = $1, dob = $2, name = $3, image_url = $4 WHERE id = $5;",
        [
        
        req.body.species,
        req.body.dob,
        req.body.name,
        req.body.image_url, 
        req.body.id, 
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
}) // creates new pet






// router.get("/api/pets/:username", (req, res) => {
//     db.query(
//         "SELECT * FROM pets WHERE username = $1;",
//         [req.params.username],
//         (err, dbRes) => { 
//             res.json(dbRes.rows)
//         }
//     )
// }) // select all pets by username

router.get("/api/pets/:pet_id", (req, res) => {
    db.query(
        "SELECT * FROM pets WHERE id = $1;",
        [req.params.pet_id],
        (err, dbRes) => {
            res.json(dbRes.rows)
        
        }
    )
}) // select pet X by <username>

module.exports = router