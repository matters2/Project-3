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


module.exports = router