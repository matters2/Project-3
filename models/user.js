app.get("/api/users/:username", (req,res) => {
    db.query(
        "SELECT * FROM users WHERE username = $1;",
        [req.params.username],
        (err, dbRes) => {
            res.json(dbRes.rows)
        }
    )
}) // select one user by username