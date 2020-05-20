console.log("Server-side JS")

const express = require("express")
const port = 8080
const db = require("./db/config")
const pwd = require("./models/password")
const morgan = require('morgan');
const bodyParser = require('body-parser');
const petController = require('./controllers/pet');
const userController = require('./controllers/user');
const apptController = require('./controllers/appointments');
const medsController = require('./controllers/meds');
const passport = require('passport');
const Strategy = require('passport-local').Strategy;



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




const app = express()

////////// MIDDLEWARE ///////////

app.use(morgan("combined"))

app.use(bodyParser.json()) // reads params from body
app.use(bodyParser.urlencoded({extended: true})) 


app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));

app.use(passport.initialize());
app.use(passport.session());

////////// MIDDLEWARE ///////////

app.set('view engine', 'ejs')

// app.get("/", (req,res) => { // this is to look at the user session stuff
//     res.json(req.user)
// })
app.use(express.static('public'))
app.use('/', petController)
app.use('/', userController)
app.use('/', apptController)
app.use('/', medsController)

app.get("/", (req, res) => {

    let dbPets = db.query(
        'select * from pets where user_id = $1',
        [req.user.id],
        (err, dbRes) => {
            res.render('dashboard', { 
                pets: dbRes.rows,
                user: req.user 
            })

        }
    )
    
})

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


app.listen(port, () => {
    console.log(`listening on port ${port}`)
})