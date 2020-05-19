var express = require('express')
var router = express.Router()
const db = require("../db/config")

router.post("/api/appointments/new", (req, res) => {
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


module.exports = router