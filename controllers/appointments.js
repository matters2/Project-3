var express = require('express')
var router = express.Router()
const db = require("../db/config")

router.post("/api/appointments/new", (req, res) => {
    db.query(
        "INSERT INTO appointments (pet_id, appt_type, location, appt_date, comments, user_id) VALUES ($1, $2, $3, $4, $5, $6);",
        [
            req.body.petId,
            req.body.appType,
            req.body.location,
            req.body.apptDate,
            req.body.comments,
            req.body.user_id
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

router.get("/api/appointments/:pet_id", (req, res) => {
    db.query(
        "SELECT * FROM appointments WHERE pet_id = $1;",
        [req.params.pet_id],
        (err, dbRes) => {
            res.json(dbRes.rows)
        
        }
    )
}) 


module.exports = router