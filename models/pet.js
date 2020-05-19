app.get("/api/pets/:user_id", (req, res) => {
    db.query(
        "SELECT * FROM pets WHERE user_id = $1;",
        [req.params.user_id],
        (err, dbRes) => {
            res.json(dbRes.rows)
        }
    )
}) // select all pets by user_id