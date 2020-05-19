var express = require('express')
var router = express.Router()
const db = require("../db/config")

router.get("/api/users/:username", (req,res) => {
    db.query(
        "SELECT * FROM users WHERE username = $1;",
        [req.params.username],
        (err, dbRes) => {
            res.json(dbRes.rows)
        }
    )
}) // select one user by username

router.post("/api/users/new", (req, res) => {
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
}) // create new user

module.exports = router