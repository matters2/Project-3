var express = require('express')
var router = express.Router()
const db = require("../db/config")

router.post("/api/meds/new", (req, res) => {
    db.query(
        "INSERT INTO meds (pet_id, comments, user_id) VALUES ($1, $2, $3);",
        [
            req.body.petId,
            req.body.comments,
            req.body.userId
        ],
        (err, dbRes) => {
            res.json({
                pet_id: req.body.petId,
                comments: req.body.comments,
                user_id: req.body.userId
            })
        }
    )
})

router.get("/api/meds/:pet_id", (req, res) => {
    db.query(
        "SELECT * FROM meds WHERE pet_id = $1;",
        [req.params.pet_id],
        (err, dbRes) => {
            res.json(dbRes.rows)
        
        }
    )
}) 


module.exports = router