var express = require('express')
var router = express.Router()
const db = require("../db/config")

router.post("/api/meds/new", (req, res) => {
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