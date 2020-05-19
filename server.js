console.log("Server-side JS")

const express = require("express")
const port = 8080
const db = require("./db/config")
const pwd = require("./models/password")
const morgan = require('morgan');
const bodyParser = require('body-parser');
// const passport = require('passport');
// const Strategy = require('passport-local').Strategy;



// passport.use(new Strategy((username, password, cb) => {
//       callbensfucntionforuser(username, (err, user) => {
//         if (!user) { return cb(null, false); }
//         if (user.password != password) { return cb(null, false); }
//         return cb(null, user);
//       });
// }));

// passport.serializeUser(function(user, cb) {
//     cb(null, user.id);
// });
  
// passport.deserializeUser((id, cb) => {
//     db.users.findById(id, function (err, user) {
//         if (err) { return cb(err); }
//         cb(null, user);
//     });
// });




const app = express()

////////// MIDDLEWARE ///////////

app.use(morgan("combined"))

app.use(bodyParser.json()) // reads params from body

app.use(express.static('public'))

// app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));

// app.use(passport.initialize());
// app.use(passport.session());

////////// MIDDLEWARE ///////////


app.get("/", (req,res) => {
    res.send("hello world")
})

// app.get('/login', (req, res) => {
//     res.render('login');
// });

// app.post('/login', 
//     passport.authenticate('local', { failureRedirect: '/login' }),
//     function(req, res) {
//         res.redirect('/');
//     });

// app.get('/logout', (req, res) => {
//     req.logout();
//     res.redirect('/');
//   });

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

// app.get("/pet", (req, res) => {
//     ​
//     // let dbPets = [
//     //     {
//     //     name: "Poochie",
//     //     species: "dog",
//     //     dob: "2020-05-13",
//     //     image_url: "dog.jpg"
//     //     },
//     //     {
//     //     name: "Puss n Boots",
//     //     species: "cat",
//     //     dob: "2019-10-09",
//     //     image_url: "cat.jpg"
//     //     },
//     //     {
//     //     name: "Smoothy",
//     //     species: "possum",
//     //     dob: "2018-02-28",
//     //     image_url: "possum.jpg"
//     //     }
//     // ]
//     ​
//     ​
//     ​
//     // res.render('dashboard', { pets: dbPets })
// }) 



app.listen(port, () => {
    console.log(`listening on port ${port}`)
})