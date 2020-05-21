console.log("Server-side JS")

////////// DEPENDENCIES ///////////

const express = require("express")
const morgan = require('morgan');
const bodyParser = require('body-parser');
const passport = require('passport');
const Strategy = require('passport-local').Strategy;

////////// DEPENDENCIES ///////////


////////// CONTROLLERS ///////////

const db = require("./db/config")
const pwd = require("./models/password")
const petController = require('./controllers/pet');
const userController = require('./controllers/user');
const apptController = require('./controllers/appointments');
const medsController = require('./controllers/meds');

////////// CONTROLLERS ///////////


passport.use(new Strategy((username, password, cb) => {
    db.query(
        "select * from users where username = $1",
        [username],
        (err, dbRes) => {
          return cb(null, dbRes.rows[0])
        }
    )
}));

passport.serializeUser(function(user, cb) {
    cb(null, user.id);
});
  
passport.deserializeUser((id, cb) => {
    db.query(
        "select * from users where id = $1",
        [id],
        (err, dbRes) => {
          return cb(null, dbRes.rows[0])
        }
    )
});




////////// MIDDLEWARE ///////////

const app = express()

app.use(morgan("combined")) // error logger

app.use(bodyParser.json()) // reads params from body
app.use(bodyParser.urlencoded({extended: true})) 

app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));

app.use(passport.initialize());
app.use(passport.session());

app.set('view engine', 'ejs')

app.use(express.static('public'))
app.use('/', petController)
app.use('/', userController)
app.use('/', apptController)
app.use('/', medsController)

////////// MIDDLEWARE ///////////


app.get("/", (req, res) => {
    let user = {
        "id": 1,
        "username": "ben",
        "email": "ben@email.com",
        "password_digest": "hahaha"
    }
    let userId = 1 //[req.user.id]

    db.query(
        'select * from pets where user_id = $1',
        [userId],
        (err, dbResPets) => {
            let pets = dbResPets.rows

            db.query(
                'select * from meds where user_id = $1',
                [userId],
                (err,dbResMeds) => {
                    let meds = dbResMeds.rows

                    db.query(
                        'select * from appointments where user_id = $1',
                        [userId],
                        (err, dbResAppt) => {
                            let appts = dbResAppt.rows

                            res.render('dashboard', {
                                pets: pets,
                                meds: meds,
                                appts: appts,
                                user: user
                            })
                        }
                    ) // dbAppts query
                }
            ) // dbMeds query
        }
    ) // dbPets query
}) // app.get closure

app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/login/new', (req, res) => {
    res.render('login-new');
});

app.post('/login/new', (req, res) => {

    passwordDigest = pwd.digest(req.body.password)
    db.query(
        "INSERT INTO users (username, email, password_digest) VALUES ($1, $2, $3);",
        [req.body.username, req.body.email, passwordDigest],
        (err, dbRes) => {
            res.redirect('/login')
        }
    )
})

app.post('/login', 
    passport.authenticate(
        'local',
        { failureRedirect: '/login' }
    ),
    (req, res) => {
        res.redirect('/');
});

app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/login');
});


////////// LISTENER ///////////

const port = process.env.PORT || 8080
app.listen(port, () => {
    console.log(`listening on port ${port}`)
})

////////// LISTENER ///////////